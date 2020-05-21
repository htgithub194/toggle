import React from 'react';
import GroupDevice from './GroupDevice';
import ModalCreateGroup from './ModalCreateGroup'

const Group = (props) => {
  let { data, model } = props

  const _onClick = () => {
    document.group_onClick(data.i);
  }

  const _onClick_delete = () => {
    document.group_delete_by_index(data.i);
  }
  let className = "group-container ";
  className += data.d.stt ? "group-on" : "group-off";
  return (
    <div className={className} onClick={_onClick}>
      <h1>{data.d.name}</h1>
      <div>
        {data.d.devs.map((d, i) => <GroupDevice data={{ d, i }} model={model} />)}
        {/* <img src={data.d.stt ? "./flash_on-24px.svg" : "flash_off-24px.svg"} /> */}
      </div>
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
