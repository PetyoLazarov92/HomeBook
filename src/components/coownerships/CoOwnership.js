import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import CreatedBefore from '../common/CreatedBefore';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import MoreIcon from '@material-ui/icons/More';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ApartmentIcon from '@material-ui/icons/Apartment';

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
					<Link title="Details" to={"/details-co-ownership/"+ this.props._id} className="text-primary"><MoreIcon fontSize="large"/></Link>
        		    {isCreator && <Link title="Estates" to={"/estates/"+ this.props._id} className="text-primary btn-sm"><ApartmentIcon fontSize="large"/></Link>}
        		    {isCreator && <Link title="Home Book" to={"/homebook/"+ this.props._id} className="text-primary btn-sm"><MenuBookIcon fontSize="large"/></Link>}
        		    {isCreator && <Link title="Edit" to={"/edit-co-ownership/"+ this.props._id} className="text-warning"><Edit fontSize="large"/></Link>}
        		    {isCreator && <Link title="Delete" to={"/delete-co-ownership/"+ this.props._id} className="text-danger"><DeleteForever fontSize="large"/></Link>}
        		</td>
      		</tr>
    	)
  	}
}
