import React, { Component } from 'react';
import CoOwnership from '../coownerships/CoOwnership';
import observer from '../../infrastructure/observer';
import coOwnership from '../../services/coOwnershipService'
import Loading from '../common/loader/Loading';
import userManageService from '../../services/userManageService';

function alertUnsubscribeFunc() {
    if (window.confirm("Are You Sure You Want To Unsubscribe? If you unsubscribe now, upon subsequent subscription, you will have to wait again for approval from the Ownership Manager!")) {
        return true
    } else {
        return false
    }
}
function alertDeleteFunc() {
    if (window.confirm("Are You Sure You Want To Delete!")) {
        return true
    } else {
        return false
    }
}

export default class ListCoOwnership extends Component{
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            coOwnerships : [],
            search: '',
            isMyCoOwnerships: false,
            subscribedTo: false,
            userRoles: [],
            subscribedToCoOwnershipsArray: []
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
                let subscribedToCoOwnershipsArray = this.subscribedToHandler(res);
                this.setState({
                    coOwnerships: res,
                    subscribedToCoOwnershipsArray,
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

    subscribe = (coOwnershipId) => {
        let coOwnershipForUpdate = this.state.coOwnerships.filter(
            (coOwnership) => {
                return coOwnership._id.indexOf(coOwnershipId) !== -1;
            }
        )[0]
        const userId = sessionStorage.getItem('userId');
        let userObj = {userId, approved:false}
        // If there are no subscribed users, create an empty array for them by now.
        if(!coOwnershipForUpdate.subscribedUsers){
            coOwnershipForUpdate.subscribedUsers = []; // Initializing an empty array.
        }
        // Add Subscribed User. 
        coOwnershipForUpdate.subscribedUsers.push(userObj)

        // Update co-ownership information.
        coOwnership.editPost(coOwnershipForUpdate, coOwnershipId)
        .then(res =>{
            this.getCoOwnerships();
            observer.trigger(observer.events.notification, {type: 'success', message: "You have successfully submitted a request to join this co-ownership!"})
        })
        .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }

    unsubscribe = (coOwnershipId) => {
        if(alertUnsubscribeFunc()){
            let coOwnershipForUpdate = this.state.coOwnerships.filter(
                (coOwnership) => {
                    return coOwnership._id.indexOf(coOwnershipId) !== -1;
                }
            )[0]
            const userId = sessionStorage.getItem('userId'); // "5e3132bc8831263ac7ceaeef"
            
            if(coOwnershipForUpdate.subscribedUsers){
                let restUsers = coOwnershipForUpdate.subscribedUsers.filter(
                    (user) => {
                        return user.userId !== userId
                    }
                )
                coOwnershipForUpdate.subscribedUsers = restUsers;
    
                coOwnership.editPost(coOwnershipForUpdate, coOwnershipId)
                .then(res =>{
                    this.getCoOwnerships();
                    observer.trigger(observer.events.notification, {type: 'info', message: "You have successfully unsubscribed from this co-ownership!"})
                })
                .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
            } else {
                observer.trigger(observer.events.notification, {type: 'error', message: 'You cannot unsubscribe from co-ownership because you have not yet submitted an entry request!' })
            }
        } else {
            observer.trigger(observer.events.notification, {type: 'info', message: "Unsubscribe was canceled!"});
            this.props.history.push('/ownerships');
        }        
    }

    subscribedToHandler = (coOwnerships) => {
        const userId = sessionStorage.getItem('userId');
        let subscribedToCoOwnerships = coOwnerships.filter(
            (coOwnership) => {
                if(coOwnership.subscribedUsers){
                    return coOwnership.subscribedUsers.map(user => user.hasOwnProperty('userId') ? user.userId === userId ? true : false : null ).find(el => el === true)
                } else {
                    return false;
                }
            }
        );
        return(subscribedToCoOwnerships)
    }

    deleteCoOwnership = (id) => {
        if(alertDeleteFunc()){
            coOwnership.deletePost(id)
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
        const userAccess = this.state.userRoles.indexOf('user') !== -1;
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
        if( this.state.subscribedTo ) {
            filteredCoOwnerships = this.subscribedToHandler(filteredCoOwnerships);
        }
        return (
            <div>
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center">
                    <h1>OwnerShips</h1>
                    {houseManagerAccess && <div className="custom-control custom-switch mb-3 mb-lg-0">
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
                    {userAccess && <div className="custom-control custom-switch mb-3 mb-lg-0">
                        <input
                            id="my-co-ownerships"
                            className="custom-control-input"
                            type="checkbox"
                            name="subscribedTo"
                            checked={this.state.subscribedTo}
                            onChange={this.handleMyCoOwnershipsChange}
                            />
                        <label className="custom-control-label" htmlFor="my-co-ownerships">To which I am subscribed:</label>
                    </div>}
                    <div className="input-group input-group-sm search-co-ownership mb-3 mb-lg-0">
                        <div className="input-group-prepend">
                            <label className="input-group-text bg-success text-white border-0" htmlFor="searchCoOwnership">Search co-ownership</label>
                        </div>
                        <input id="searchCoOwnership" type="text" className="form-control" 
                            value={this.state.search}
                            onChange={this.updateSearch}/>
                    </div>
                </div>
                {this.state.ready ? (
                    <div className="table-responsive">
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
                                {filteredCoOwnerships.map((p, i) => <CoOwnership 
                                key={p._id} index={i} 
                                subscribe={this.subscribe} 
                                unsubscribe={this.unsubscribe} 
                                subscribedToCoOwnershipsArray={this.state.subscribedToCoOwnershipsArray} 
                                userRoles={this.state.userRoles} 
                                deleteCoOwnership={this.deleteCoOwnership}
                                {...p} />)}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <Loading />
                )}
            </div>
        )
    }
}