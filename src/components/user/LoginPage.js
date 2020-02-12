import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import BoundForm from '../common/BoundForm';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';
import Loading from '../common/loader/Loading';
import userManageService from '../../services/userManageService';
import userRoles from '../../utils/userRoles';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: true
        }
    }
    onSubmit = (data, e) => {
        if(data.username ==='') {
            observer.trigger(observer.events.notification, {type: 'info', message: 'Username cant be empty!'});
        } else if(!data.password) {
            observer.trigger(observer.events.notification, {type: 'info', message: 'Password cant be empty!' });
        } else{
            this.setState({
                ready: false
            })
            Promise.all([requester.post('user', 'login', 'basic', data), userManageService.loadUsersRoles()])
                .then(res => {
                    observer.trigger(observer.events.notification, {type: 'success', message: "Login Success!"})
                    observer.trigger(observer.events.loginUser, [res[0].username, userRoles(res[0], res[1])]);
                    sessionStorage.setItem('authtoken', res[0]._kmd.authtoken);
                    sessionStorage.setItem('username', res[0].username);
                    sessionStorage.setItem('role', res[0].role);
                    sessionStorage.setItem('roles', res[0]._kmd.roles.map(r => r.roleId))
                    this.props.history.push('/');
                    this.setState({
                        ready: true
                    })
                })
                .catch(res => {
                    this.setState({
                        ready: true
                    })
                    observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description })
                });
            }
    }
    render = () => {
        return(
            <div id="loginbox"  className="mx-auto mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
                <div className="panel panel-info text-center" >
                    <div className="heading">
                        <h1 className="title">Sign In</h1>
                    </div>     
                    {this.state.ready ? (
                    <div  className="panel-body" >
                        <BoundForm onSubmit={this.onSubmit} className="form-horizontal">
                            <label htmlFor="username">Username:</label>
                            <input type="text" className="form-control" name="username" placeholder="username" />

                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" name="password" placeholder="password" />
                            
                            <input type='submit' className="btn btn-success mt-2" value='Login'/>

                            <div className="form-group">
                                <div className="col-md-12 control">
                                    <div >
                                        Don't have an account! 
                                        <Link to="/register">Sign Up Here</Link>
                                    </div>
                                </div>
                            </div>    
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