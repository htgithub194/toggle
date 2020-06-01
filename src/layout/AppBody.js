import React from 'react';
import Device from '../widget/Device';
import ModalEditDeive from '../modal/ModalEditDeive'

class AppBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalEditDevice_idx: 0,
            isShowModalEdit: false
        }
    }

    showModalEdit = (isShowed) => {
        this.setState({
            isShowModalEdit: isShowed
        });
    }

    setEditDeviceIdx = (idx) => {
        this.setState({
            modalEditDevice_idx: idx,
            isShowModalEdit: true
        });
    }

    render() {
        let devices = this.props.model.devices;
        let cntOn = 0;
        devices.forEach(e => {
            if (e.isSttOn) cntOn++;
        });
        if (!this.props.display) return null;
        return (
            <>
                <div className="AppBody container">
                    <h1 className="row" >
                        Đang bật {cntOn} / {devices.length}
                    </h1>
                    <div className="row" >
                        {devices.map((d, i) => <Device key={d.realName} data={{ d, i }} model={this.props.model} setEditDeviceIdx={this.setEditDeviceIdx} />)}
                    </div>
                </div>
                <ModalEditDeive device_index={this.state.modalEditDevice_idx} show={this.state.isShowModalEdit} handleClose={() => this.showModalEdit(false)} />
            </>
        );
    }
}

export default AppBody;
