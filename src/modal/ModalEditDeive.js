import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalEditDeive(props) {
  const { show, handleClose } = props;

  let idx = props.device_index;
  let devices = document.Model.devices;

  const { realName, name } = devices[idx];

  let placeholder = name !== "" ? name : realName;

  const _onClick_SetDevName = (e) => {
    let typeName = document.querySelector("#input-edit-device").value;
    document.setting_setDevName(realName, typeName);
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Đặt tên thiết bị</Modal.Title>
      </Modal.Header>
      <input type="text" className="form-control" id="input-edit-device" defaultValue={placeholder} />
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Đóng</Button>
        <Button variant="primary" onClick={_onClick_SetDevName}>Đặt</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditDeive;