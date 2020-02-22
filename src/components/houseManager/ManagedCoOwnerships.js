import React, { Component } from 'react';
import coOwnershipService from '../../services/coOwnershipService';
import observer from '../../infrastructure/observer';
import SubscribedUser from './SubscribedUser';
import { Link } from 'react-router-dom';

export default class ManagedCoOwnerships extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            myManagedCoOwnerships : [],
            slectedValue: 'select'
        }
    }

    getMyPost = () => {
        let userId = sessionStorage.getItem('userId')
        coOwnershipService.loadOwnPosts(userId)
            .then(res => {
                this.setState({
                    myManagedCoOwnerships: res,
                    ready: true
                })
            })
            .catch(res => {
                observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description })
            })
    }

    approve = (uid, coid) => {
        let coOwnershipForUpdate = this.state.myManagedCoOwnerships.filter(
            (co) => {
                return co._id.indexOf(coid) !== -1
            }
        )[0];
        coOwnershipForUpdate.subscribedUsers.map( u => u.userId === uid ? u.approved = 'true' : null);
        coOwnershipService.editPost(coOwnershipForUpdate, coid)
            .then(res =>{
                this.getMyPost();
                observer.trigger(observer.events.notification, {type: 'success', message: "You have successfully approve a member!"})
            })
            .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }

    refuse = (uid, coid) => {
        let coOwnershipForUpdate = this.state.myManagedCoOwnerships.filter(
            (co) => {
                return co._id.indexOf(coid) !== -1
            }
        )[0];
        coOwnershipForUpdate.subscribedUsers.map( u => u.userId === uid ? u.approved = 'false' : null);
        coOwnershipService.editPost(coOwnershipForUpdate, coid)
            .then(res =>{
                this.getMyPost();
                observer.trigger(observer.events.notification, {type: 'info', message: "You have successfully remove a member!"})
            })
            .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }

    onSelect = (event) => {
        this.setState({
            slectedValue: event.target.value
        });
    }

    componentDidMount = () => {
        this.getMyPost();
    }

    render = () => {
        let selectedCoOwnership = this.state.myManagedCoOwnerships.filter(
            (coOwnership) => {
                return coOwnership._id.indexOf(this.state.slectedValue) !== -1
            }
        )[0]
        console.log(selectedCoOwnership)
        return(
            <div className="d-flex flex-column flex-md-row">
                <div className="col-12 pl-0">
                    <div className="row">
                        <div className="form-horizontal col-12 col-md-6">
                            <h2 className="title d-inline-block pl-md-0">Currently managed co-ownership</h2>
                            <select className='form-control mb-3' onChange={this.onSelect} value={this.state.slectedValue}>
                                <option value="select">- Select Co-Ownership -</option>
                                {this.state.myManagedCoOwnerships.map((co, i) => <option key={co._id} value={co._id}>{co.name} -> {co.city} -> {co.street} {co.number}</option>)}
                            </select>
                            {selectedCoOwnership
                                ?
                                <div>
                                    <Link to={"/details-co-ownership/"+ selectedCoOwnership._id} className="btn box-shadow-none text-primary mx-2 p-0" title="Details"><i className="material-icons md-36">more</i></Link>
                                    <Link to={"/estates/"+ selectedCoOwnership._id} className="btn box-shadow-none text-primary mx-2 p-0" title="Estates"><i className="material-icons md-36">location_city</i></Link>
                                    <Link to={"/homebook/"+ selectedCoOwnership._id} className="btn box-shadow-none text-primary mx-2 p-0" title="Home Book"><i className="material-icons md-36">local_library</i></Link>
                                </div>
                                :
                                null
                            }
                        </div>
                    <div className="col-12 col-md-6">
                    <h2 className="title">Add or Remove occupant</h2>
                        {selectedCoOwnership
                            ?
                            selectedCoOwnership.subscribedUsers ? selectedCoOwnership.subscribedUsers.map((su,i) => <SubscribedUser key={i} su={su} refuse={this.refuse} approve={this.approve} coid={selectedCoOwnership._id} {...su}/>) : <p className="font-italic text-danger">There are no users yet who want to join co-ownership!</p>
                            :
                            <p className="font-italic text-primary">Select a co-ownership to Approve or Refuse a occupant!</p>
                        }
                    </div>
                    </div>
                    {/* <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
        				        <th>
                                    Name
                                </th>
                                <th>
                                    City
                                </th>
                                <th>
                                    Users
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.myManagedCoOwnerships.map((co, i) => <tr key={co._id} ><td><Link to={"/details-co-ownership/"+ co._id} className="btn box-shadow-none text-primary p-0" title="Details">{co.name}</Link></td><td>{co.city}</td><td className="roles-array">{co.subscribedUsers ? co.subscribedUsers.map((su,i) => <SubscribedUser key={i} su={su} refuse={this.refuse} approve={this.approve} coid={co._id} {...su}/>) : 'There are no users yet who want to join co-ownership!'}</td></tr>)}
                        </tbody>
                    </table>
                </div> */}
                </div>
            </div>
        )
    }
}