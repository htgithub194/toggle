import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CheckBoxDevice from './CheckBoxDevice';

function ModalCreateGroup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [cnt, setCnt] = useState(0);

  const devices = document.Model.devices;

  const handleClose = () => {
    setName("");
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const _createGroup = () => {
    setShow(false);

    let stt = false;
    let devs = [];

    let checkBoxs = document.querySelectorAll(".form-check");

    checkBoxs.forEach((d, i) => {
      if (d.querySelector(".form-check-input").checked === true) {
        devs[devs.length] = devices[i];
      }
    })


    document.group_onCreateGroup({ name, stt, devs });
  };

  const _onCheckBox = () => {
    let tmpCnt = 0;

    let checkBoxs = document.querySelectorAll(".form-check-input");
    for (let d of checkBoxs) {
      if (d.checked) {
        tmpCnt = 1;
        break;
      }
    };

    setCnt(tmpCnt);
  }

  const _onChangeGroupName = (e) => {
    setName(e.target.value);
  }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>Tạo nhóm mới</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control" placeholder="Tên nhóm mới là: " onChange={_onChangeGroupName} />
          {devices.map(d => <CheckBoxDevice name={d.name === "" ? d.realName : d.name} onCheckBox={_onCheckBox} />)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={_createGroup} disabled={name === "" || cnt === 0}>
            Tạo mới
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateGroup;