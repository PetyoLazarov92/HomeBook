import React, {Component} from 'react';
import observer from '../../infrastructure/observer';

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
                this.setState({ typeOfMessage: 'Success!', notificationClass: 'alert alert-success' });
                break;
            case 'info':
                this.setState({ typeOfMessage: 'Info!', notificationClass: 'alert alert-info' });
                break;
            case 'error':
                this.setState({ typeOfMessage: 'Error!', notificationClass: 'alert alert-danger' });
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
                <div className={this.state.notificationClass} onClick={this.hideNotification}>
                    <p className="container mb-0"><strong>{this.state.typeOfMessage} </strong>{this.state.message}</p>
                </div>)
        } else {
            return null;
        }
    }

}