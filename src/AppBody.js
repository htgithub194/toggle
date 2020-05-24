import React from 'react';
import Device from './Device';

class AppBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let devices = this.props.model.devices;
        let cntOn = 0;
        devices.forEach(e => {
            if(e.isSttOn) cntOn++;
        });
        if (!this.props.display) return null;
        return (
            <div className="AppBody container">
                <h1 className="row" >
                    Đang bật {cntOn} / {devices.length} 
                </h1>
                <div className="row" >
                    {devices.map((d, i) => <Device data={{ d, i }} model={this.props.model} />)}
                </div>
            </div>
        );
    }
}

export default AppBody;
