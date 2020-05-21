import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const SettingDevName = (props) => {

  const { realName, name } = props.data;

  const _onClick_SetDevName = (e) => {
    let typeName = e.target.parentElement.querySelector("input").value;

    document.setting_setDevName(realName, typeName);
  }

  return (
    <div className="row setting-dev-name my-2">
      <div className="col-4">{realName}</div>
      <div className="col-6">
        <input type="text" className="form-control" placeholder={name} />
      </div>
      <Button className="col-2" variant="primary" onClick={_onClick_SetDevName}>Đặt</Button>
    </div>
  );
}

const SettingWifi = (props) => {

  const [wifiDisable, setWifiDisable] = useState(true);

  const _onClick_setWifi = (e) => {
    let ssid = e.target.parentElement.querySelector("input.ssid").value;
    let pw = e.target.parentElement.querySelector("input.pw").value;
    document.setWifiInfo(ssid, pw);
  }

  const _onChange_Check = (e) => {
    let ssid = e.target.textContent;
    e.target.parentElement.querySelector("input.ssid").value = ssid;
  }

  const _onChangeWifi = (e) => {
    let ssid = e.target.parentElement.querySelector("input.ssid").value;
    let pw = e.target.parentElement.querySelector("input.pw").value;

    if (ssid !== "" && pw !== "") {
      setWifiDisable(false);
    }
    else {
      setWifiDisable(true);
    }
  }

  let wifis = document.Model.wifis;

  return (
    <div>
      {wifis.map(d => <p onClick={_onChange_Check}>{d}</p>)}
      <input type="text" className="form-control ssid" placeholder="Nhập tên wifi" onChange={_onChangeWifi} />
      <input type="text" className="form-control pw" placeholder="Nhập mật khẩu wifi" onChange={_onChangeWifi} />
      <Button variant="primary" onClick={_onClick_setWifi} disabled={wifiDisable}>Cài đặt</Button>
    </div>
  );
}

class AppBodySetting extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let model = this.props.model;
    if (!this.props.display) return null;
    return (
      <div className="AppBodySetting">
        <div className="Setting_Wifi">
          <SettingWifi />
        </div>

        <div className="Setting_PW"></div>
        <div className="Setting_devName container">
          {model.devices.map((d, i) => <SettingDevName data={d} />)}
        </div>
      </div>
    );
  }
}

export default AppBodySetting;
