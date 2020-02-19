import React, { Component } from 'react';
import CoOwnership from '../coownerships/CoOwnership';
import observer from '../../infrastructure/observer';
import coOwnership from '../../services/coOwnershipService'
import Loading from '../common/loader/Loading';
import userManageService from '../../services/userManageService';

export default class ListCoOwnership extends Component{
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            coOwnerships : [],
            search: '',
            isMyCoOwnerships: false,
            userRoles: []
        }
        observer.subscribe(observer.events.loginUser, this.userLoggedIn);
    }

    userLoggedIn = (data) => {
        this.setState({
            userRoles: data[1]
        });
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

    handleMyCoOwnershipsChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    updateSearch = (event) => {
        this.setState({
            search: event.target.value.substr(0,20)
        })
    }

    componentDidMount = () => {
        this.getCoOwnerships();
        userManageService.loadUsersRoles()
            .then(res => {
                if(sessionStorage.getItem('roles').length !== 0 && sessionStorage.getItem('username').length !== 0){
                    let userRoles = sessionStorage.getItem('roles');
                    let availableRoles = res;
                    let rolesAsNames = availableRoles.filter(element => userRoles.indexOf(element._id) !== -1);
                    rolesAsNames = rolesAsNames.map(e => e.name);
                    return observer.trigger(observer.events.loginUser, [sessionStorage.getItem('username'), rolesAsNames]);
                } else {
                    return null
                }
            })
    }

    render = () => {
        const houseManagerAccess = this.state.userRoles.indexOf('admin') !== -1 || this.state.userRoles.indexOf('houseManager') !== -1;
        let filteredCoOwnerships = this.state.coOwnerships.filter(
            (coOwnership) => {
                return coOwnership.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || coOwnership.city.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        )
        if( this.state.isMyCoOwnerships ) {
            const creatorId = sessionStorage.getItem('userId');
            filteredCoOwnerships = filteredCoOwnerships.filter(
                (coOwnership) => {
                    return coOwnership._acl.creator.indexOf(creatorId) !== -1 ;
                }
            )
        }
        return (
            <div>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                    <h1>OwnerShips</h1>
                    {houseManagerAccess && <div className="custom-control custom-switch">
                        <input
                            id="my-co-ownerships"
                            className="custom-control-input"
                            type="checkbox"
                            name="isMyCoOwnerships"
                            checked={this.state.isMyCoOwnerships}
                            onChange={this.handleMyCoOwnershipsChange}
                            />
                        <label className="custom-control-label" htmlFor="my-co-ownerships">My Co Ownerships</label>
                    </div>}
                    <div className="input-group input-group-sm search-co-ownership">
                        <div className="input-group-prepend">
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