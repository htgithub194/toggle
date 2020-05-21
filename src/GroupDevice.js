import React from 'react';

const GroupDevice = (props) => {
    let { d } = props.data;

    let name = d.name !== "" ? d.name : d.realName;
    let className = "group-device ";
    className += d.isSttOn ? "device-on" : "device-off";

    return (
        <div className={className}>
            {name}
        </div>
    );
}

export default GroupDevice;