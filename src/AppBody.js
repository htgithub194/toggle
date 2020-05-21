import React from 'react';
import Device from './Device';

class AppBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let devices = this.props.model.devices;
        if (!this.props.display) return null;
        return (
            <div className="AppBody container">
                <div className="row" >
                    {devices.map((d, i) => <Device data={{ d, i }} model={this.props.model} />)}
                </div>
            </div>
        );
    }
}

export default AppBody;
