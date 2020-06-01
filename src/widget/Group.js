import React from 'react';
import GroupDevice from './GroupDevice';
import ModalDeleteGroup from '../modal/ModalDeleteGroup'

const Group = (props) => {
    let { data, model } = props;

    const _onClick_tog_all = (isOn) => {
        document.group_onClick(data.i, isOn);
    }

    const _onTouchStart = () => {
        if (null === document.timerLongPress) {
            document.timerLongPress = setTimeout(onLongPress, 500);
        }
    }

    const onLongPress = () => {
        document.timerLongPress = null;
        props.showModalEditGroup();
    }

    const _onTouchEnd = () => {
        if (document.timerLongPress) {
            clearTimeout(document.timerLongPress)
            document.timerLongPress = null;
        }
    }

    return (
        <div className="container group-container noselect" onTouchStart={_onTouchStart} onTouchEnd={_onTouchEnd}>
            <h1 className="row group-name text-align-center">{data.d.name}</h1>
            <div className="row">
                <div className="mouse col-6 text-align-center" onClick={() => _onClick_tog_all(true)}><p className="my-0">Bật tất cả</p></div>
                <hr />
                <div className="mouse col-6 text-align-center" onClick={() => _onClick_tog_all(false)}><p>Tắt tất cả</p></div>
            </div>
            <div className="row">
                {data.d.devs.map((d, i) => <GroupDevice key={i} data={{ d, i }} model={model} />)}
            </div>
            <ModalDeleteGroup data={data}/>
        </div>
    );
}

export default Group;