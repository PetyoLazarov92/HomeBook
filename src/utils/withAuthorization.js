import React, { Component } from 'react';
import observer from '../infrastructure/observer';
import userManageService from '../services/userManageService';
import Loading from '../components/common/loader/Loading';

function withAuthorization (TargetComponent, targetRoles) {
	return class WithAuthorization extends Component {
		constructor(props) {
			super(props);

			this.state = {
				roles: [],
				availableRoles: [],
				rolesAsNames:[],
				ready: false
			};
		}

		componentDidMount = () => {
			userManageService.loadUsersRoles()
				.then( res => {
					let roles = sessionStorage.getItem('roles').split(',');
					this.setState({
						availableRoles: res,
					})
					if(roles){
						this.setState({roles})
					}
						
				})
				.then( res => {
					let rolesAsNames = this.state.availableRoles.filter(element => this.state.roles.indexOf(element._id) !== -1);
					rolesAsNames = rolesAsNames.map(e => e.name);
					this.setState({rolesAsNames})
					this.setState({
						ready: true
					})
				})
				.catch(res =>  {
					this.setState({
						ready: true
					})
					observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description })
				});
		}

		render = () => {
			let loggedIn = sessionStorage.getItem('authtoken');
			let userHasAccess = false;
			for (let role of targetRoles) {
				userHasAccess = userHasAccess || this.state.rolesAsNames.indexOf(role) !== -1;
			}
			if(userHasAccess){
				return <TargetComponent {...this.props} />
			} else {
				if( this.state.ready ){
					if(loggedIn){
						observer.trigger(observer.events.notification, {type: 'error', message: "You do not have permission to access this page!"});
						this.props.history.push('/');
						return null
					} else {
					observer.trigger(observer.events.notification, {type: 'error', message: 'You are not logged in!.'});
						this.props.history.push('/');
						return null
					}
				} else {return <Loading />}
				
			}
		}
	}
	
}

export default withAuthorization;

export function withAdminAuthorization(TargetComponent) {
	return withAuthorization(TargetComponent, ['admin']);
}
export function withHomeManagerAuthorization(TargetComponent) {
	return withAuthorization(TargetComponent, ['houseManager', 'admin']);
}
export function withUserAuthorization(TargetComponent) {
	return withAuthorization(TargetComponent, ['user', 'admin', 'houseManager']);
}