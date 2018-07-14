import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import HomeBook from './HomeBook';
import observer from '../../infrastructure/observer';
import homeBookService from '../../services/homeBookService'
import coOwnership from '../../services/coOwnershipService';

export default class ListHomeBook extends Component{
    constructor(props) {
        super(props);

        this.state = {
            homebook : [],
            coOwnershipName: '',
            coOwnershipId:''
        }
    }

    getHomeBook = (id) => {
        homeBookService.loadHomeBookForThisCoOwnership(id)
            .then(res => {
                console.log(res);
                this.setState({
                    homebook: res
                })
            })
            .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }

    componentDidMount = () => {
        const { match: { params } } = this.props;        
        this.getHomeBook(params.id);
        coOwnership.loadPostById(params.id)
            .then(res => {
                console.log(res);
                this.setState({
                    coOwnershipName: res.name,
                    coOwnershipId: res._id
                })
            })
    }

    render = () => {        
        return (
            <div>
                <h2>Home Book for <span className='font-italic text-primary'>{this.state.coOwnershipName}</span></h2>
                <Link to={"/create-home-book/"+ this.state.coOwnershipId} className="btn btn-primary btn-rounded btn-sm mx-2 mb-3">Add Record</Link>
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
                        {this.state.homebook.map((p, i) => <HomeBook key={p._id} index={i} coOwnershipId={this.state.coOwnershipId} {...p} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}