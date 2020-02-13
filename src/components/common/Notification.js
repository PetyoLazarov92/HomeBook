import React, {Component} from 'react';
import observer from '../../infrastructure/observer';
import Toast from 'react-bootstrap/Toast';

const DEFAULT_STATE = {
    message: null,
    typeOfMessage: null,
    notificationClass: null
}

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;

        observer.subscribe(observer.events.notification, this.showNotification); 
    }

    showNotification = data => {
        let message= data.message;
        this.setState({ message: message });
        switch (data.type) {
            case 'success':
                this.setState({ typeOfMessage: 'Success!', notificationClass: 'bg-success' });
                break;
            case 'info':
                this.setState({ typeOfMessage: 'Info!', notificationClass: 'bg-info' });
                break;
            case 'error':
                this.setState({ typeOfMessage: 'Error!', notificationClass: 'bg-danger' });
                break;
            default:
                this.setState(DEFAULT_STATE);
                break;
        }
    }

    hideNotification = ev => this.setState(DEFAULT_STATE);

    render = () => {
        if (this.state.message) {
            return (
              <div style={{
                  position: 'fixed',
                  top: 56,
                  right: 12,
                }}
              >
                <Toast onClose={this.hideNotification} delay={10000} autohide>
                  <Toast.Header>
                    <div className={"notification-type rounded mr-2 " + this.state.notificationClass} ></div>
                    <strong className="mr-auto">{this.state.typeOfMessage}</strong>
                  </Toast.Header>
                  <Toast.Body>{this.state.message}</Toast.Body>
                </Toast>
              </div>
            )
        } else {
            return null;
        }
    }

}