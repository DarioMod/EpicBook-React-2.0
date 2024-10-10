import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";

export const Login = ({ showLoginModal, toggleShowLoginModal }) => {
  const {
    login: doLogin,
    currentUser,
    formState,
    setFormState,
  } = useContext(AuthContext);

  console.log(currentUser);

  const handleFormState = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Modal show={showLoginModal} onHide={toggleShowLoginModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex flex-column gap-2" onSubmit={doLogin}>
          <Form.Control
            onChange={handleFormState}
            type="text"
            name="username"
            required={true}
            value={formState.username}
            placeholder="Username"
          />
          <Form.Control
            onChange={handleFormState}
            type="text"
            name="password"
            required={true}
            value={formState.password}
            placeholder="Password"
          />
          <Button variant="primary" type="submit">
            Invia
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleShowLoginModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
