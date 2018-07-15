import React, { Component } from 'react';
import homeBookService from '../../services/homeBookService'
import observer from '../../infrastructure/observer';

function alertFunc() {
    if (window.confirm("Are You Sure You Want To Delete!")) {
        return true
    } else {
        return false
    }
}

export default class DeleteRecordInHB extends Component {

    getHomeBook = (id) => {
        homeBookService.loadPostById(id)
            .then(res => {
                const toCoOwnershipId = res.toCoOwnership;
                if(alertFunc()){
                    homeBookService.deletePost(res._id)
                        .then(res =>{
                            observer.trigger(observer.events.notification, {type: 'success', message: "Home Book Record Deleted Successfully!"});
                            this.props.history.push('/homebook/'+ toCoOwnershipId);
                        })
                        .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
                } else {
                    observer.trigger(observer.events.notification, {type: 'info', message: "You cancelled deleting Home Book Record!"});
                    this.props.history.push('/homebook/'+ toCoOwnershipId);
                }
            })
            .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }

    componentDidMount = () => {
        const { match: { params } } = this.props;        
        this.getHomeBook(params.id);
    }

    render = () => {
        return(
            <div className="mx-auto mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
                
            </div>
        )
    }
}
