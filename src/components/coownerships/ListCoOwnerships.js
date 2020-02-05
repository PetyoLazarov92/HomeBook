import React, { Component } from 'react';
import CoOwnership from '../coownerships/CoOwnership';
import observer from '../../infrastructure/observer';
import coOwnership from '../../services/coOwnershipService'
import Loading from '../common/loader/Loading';

export default class ListCoOwnership extends Component{
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            coOwnerships : []
        }
    }

    getCoOwnerships = () => {
        coOwnership.loadAllCoOwnerships()
            .then(res => {
                this.setState({
                    coOwnerships: res,
                    ready: true
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
                {this.state.ready ? (
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
                ) : (
                    <Loading />
                )}
            </div>
        )
    }
}