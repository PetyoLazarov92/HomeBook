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
            coOwnerships : [],
            search: ''
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

    updateSearch = (event) => {
        this.setState({
            search: event.target.value.substr(0,20)
        })
    }

    componentDidMount = () => {
        this.getCoOwnerships();
    }

    render = () => { 
        let filteredCoOwnerships = this.state.coOwnerships.filter(
            (coOwnership) => {
                return coOwnership.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || coOwnership.city.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        )       
        return (
            <div>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <h1>OwnerShips</h1>
                    <div class="input-group input-group-sm search-co-ownership">
                        <div class="input-group-prepend">
                            <label className="input-group-text bg-success text-white border-0" htmlFor="searchCoOwnership">Search co-ownership</label>
                        </div>
                        <input id="searchCoOwnership" type="text" className="form-control" 
                            value={this.state.search}
                            onChange={this.updateSearch}/>
                    </div>
                </div>
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
                            {filteredCoOwnerships.map((p, i) => <CoOwnership key={p._id} index={i} {...p} />)}
                        </tbody>
                    </table>
                ) : (
                    <Loading />
                )}
            </div>
        )
    }
}