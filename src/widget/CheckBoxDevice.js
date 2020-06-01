import React from 'react';

function CheckBoxDevice(props) {
    let checked = props.checked === undefined ? false: props.checked
    return (
        <div className="form-check">
            <input type="checkbox" className="form-check-input" onChange={props.onCheckBox} defaultChecked={checked}/>
            <label className="form-check-label">{props.name}</label>
        </div>
    );
}

export default CheckBoxDevice;