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
					<Link to={"/details-co-ownership/"+ this.props._id} className="btn box-shadow-none text-primary mx-2 p-0" title="Details"><i class="material-icons md-36">more</i></Link>
        		    {isCreator && <Link to={"/estates/"+ this.props._id} className="btn box-shadow-none text-primary mx-2 p-0" title="Estates"><i class="material-icons md-36">location_city</i></Link>}
        		    {isCreator && <Link to={"/homebook/"+ this.props._id} className="btn box-shadow-none text-primary mx-2 p-0" title="Home Book"><i class="material-icons md-36">event_note</i></Link>}
        		    {isCreator && <Link to={"/edit-co-ownership/"+ this.props._id} className="btn box-shadow-none text-warning mx-2 p-0" title="Edit"><i class="material-icons md-36">edit</i></Link>}
        		    {isCreator && <Link to={"/delete-co-ownership/"+ this.props._id} className="btn box-shadow-none text-danger mx-2 p-0" title="Delete"><i class="material-icons md-36">delete_forever</i></Link>}
        		</td>
      		</tr>
    	)
  	}
}
