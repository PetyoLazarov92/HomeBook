import React, { Component } from 'react';
import observer from '../infrastructure/observer';
import userManageService from '../services/userManageService';
import Loading from '../components/common/loader/Loading';

function withAuthorization (Component, targetRoles) {
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
					console.log(this.state.availableRoles)
					let rolesAsNames = this.state.availableRoles.filter(element => this.state.roles.indexOf(element._id) !== -1);
					rolesAsNames = rolesAsNames.map(e => e.name);
					this.setState({rolesAsNames})
					this.setState({
						ready: true
					})
				})
				.catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
		}

		render = () => {
			let userHasAccess = false;
			for (let role of targetRoles) {
				userHasAccess = userHasAccess || this.state.rolesAsNames.indexOf(role) !== -1;
			}

			if(userHasAccess){
				return <Component {...this.props} />
			} else {
				return (this.state.ready ? <h1>Unauthorized</h1> : <Loading />)
			}
		}
	}
	
}

export function withAdminAuthorization(Component) {
	return withAuthorization(Component, ['admin']);
}
export function withHomeManagerAuthorization(Component) {
	return withAuthorization(Component, ['houseManager', 'admin']);
}