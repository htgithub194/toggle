import React from 'react';
import Group from '../widget/Group';
import ModalCreateGroup from '../modal/ModalCreateGroup'
import ModalEditGroup from '../modal/ModalEditGroup'

class AppBodyGroup extends React.Component {

  constructor(props) {
    super(props);

    this.modalEdit_idx = -1;

    this.state = {
      isShowModalEdit: false
    };
  }

  showModalEditGroup = (idx) => {
    this.modalEdit_idx = idx;
    this.setState({
      isShowModalEdit: (idx >= 0)
    });
  }

  render() {
    if (!this.props.display) return null;
    return (
      <div className="AppBodyGroup">
        {this.props.model.groups.map((d, i) => <Group key={i} data={{ d, i }} model={this.props.model} showModalEditGroup={() => this.showModalEditGroup(i)} />)}
        <ModalCreateGroup />
        <ModalEditGroup
          grp_idx={this.modalEdit_idx}
          show={this.state.isShowModalEdit}
          handleClose={() => this.showModalEditGroup(-1)}
        />
      </div>
    );
  }
}

export default AppBodyGroup;
