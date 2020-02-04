import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Estate from '../estates/Estate';
import observer from '../../infrastructure/observer';
import estates from '../../services/esteateService';
import coOwnership from '../../services/coOwnershipService';

export default class ListEstates extends Component{
    constructor(props) {
        super(props);

        this.state = {
            estates : [],
            coOwnership: {}
        }
    }

    getEstates = (id) => {
        estates.loadAllEstatesForThisCoOwnership(id)
            .then(res => {
                coOwnership.loadPostById(id)
                .then(res => {
                    console.log(res)
                    this.setState({
                        coOwnership: res
                    })
                })
                this.setState({
                    estates: res
                })
            })
            .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }

    componentDidMount = () => {
        const { match: { params } } = this.props;
        this.getEstates( params.id );
    }

    render = () => {        
        return (
            <div>
                {console.dir(this.state.coOwnership)}
                <h1>Estates in <span className='font-italic text-primary'>{this.state.coOwnership.name}</span></h1>
                <Link to={"/create-estate/"+ this.state.coOwnership._id} className="btn btn-primary btn-rounded btn-sm mx-2 mb-3">Add Estate</Link>
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
                        {this.state.estates.map((p, i) => <Estate key={p._id} index={i} {...p} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}