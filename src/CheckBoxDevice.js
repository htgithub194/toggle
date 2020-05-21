import React from 'react';

function CheckBoxDevice(props) {

    return (
        <div className="form-check">
            <input type="checkbox" className="form-check-input" onChange={props.onCheckBox} />
            <label className="form-check-label">{props.name}</label>
        </div>
    );
}

export default CheckBoxDevice;