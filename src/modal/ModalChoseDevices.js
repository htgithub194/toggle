import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CheckBoxDevice from '../widget/CheckBoxDevice'

function ModalChoseDevices() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const _saveGroup = () => {
    setShow(false);
  };

  let devices = document.Model.devices;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Tạo mới group
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {devices.map(d => <CheckBoxDevice name={d.name === "" ? d.realName : d.name} />)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={_saveGroup}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalChoseDevices;