import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CheckBoxDevice from '../widget/CheckBoxDevice';

function ModalEditGroup(props) {
  const { show, handleClose, grp_idx } = props;
  const [dis, setDis] = useState(false);

  if (grp_idx < 0) return null;

  let group = document.Model.groups[grp_idx];
  let devices = [...document.Model.devices];

  group.devs.forEach(d => {
    for (let dd of devices) {
      if (dd.realName === d.realName) {
        dd.isSttOn = true;
        break;
      }
    }
  })

  const _onClick_SetDevName = () => {
    handleClose();

    let devs = [];
    let name = document.querySelector('#modal-edit-group-body input').value;
    let checkBoxs = document.querySelectorAll('#modal-edit-group-body .form-check');

    checkBoxs.forEach((d, i) => {
      if (d.querySelector(".form-check-input").checked === true) {
        devs[devs.length] = document.Model.devices[i];
      }
    })

    document.group_onEditGroup(grp_idx, name, devs);
  }

  const _checkValid = () => {
    let validCheckBox = false;
    let validInput = false;

    let checkBoxs = document.querySelector("#modal-edit-group-body").querySelectorAll(".form-check-input");
    for (let d of checkBoxs) {
      if (d.checked) {
        validCheckBox = true;
        break;
      }
    };

    let name = document.querySelector('#modal-edit-group-body input').value;
    if(name.length > 0) {
      validInput = true;
    }
    setDis(!(validInput & validCheckBox));
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sửa nhóm</Modal.Title>
      </Modal.Header>
      <Modal.Body id="modal-edit-group-body">
        <input type="text" className="form-control" defaultValue={group.name} onChange={_checkValid} />
        {devices.map(d => <CheckBoxDevice key={d.realName} name={d.name === "" ? d.realName : d.name} onCheckBox={_checkValid} checked={true}/>)}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={_onClick_SetDevName} disabled={dis}>Lưu thay đổi</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditGroup;