import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import BoundForm from '../common/BoundForm';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';

export default class LoginPage extends Component {
    onSubmit = (data, e) => {
        requester.post('user', 'login', 'basic', data)
            .then(res => {
                observer.trigger(observer.events.notification, {type: 'success', message: "Login Success!"})
                observer.trigger(observer.events.loginUser, res.username);
                sessionStorage.setItem('authtoken', res._kmd.authtoken);
                sessionStorage.setItem('username', res.username);
                this.props.history.push('/');
              })
              .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }
    render = () => {
        return(
            <div id="loginbox"  className="mx-auto mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
                <div className="panel panel-info text-center" >
                    <div className="heading">
                        <h1 className="title">Sign In</h1>
                    </div>     

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
                </div>  
            </div>
        )
    }
}