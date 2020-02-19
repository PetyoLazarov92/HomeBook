import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import CreatedBefore from '../common/CreatedBefore';

export default class CoOwnership extends Component {

  	render = () => {
      	let isCreator = sessionStorage.getItem('userId') === this.props._acl.creator;
      	return(
      		<tr>
        		<td>{this.props.name}
        		  	<CreatedBefore time={this.props._kmd.ect}/>
        		</td>
        		<td>{this.props.municipality}</td>
        		<td>{this.props.city}</td>
        		<td>{this.props.postCode}</td>
        		<td>
					<Link to={"/details-co-ownership/"+ this.props._id} className="btn btn-primary btn-rounded btn-sm mx-2">Details</Link>
        		    {isCreator && <Link to={"/estates/"+ this.props._id} className="btn btn-primary btn-rounded btn-sm mx-2">Estates</Link>}
        		    {isCreator && <Link to={"/homebook/"+ this.props._id} className="btn btn-primary btn-rounded btn-sm mx-2">Home Book</Link>}
        		    {isCreator && <Link to={"/edit-co-ownership/"+ this.props._id} className="btn btn-warning btn-rounded btn-sm mx-2">Edit</Link>}
        		    {isCreator && <Link to={"/delete-co-ownership/"+ this.props._id} className="btn btn-danger btn-rounded btn-sm mx-2">Delete</Link>}
        		</td>
      		</tr>
    	)
  	}
}
