import React from 'react';
import GroupDevice from './GroupDevice';
import ModalCreateGroup from './ModalCreateGroup'

const Group = (props) => {
  let { data, model } = props;

  const _onClick_delete = () => {
    document.group_delete_by_index(data.i);
  }

  const _onClick_tog_all = (isOn) => {
    document.group_onClick(data.i, isOn);
  }

  return (
    <div className="container group-container">
      <h1 className="row group-name text-align-center">{data.d.name}</h1>
      <div className="row">
        <div className="mouse col-6 text-align-center" onClick={() => _onClick_tog_all(true)}><p className="my-0">Bật tất cả</p></div>
        <hr/>
        <div className="mouse col-6 text-align-center" onClick={() => _onClick_tog_all(false)}><p>Tắt tất cả</p></div>
      </div>
      <div className="row">
        {data.d.devs.map((d, i) => <GroupDevice data={{ d, i }} model={model} />)}
      </div>
      {/* <img src={data.d.stt ? "./flash_on-24px.svg" : "flash_off-24px.svg"} /> */}
      <div onClick={_onClick_delete}>Delete</div>
    </div>
  );
}

class AppBodyGroup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isShow_ModalChoseDevices: false
    };
  }

  _onCLick_Add = (e) => {
    this.setState({
      isShow_ModalChoseDevices: true
    });
  }

  render() {
    if (!this.props.display) return null;
    return (
      <div className="AppBodyGroup">
        {this.props.model.groups.map((d, i) => <Group data={{ d, i }} model={this.props.model} />)}
        <ModalCreateGroup />
      </div>
    );
  }
}

export default AppBodyGroup;
