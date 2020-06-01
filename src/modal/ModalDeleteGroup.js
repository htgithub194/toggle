import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalDeleteGroup(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const iconDelete = <svg className="group-delete" onClick={handleShow} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>

    const _onClick_delete = () => {
        document.group_delete_by_index(props.data.i);
    }

    return (
        <>
            {iconDelete}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa nhóm</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">{props.data.d.name}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Đóng</Button>
                    <Button variant="primary" onClick={_onClick_delete}>Xóa</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ModalDeleteGroup;