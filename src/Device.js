import React from 'react';

const Device = (props) => {
    let { d, i } = props.data;
    let { model } = props;

    const _onClick = (e) => {
        model.funcs.device_onClick(d, i);
    }

    let name = d.name !== "" ? d.name : d.realName;

    let style = "device-square-content ";
    if(d.isSttOn === null) {
        style += "device-idle";
    }
    if(d.isSttOn === true) {
        style += "device-on";
    }
    if(d.isSttOn === false) {
        style += "device-off";
    }

    return (
        <div onClick={_onClick} className="col-4 p-0">
            <div className="device-square">
                <div className={style}>
                    <div>
                        <span className="mouse">{name}</span>
                    </div>
                </div>
                <div className="device-square-img">
                    <img src={d.isSttOn ? "./flash_on-24px.svg" : "flash_off-24px.svg"} />
                </div>
            </div>
        </div >
    );
}

export default Device;

/* <h3 className="col-10">{name}</h3>
<div className="col-2">
<img className="responsive" src={d.isSttOn ? "./flash_on-24px.svg" : "flash_off-24px.svg"} />
</div> */