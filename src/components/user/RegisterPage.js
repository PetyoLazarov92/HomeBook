import React, { Component } from 'react';
import BoundForm from '../common/BoundForm';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';
import userManageService from '../../services/userManageService';
import Loading from '../common/loader/Loading';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: true,
            allRoles: []
        }
    }

    componentDidMount = () => {
        userManageService.loadUsersRoles()
            .then(res => {
                let rolesRestriction = ['user', 'houseManager']
                let allRoles = res.filter(element => rolesRestriction.indexOf(element.name) !== -1);
                this.setState({
                    allRoles
                })
            })
    }

    onSubmit = (data, e) => {
        if(data.username ==='') {
            return observer.trigger(observer.events.notification, {type: 'info', message: "Username can't be empty!"});
        } else if(!data.role || 'empty' === data.role) {
            return observer.trigger(observer.events.notification, {type: 'info', message: 'You must select a role!' })
        } else if(!data.password) {
            return observer.trigger(observer.events.notification, {type: 'info', message: "Password can't be empty!" });
        } else if(data.password !== data.repeatPassword) {
            return observer.trigger(observer.events.notification, {type: 'info', message: 'Passwords do not match!' });
        } else {
            let newUserData = {
                username: data.username,
                password:data.password
            }
            this.setState({
                ready: false
            })
            requester.post('user', '', 'basic', newUserData)
            .then(user_res => {
                userManageService.assignRole(user_res._id, data.role)
                    .then(asign_role_res => {
                        sessionStorage.setItem('roles', asign_role_res.roleId)
                        userManageService.loadUsersRoles()
                            .then(roles_res => {
                                let roleFromData = [data.role]
                                let rolesAsNames = roles_res.filter(element => roleFromData.indexOf(element._id) !== -1);
                                rolesAsNames = rolesAsNames.map(e => e.name);
                                observer.trigger(observer.events.notification, {type: 'success', message: "Register Success!"})
                                observer.trigger(observer.events.loginUser, [user_res.username, rolesAsNames]);
                                sessionStorage.setItem('authtoken', user_res._kmd.authtoken);
                                sessionStorage.setItem('username', user_res.username);
                                this.props.history.push('/');
                            })
                            .catch(res => {
                                this.setState({
                                    ready: true
                                })
                                observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description })
                            })
                    })
              })
              .catch(res =>{
                    this.setState({
                        ready: true
                    })
                    observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description })
                });
        }
    }
    render = () => {
        return(
            <div className="mx-auto mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
                <div className="panel panel-info text-center" >
                    <div className="heading">
                        <h1 className="title">Register</h1>
                    </div>     
                    {this.state.ready ? (
                    <div  className="panel-body" >
                        <BoundForm onSubmit={this.onSubmit} className="form-horizontal">
                            <label htmlFor="username">Username:</label>
                            <input type="text" className="form-control" name="username" placeholder="username" />

                            <label htmlFor="role">User Role:</label>
                            <select name='role' className='form-control'>
                                <option value="empty">- Select role -</option>
                                {this.state.allRoles.map((r, i) => <option key={r._id} value={r._id}>{r.name}</option>)}
                            </select>

                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" name="password" placeholder="password" />

                            <label htmlFor="repeatPassword">Repeat Password:</label>
                            <input type="password" className="form-control" name="repeatPassword" placeholder="password" />
                            
                            <input type='submit' className="btn btn-success mt-2 mb-2" value='Register'/>   
                        </BoundForm>
                    </div>
                    ) : (
                        <Loading />
                    )}            
                </div>  
            </div>
        )
    }
}