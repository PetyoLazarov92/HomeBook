import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import esteateService from '../../services/esteateService';

export default class HomeBook extends Component {
    constructor(props){
        super(props);

        this.state= {
            estate: {}
        }
    }

    deleteHandler = (id, target, targetEstate, e) => {
        e.preventDefault();
        this.props.onDelete(id, target, targetEstate);
    };

    componentDidMount = () => {
        esteateService.loadPostById(this.props.toEstate)
        .then(res => {
            this.setState({
                estate: res
            })
        })
    }

    render = () => {
        return(
            <tr>
                <td>{this.props.names}</td>
                <td>{this.state.estate.type} № {this.state.estate.number}</td>
                <td>{this.props.startingDate}</td>
                <td>{this.props.typeOfBusines}</td>
                <td>{this.props.typeOfOccupant}</td>
                <td>
                    <Link to={"/edit-record/"+ this.props._id} className="btn btn-warning btn-rounded btn-sm mx-2">Edit</Link>
                    <button onClick={this.deleteHandler.bind(this, this.props._id, this.props, this.state.estate)} className="btn btn-danger btn-sm">Delete</button>
                    {/* <Link to={"/delete-record/"+ this.props._id} className="btn btn-danger btn-rounded btn-sm mx-2" params={{ coOwnershipId: this.props.toCoOwnership }}>Delete</Link> */}
                </td>
            </tr>

        )
    }
}
