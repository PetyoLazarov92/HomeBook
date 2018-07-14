import React, { Component } from 'react';
import requester from '../../infrastructure/requester';
import CoOwnership from '../homeBook/CoOwnership';
import observer from '../../infrastructure/observer';

export default class ListCoOwnership extends Component{
    constructor(props) {
        super(props);

        this.state = {
            coOwnerships : []
        }
    }

    getCoOwnerships = () => {
        requester.get('appdata', 'coOwnerships', 'kinvey')
            .then(res => {
                console.log(res);
                this.setState({
                    coOwnerships: res
                })
            })
            .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }

    componentDidMount = () => {
        this.getCoOwnerships();
    }

    render = () => {        
        return (
            <div>
                <h1>OwnerShips</h1>
                <label htmlFor="role">Co-Ownerships:</label>
                <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Municipality</th>
                        <th>City</th>
                        <th>Postal Code</th>
                        <th>Controls</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.coOwnerships.map((p, i) => <CoOwnership key={p._id} index={i} {...p} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}