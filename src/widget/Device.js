import React from 'react';

const Device = (props) => {
    let { d, i } = props.data;

    const _onClick = (e) => {
        document.device_onClick(d, i);
    }

    let name = d.name !== "" ? d.name : d.realName;

    let style = "device-square-content ";
    if (d.isSttOn === null) {
        style += "device-idle";
    }
    if (d.isSttOn === true) {
        style += "device-on";
    }
    if (d.isSttOn === false) {
        style += "device-off";
    }

    const _onTouchStart = () => {
        if (null === document.timerLongPress) {
            document.timerLongPress = setTimeout(onLongPress, 1000);
        }
    }

    const onLongPress = () => {
        props.setEditDeviceIdx(i);
    }

    const _onTouchEnd = () => {
        if (document.timerLongPress) {
            clearTimeout(document.timerLongPress)
            document.timerLongPress = null;
        }
    }

    return (
        <div onClick={_onClick} className="col-4 p-0 noselect" onTouchStart={_onTouchStart} onTouchEnd={_onTouchEnd}>
            <div className="device-square">
                <div className={style}>
                    <div>
                        <span className="mouse">{name}</span>
                    </div>
                </div>
                <div className="device-square-img">
                    <img src={d.isSttOn ? "./flash_on-24px.svg" : "flash_off-24px.svg"} alt={d.isSttOn ? "on" : "off"} />
                </div>
            </div>
        </div>
    );
}

export default Device;