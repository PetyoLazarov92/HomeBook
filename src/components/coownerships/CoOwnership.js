import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import CreatedBefore from '../common/CreatedBefore';

export default class CoOwnership extends Component {

  render = () => {
      return(
      <tr>
        <td>{this.props.name}
          <CreatedBefore time={this.props._kmd.ect}/>
        </td>
        <td>{this.props.municipality}</td>
        <td>{this.props.city}</td>
        <td>{this.props.postCode}</td>
        <td>
            <Link to={"/estates/"+ this.props._id} className="btn btn-primary btn-rounded btn-sm mx-2">Estates</Link>
            <Link to={"/homebook/"+ this.props._id} className="btn btn-primary btn-rounded btn-sm mx-2">Home Book</Link>
            <Link to={"/details-co-ownership/"+ this.props._id} className="btn btn-primary btn-rounded btn-sm mx-2">Details</Link>
            <Link to={"/edit-co-ownership/"+ this.props._id} className="btn btn-warning btn-rounded btn-sm mx-2">Edit</Link>
            <Link to={"/delete-co-ownership/"+ this.props._id} className="btn btn-danger btn-rounded btn-sm mx-2">Delete</Link>
        </td>
      </tr>
    
      )
  }
}
