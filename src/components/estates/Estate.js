import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import CreatedBefore from '../common/CreatedBefore';

export default class Estate extends Component {

    deleteHandler = (id, target, e) => {
        e.preventDefault();
        this.props.onDelete(id, target);
    };

    render = () => {
        return(
        
            <tr>
                <td>{this.props.type}
                <CreatedBefore time={this.props._kmd.ect}/>
                </td>
                <td>{this.props.number}</td>
                <td>{this.props.floor}</td>
                <td>{this.props.builtUpArea}</td>
                <td>{this.props.comonParts}</td>
                <td>
                    <Link to={"/edit-estate/"+ this.props._id} className="btn box-shadow-none text-warning mx-2 p-0" title="Edit"><i className="material-icons md-36">edit</i></Link>
                    <button onClick={this.deleteHandler.bind(this, this.props._id, this.props)} className="btn box-shadow-none text-danger mx-2 p-0" title="Delete"><i className="material-icons md-36">delete_forever</i></button>
                </td>
            </tr>

        )
    }
}
