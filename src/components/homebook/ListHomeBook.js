import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import HomeBook from './HomeBook';
import observer from '../../infrastructure/observer';
import homeBookService from '../../services/homeBookService'
import coOwnership from '../../services/coOwnershipService';
import Loading from '../common/loader/Loading';
import ModalConfirmDelete from '../common/ModalConfirmDelete';

export default class ListHomeBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            homebook : [],
            coOwnershipName: '',
            coOwnershipId:'',
            showConfirm: false,
            target: {},
            targetEstate: {}
        }
    }

    getHomeBook = (id) => {
        Promise.all([homeBookService.loadHomeBookForThisCoOwnership(id), coOwnership.loadPostById(id)])
            .then(res => {
                let homebook = res[0];
                let coOwnershipId = res[1]._id;
                let coOwnershipName = res[1].name;
                this.setState({
                    homebook,
                    coOwnershipId,
                    coOwnershipName,
                    ready: true
                })
            })
            .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }

    onDelete = (id, target, targetEstate) => {
        this.setState({
            showConfirm: true,
            target,
            targetEstate
        })

    }

    deleteHomeBookRecord = (id) => {
        homeBookService.deletePost(id)
            .then(res => {
                observer.trigger(observer.events.notification, {type: 'success', message: "Home Book Record Deleted Successfully!"});
                this.setState({
                    showConfirm: false
                })
                this.props.history.push("/homebook/"+ this.state.coOwnershipId);
            })
            .catch(res => {
                observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description });
                this.props.history.push("/homebook/"+ this.state.coOwnershipId);
            });
    }

    handleClose = () => {
        this.setState({
            showConfirm: false
        })
    }

    componentDidMount = () => {
        const { match: { params } } = this.props;        
        this.getHomeBook(params.id);
    }

    render = () => {        
        return (
            <div>
                <h2>Home Book for <Link to={"/details-co-ownership/" + this.state.coOwnershipId} className='font-italic text-primary'>{this.state.coOwnershipName}</Link></h2>
                <Link to={"/create-home-book/"+ this.state.coOwnershipId} className="btn btn-primary btn-rounded btn-sm mx-2 mb-3">Add Record</Link>
                {this.state.ready ? (
                    <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Names</th>
                            <th>To Estate</th>
                            <th>Starting Date</th>
                            <th>Type Of Busines</th>
                            <th>Type Of Occupant</th>
                            <th>Controls</th>
                          </tr>
                        </thead>
                        <tbody>
                            {this.state.homebook.map((p, i) => <HomeBook key={p._id} index={i} onDelete={this.onDelete} {...p} />)}
                        </tbody>
                    </table>
                ) : (
                    <Loading />
                )}
                <ModalConfirmDelete
                    showConfirm={this.state.showConfirm}
                    closeHandler={this.handleClose}
                    deleteHandler={this.deleteHomeBookRecord}
                    targetId={this.state.target._id}
                    >
                    Are you sure you want to delete record for
                    <span className="font-italic text-primary"> {this.state.target.names} </span>
                    {this.state.target.typeOfOccupant} of estate
                    <span className="font-italic text-primary"> {this.state.targetEstate.type} &#8470; {this.state.targetEstate.number} </span>
                    in
                    <span className="font-italic text-primary"> {this.state.coOwnershipName} </span>
                    ?
                </ModalConfirmDelete>
            </div>
        )
    }
}