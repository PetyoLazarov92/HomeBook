import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import CreatedBefore from '../common/CreatedBefore';

export default class CoOwnership extends Component {

  	render = () => {
		  let loggedInUser = sessionStorage.getItem('userId');
		  let isCreator = loggedInUser === this.props._acl.creator;
		  let isSubscribed = false
		  if(this.props.subscribedToCoOwnershipsArray.length !== 0){
				for (let el of this.props.subscribedToCoOwnershipsArray) {
					if (el._id === this.props._id) {
					  	isSubscribed = true;
					}
				}
		  }
      	return(
      		<tr>
        		<td>{this.props.name}
        		  	<CreatedBefore time={this.props._kmd.ect}/>
        		</td>
        		<td>{this.props.municipality}</td>
        		<td>{this.props.city}</td>
        		<td>{this.props.postCode}</td>
        		<td>
					<Link to={"/details-co-ownership/"+ this.props._id} className="btn box-shadow-none text-primary mx-2 p-0" title="Details"><i className="material-icons md-36">more</i></Link>
					{isSubscribed ?
						<button onClick={() => this.props.unsubscribe(this.props._id)} className="btn box-shadow-none text-danger mx-2 p-0" title="Unsubscribe"><i className="material-icons md-36">block</i></button>
						: 
						<button onClick={() => this.props.subscribe(this.props._id)} className="btn box-shadow-none text-success mx-2 p-0" title="Subscribe"><i className="material-icons md-36">add_circle</i></button>
					}
        		    {isCreator && <Link to={"/estates/"+ this.props._id} className="btn box-shadow-none text-primary mx-2 p-0" title="Estates"><i className="material-icons md-36">location_city</i></Link>}
        		    {isCreator && <Link to={"/homebook/"+ this.props._id} className="btn box-shadow-none text-primary mx-2 p-0" title="Home Book"><i className="material-icons md-36">event_note</i></Link>}
        		    {isCreator && <Link to={"/edit-co-ownership/"+ this.props._id} className="btn box-shadow-none text-warning mx-2 p-0" title="Edit"><i className="material-icons md-36">edit</i></Link>}
        		    {isCreator && <Link to={"/delete-co-ownership/"+ this.props._id} className="btn box-shadow-none text-danger mx-2 p-0" title="Delete"><i className="material-icons md-36">delete_forever</i></Link>}
        		</td>
      		</tr>
    	)
  	}
}
