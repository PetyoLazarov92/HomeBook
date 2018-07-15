import React, { Component } from 'react';
import {Link} from 'react-router-dom';

function pluralize(value) {
    if (value !== 1) return 's';
    else return '';
}

export default class CoOwnership extends Component {
  

  createdBeforeDays = () => {
    let dateIsoFormat = this.props._kmd.ect;
    let diff = new Date - (new Date(dateIsoFormat));
    diff = Math.floor(diff / 60000);
    if (diff < 1) return 'less than a minute';
    if (diff < 60) return diff + ' minute' + pluralize(diff);
    diff = Math.floor(diff / 60);
    if (diff < 24) return diff + ' hour' + pluralize(diff);
    diff = Math.floor(diff / 24);
    if (diff < 30) return diff + ' day' + pluralize(diff);
    diff = Math.floor(diff / 30);
    if (diff < 12) return diff + ' month' + pluralize(diff);
    diff = Math.floor(diff / 12);
    return diff + ' year' + pluralize(diff);
};

  render = () => {
      return(
        
      <tr>
        <td>{this.props.name}
          <p className='ml-3 row font-italic'>Created before: {this.createdBeforeDays()}</p>
        </td>
        <td>{this.props.municipality}</td>
        <td>{this.props.city}</td>
        <td>{this.props.postCode}</td>
        <td>
            <Link to={"/create-estate/"+ this.props._id} className="btn btn-primary btn-rounded btn-sm mx-2">Add Estate</Link>
            <Link to={"/homebook/"+ this.props._id} className="btn btn-primary btn-rounded btn-sm mx-2">Home Book</Link>
            <Link to={"/details-co-ownership/"+ this.props._id} className="btn btn-primary btn-rounded btn-sm mx-2">Details</Link>
            <Link to={"/edit-co-ownership/"+ this.props._id} className="btn btn-warning btn-rounded btn-sm mx-2">Edit</Link>
            <Link to={"/delete-co-ownership/"+ this.props._id} className="btn btn-danger btn-rounded btn-sm mx-2">Delete</Link>
        </td>
      </tr>
    
      )
  }
}
