
import React, { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';

const AppModal = props =>{

    const [show, setShow] = useState(true);
    const {data} = props;
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Variable Info</Modal.Title>
    </Modal.Header>
    <Modal.Body>{data.variablename} is not used.</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  );
}

export default AppModal;