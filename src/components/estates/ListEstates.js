import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Estate from '../estates/Estate';
import observer from '../../infrastructure/observer';
import estates from '../../services/esteateService';
import coOwnership from '../../services/coOwnershipService';
import Loading from '../common/loader/Loading';
import ModalConfirmDelete from '../common/ModalConfirmDelete';

export default class ListEstates extends Component{
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            estates : [],
            coOwnership: {},
            showConfirm: false,
            target: {}
        }
    }

    getEstates = (id) => {
        Promise.all([estates.loadAllEstatesForThisCoOwnership(id), coOwnership.loadPostById(id)])
            .then(res => {
                let estates = res[0];
                let coOwnership = res[1];
                this.setState({
                    estates,
                    coOwnership,
                    ready: true
                })
            })
            .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }

    onDelete = (id, target) => {
        this.setState({
            showConfirm: true,
            target: target
        })

    }

    deleteEstate = (id) => {
        estates.deletePost(id)
            .then(res => {
                observer.trigger(observer.events.notification, {type: 'success', message: "Estate Deleted Successfully!"});
                this.setState({
                    showConfirm: false
                })
                this.props.history.push("/estates/"+ this.state.coOwnership._id);
            })
            .catch(res => {
                observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description });
                this.props.history.push("/estates/"+ this.state.coOwnership._id);
            });
    }

    handleClose = () => {
        this.setState({
            showConfirm: false
        })
    }

    componentDidMount = () => {
        const { match: { params } } = this.props;
        this.getEstates( params.id );
    }

    render = () => {        
        return (
            <div>
                <h1>Estates in <Link to={"/details-co-ownership/" + this.state.coOwnership._id} className='font-italic text-primary'>{this.state.coOwnership.name}</Link></h1>
                <Link to={"/create-estate/"+ this.state.coOwnership._id} className="btn btn-primary btn-rounded btn-sm mx-2 mb-3">Add Estate</Link>
                {this.state.ready ? (
                    this.state.estates.length !== 0 ? (
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                  <tr>
                                    <th>Type</th>
                                    <th>Number</th>
                                    <th>Floor</th>
                                    <th>Built-up area</th>
                                    <th>Common parts</th>
                                    <th>Controls</th>
                                  </tr>
                                </thead>
                                <tbody>
                                    {this.state.estates.map((p, i) => <Estate key={p._id} index={i} onDelete={this.onDelete} {...p} />)}
                                </tbody>
                            </table>
                        </div>
                       )  : (
                           <h2 className="font-italic ml-2">There are no estates added to this co ownership yet!</h2>
                       )
                ) : (
                    <Loading />
                )}
                <ModalConfirmDelete
                    showConfirm={this.state.showConfirm}
                    closeHandler={this.handleClose}
                    deleteHandler={this.deleteEstate}
                    targetId={this.state.target._id}
                    >
                    Are you sure you want to delete
                    <span className="font-italic text-primary"> {this.state.target.type} </span>
                    &#8470;:
                    <span className="font-italic text-primary"> {this.state.target.number} </span>
                    on floor:
                    <span className="font-italic text-primary"> {this.state.target.floor} </span>
                    from
                    <span className="font-italic text-primary"> {this.state.coOwnership.name} </span>
                    ?
                </ModalConfirmDelete>
            </div>
        )
    }
}