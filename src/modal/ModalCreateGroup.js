import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CheckBoxDevice from '../widget/CheckBoxDevice';

function ModalCreateGroup() {
  const [show, setShow] = useState(false);
  // const [name, setName] = useState("");
  // const [cnt, setCnt] = useState(0);
  const [dis, setDis] = useState(true)  

  const devices = document.Model.devices;

  const handleClose = () => {
    // setName("");
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const _createGroup = () => {
    setShow(false);

    let stt = false;
    let devs = [];

    let name = document.querySelector('#modal-create-group-body input').value;
    let checkBoxs = document.querySelector("#modal-create-group-body").querySelectorAll(".form-check");

    checkBoxs.forEach((d, i) => {
      if (d.querySelector(".form-check-input").checked === true) {
        devs[devs.length] = devices[i];
      }
    })

    document.group_onCreateGroup({ name, stt, devs });
  };

  const _checkValid = () => {
    let validCheckBox = false;
    let validInput = false;

    let checkBoxs = document.querySelector("#modal-create-group-body").querySelectorAll(".form-check-input");
    for (let d of checkBoxs) {
      if (d.checked) {
        validCheckBox = true;
        break;
      }
    };

    let name = document.querySelector('#modal-create-group-body input').value;
    if(name.length > 0) {
      validInput = true;
    }
    setDis(!(validInput & validCheckBox));
  }

  const iconAdd = <svg className="group-add" onClick={handleShow} xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>

  return (
    <>
      {iconAdd}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo nhóm</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-create-group-body">
          <input type="text" className="form-control" placeholder="Tên nhóm mới là: " onChange={_checkValid} />
          {devices.map(d => <CheckBoxDevice key={d.realName} name={d.name === "" ? d.realName : d.name} onCheckBox={_checkValid} />)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Đóng</Button>
          <Button variant="primary" onClick={_createGroup} disabled={dis}>Tạo mới</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateGroup;