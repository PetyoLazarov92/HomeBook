import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

export default class ModalConfirmDelete extends Component {
    deleteHandler = (id, e) => {
        e.preventDefault();
        this.props.deleteHandler(id);
    };

    closeHandler = () => {
        this.props.closeHandler();
    }

    render() {  
        return (
            <Modal centered show={this.props.showConfirm} onHide={this.closeHandler}>
                <Modal.Header closeButton>
                <Modal.Title>Attention!</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary btn-sm" onClick={this.closeHandler.bind(this)}>
                        Cancel
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={this.deleteHandler.bind(this, this.props.targetId)}>
                        Confirm Delete
                    </button>
                </Modal.Footer>
            </Modal>      
        );
    }
}