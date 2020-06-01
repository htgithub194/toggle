import React from 'react';
import AppBody from "./layout/AppBody"
import AppNavBar from './layout/AppNavBar';
import AppBodyGroup from './layout/AppBodyGroup';
import AppBodySetting from './layout/AppBodySetting';


class App extends React.Component {

  constructor(props) {
    super(props);

    document.setDeviceList = this.setDeviceList;
    document.init = this.init;
    document.group_onCreateGroup = this.group_onCreateGroup;
    document.setting_setDevName = this.setting_setDevName;
    document.setWifiInfo = this.setWifiInfo;
    document.group_onClick = this.group_onClick;
    document.group_delete_by_index = this.group_delete_by_index;
    document.setWifiList = this.setWifiList;
    document.group_onEditGroup = this.group_onEditGroup;
    document.navBar_icon_click = this.navBar_icon_click;
    document.device_onClick = this.device_onClick;

    let dev1 = { isSttOn: false, realName: "1969264_1", name: "phòng bếp" };
    let dev2 = { isSttOn: true, realName: "1969264_2", name: "đèn hầm" };
    let dev3 = { isSttOn: false, realName: "1969264_3", name: "" };
    let dev4 = { isSttOn: null, realName: "1969264_4", name: "" };

    let devices = [dev1, dev2, dev3, dev4];
    // let devices = [];

    let groups = 
      // [];
    [
      { name: "group1", devs: [dev1, dev2, dev1, dev2,dev1, dev2,dev1, dev2] },
    ];

    let navBar = 0;

    let wifis = [];

    document.Model = { devices, groups, navBar, wifis };

    this.Model = document.Model;

    this.state = { ...this.Model };
  }

  /* START PRIVATE FUNCTION */
  findDeviceByRealName = (realName) => {
    for (let d of this.Model.devices) {
      if (d.realName === realName) {
        return d;
      }
    }

    return null;
  }

  modelSetState = () => {
    this.setState(this.Model);
  }
  /* END PRIVATE FUNCTION */

  setWifiInfo = (ssid, pw) => {
    if (undefined !== document.Android) {
      let id = "stw";
      let cmd = { id, ssid, pw };
      document.Android.eventFromHMI(JSON.stringify(cmd));
    }
  }

  setting_setDevName = (realName, setName) => {
    let dev = this.findDeviceByRealName(realName);
    if (dev === null) return;

    if (dev !== null) {
      dev.name = setName;
      this.modelSetState();
      this.storeDeviceName();
    }
  }

  storeDeviceName = () => {
    if (undefined !== document.Android) {
      let id = "sdn";
      let devs = [];
      document.Model.devices.forEach(d => {
        if (d.name !== "") {
          devs[devs.length] = d;
        }
      });

      let devname = JSON.stringify(devs);
      let cmd = { id, devname };
      document.Android.eventFromHMI(JSON.stringify(cmd));
    }
  }

  init = (groups, devices) => {
    groups.forEach(g => {
      g.stt = null;
    });

    if (null !== groups) {
      this.Model.groups = groups;
    }

    devices.forEach(d => {
      d.isSttOn = null;
    })

    this.setDeviceList(devices);
  }

  setDeviceList = (devices) => {
    if (null === devices) return;
    devices.forEach(d => {
      let isBreak = false;
      for (let modelDev of this.Model.devices) {
        if (modelDev.realName === d.realName) {
          modelDev.isSttOn = d.isSttOn;
          isBreak = true;
          break;
        }
      }

      if (!isBreak) {
        if (undefined === d.name) {
          d.name = "";
        }
        this.Model.devices[this.Model.devices.length] = d;
      }
    });

    // add ref to group
    for (let g of this.Model.groups) {
      for (let grDev of g.devs) {
        let tmp = this.findDeviceByRealName(grDev.realName);
        if (null !== tmp) {
          grDev.isSttOn = tmp.isSttOn;
          grDev.name = tmp.name;
        }
      }
    };

    this.modelSetState()
  }

  device_onClick = (d, i) => {
    if (undefined !== document.Android) {
      let id = "tog";
      let dev = d.realName;
      let stt = d.isSttOn ? "0" : "1";
      let cmd = { id, dev, stt };
      document.Android.eventFromHMI(JSON.stringify(cmd));
    }
  }

  group_delete_by_index = (idx) => {
    this.Model.groups.splice(idx, 1);
    this.modelSetState();

    this.storeGroup2Android();
  }

  group_onClick = (i, isOn) => {
    if (i >= this.Model.groups.length) {
      return;
    }

    let d = this.Model.groups[i];
    d.stt = isOn;
    this.modelSetState()

    if (undefined === document.Android) {
      return;
    }

    d.devs.forEach(e => {
      for (let j = 0; j < this.Model.devices.length; j++) {
        if (this.Model.devices[j].realName === e.realName) {
          let id = "tog";
          let dev = e.realName;
          let stt = d.stt ? "1" : "0";
          let cmd = { id, dev, stt };
          document.Android.eventFromHMI(JSON.stringify(cmd));
          break;
        }
      }
    });
  }

  group_onCreateGroup = (group) => {
    this.Model.groups[this.Model.groups.length] = group;
    this.modelSetState()

    this.storeGroup2Android();
  }

  group_onEditGroup = (grp_idx, name, devs) => {
    this.Model.groups[grp_idx].name = name;
    this.Model.groups[grp_idx].devs = devs;
    this.modelSetState();
  }

  storeGroup2Android = () => {
    if (undefined !== document.Android) {
      let id = "grp";
      let groups = JSON.stringify(document.Model.groups);
      let cmd = { id, groups };
      document.Android.eventFromHMI(JSON.stringify(cmd));
    }
  }

  navBar_icon_click = (idx) => {
    this.Model.navBar = idx;
    this.modelSetState()
  }

  componentDidMount() {
    if (document.Android !== undefined) {
      setInterval(function () {
        let id = "get";
        document.Android.eventFromHMI(JSON.stringify({ id }));
      }, 10000);

      let id = "ini";
      document.Android.eventFromHMI(JSON.stringify({ id }));

      id = "get";
      document.Android.eventFromHMI(JSON.stringify({ id }));
    }

    document.timerLongPress = null;

    // let w = ["Mèo Mướp's AirPort Express","-76","BAO-AN","-90","vnpt-Hai Thong","-85","TP-LINK_5424","-27","TANG2","-69"];
    // this.setWifiList(w);
  }

  // FOR WIFI //
  setWifiList = (d) => {
    let wifis = [];
    for (let i = 0; i < d.length; i += 2) {
      let ssid = d[i];
      let signal = parseInt(d[i + 1]);
      wifis[wifis.length] = { ssid, signal };
    }
    this.Model.wifis = wifis;
    this.modelSetState();
  }

  render() {
    return (
      <div className="App" id="AppRoot">
        <div className="AppHeader" model={this.state}></div>
        <div className="px-2">
          <AppBody model={this.state} display={this.state.navBar === 0} />
          <AppBodyGroup model={this.state} display={this.state.navBar === 1} />
          <AppBodySetting model={this.state} display={this.state.navBar === 2} />
        </div>
        <AppNavBar model={this.state} />
      </div>
    );
  }
}

export default App;
