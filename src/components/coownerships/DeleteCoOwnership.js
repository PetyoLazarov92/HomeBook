import React, { Component } from 'react';
import coOwnership from '../../services/coOwnershipService'
import observer from '../../infrastructure/observer';

function alertFunc() {
    if (window.confirm("Are You Sure You Want To Delete!")) {
        return true
    } else {
        return false
    }
}

export default class DeleteCoOwnership extends Component {
    getCoOwnerShip = (id) => {
        coOwnership.loadPostById(id)
            .then(res => {
                if(alertFunc()){
                    coOwnership.deletePost(res._id)
                    .then(res => {
                        observer.trigger(observer.events.notification, {type: 'success', message: "OwnerShip Deleted Successfully!"});
                        this.props.history.push('/ownerships');
                    })
                    .catch(res => {
                        observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description });
                        this.props.history.push('/ownerships');
                    });
                } else {
                    observer.trigger(observer.events.notification, {type: 'info', message: "You cancelled deleting OwnerShip!"});
                    this.props.history.push('/ownerships');
                }
                
            })
            .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }

    componentDidMount = () => {
        const { match: { params } } = this.props;        
        this.getCoOwnerShip(params.id);
    }

    render = () => {
        return(
            <div className="mx-auto mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
                
            </div>
        )
    }
}
