import React, {Component} from 'react';
import observer from '../../infrastructure/observer';

const DEFAULT_STATE = {
    message: null,
    success: null,
    error: null,
    info: null
}

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;

        observer.subscribe(observer.events.notification, this.showNotification); 
    }

    showNotification = data => {
        let message= data.message;
        let type = data.type;
        this.setState({ [type]: type, message: message });
    }

    hideNotification = ev => this.setState(DEFAULT_STATE);

    render = () => {
        let notificationClass;
        let typeOfMessage;
        if (this.state.success) {
            typeOfMessage = 'Success!'
            notificationClass = 'alert alert-success';
        } else if (this.state.error) {
            typeOfMessage = 'Error!'
            notificationClass = 'alert alert-danger';
        } else if (this.state.info) {
            typeOfMessage = 'Info!'
            notificationClass = 'alert alert-info';
        }

        if (this.state.message) {
            return (
                <div className={notificationClass} onClick={this.hideNotification}>
                    <p><strong>{typeOfMessage} </strong>{this.state.message}</p>
                </div>)
        } else {
            return null;
        }
    }

}