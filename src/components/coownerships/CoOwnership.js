import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import CreatedBefore from '../common/CreatedBefore';

export default class CoOwnership extends Component {

  	render = () => {
		const loggedInUser = sessionStorage.getItem('userId');
		const isCreator = loggedInUser === this.props._acl.creator;
		const userAccess = this.props.userRoles.indexOf('user') !== -1;
		const adminAccess = this.props.userRoles.indexOf('admin') !== -1;
		let isSubscribed = false
		if(this.props.subscribedToCoOwnershipsArray.length !== 0){
			for (let el of this.props.subscribedToCoOwnershipsArray) {
				if (el._id === this.props._id) {
				  	isSubscribed = true;
				}
			}
		}
		let isApproved = false;
		if(this.props.subscribedUsers) {
			this.props.subscribedUsers.map(user => user.userId === loggedInUser ? user.approved === "true" ? isApproved = true : null : null)
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
						userAccess && <button onClick={() => this.props.unsubscribe(this.props._id)} className="btn box-shadow-none text-danger mx-2 p-0" title="Unsubscribe"><i className="material-icons md-36">remove_circle</i></button>
						: 
						userAccess && <button onClick={() => this.props.subscribe(this.props._id)} className="btn box-shadow-none text-success mx-2 p-0" title="Subscribe"><i className="material-icons md-36">add_circle</i></button>
					}
					{(!isApproved && isSubscribed && <span className="font-italic text-primary ml-2">Awaiting approval!</span>)}
        		    {(isCreator || isApproved || adminAccess) && <Link to={"/estates/"+ this.props._id} className="btn box-shadow-none text-primary mx-2 p-0" title="Estates"><i className="material-icons md-36">location_city</i></Link>}
        		    {(isCreator || isApproved || adminAccess) && <Link to={"/homebook/"+ this.props._id} className="btn box-shadow-none text-primary mx-2 p-0" title="Home Book"><i className="material-icons md-36">local_library</i></Link>}
        		    {(isCreator || adminAccess) && <Link to={"/edit-co-ownership/"+ this.props._id} className="btn box-shadow-none text-warning mx-2 p-0" title="Edit"><i className="material-icons md-36">edit</i></Link>}
        		    {(isCreator || adminAccess) && <button onClick={() => this.props.deleteCoOwnership(this.props._id)} className="btn box-shadow-none text-danger mx-2 p-0" title="Delete"><i className="material-icons md-36">delete_forever</i></button>}
        		</td>
      		</tr>
    	)
  	}
}
