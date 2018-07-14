import React, { Component } from 'react';
import BoundForm from '../common/BoundForm';
import requester from '../../infrastructure/requester';
import observer from '../../infrastructure/observer';

export default class RegisterPage extends Component {
    onSubmit = (data, e) => {
        if(data.username ==='') {
            observer.trigger(observer.events.notification, {type: 'info', message: 'Username cant be empty!'});
        } else if(!data.password) {
            observer.trigger(observer.events.notification, {type: 'info', message: 'Password cant be empty!' });
        } else if(data.password !== data.repeatPassword) {
            observer.trigger(observer.events.notification, {type: 'info', message: 'Passwords dont match!' });
        } else {
            let newUserData = {
                username: data.username,
                role:data.role,
                password:data.password
            }
            requester.post('user', '', 'basic', newUserData)
            .then(res => {
                observer.trigger(observer.events.notification, {type: 'success', message: "Register Success!"})
                observer.trigger(observer.events.loginUser, res.username);
                sessionStorage.setItem('authtoken', res._kmd.authtoken);
                sessionStorage.setItem('username', res.username);
                this.props.history.push('/');
              })
              .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
        }
    }
    render = () => {
        return(
            <div className="mx-auto mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
                <div className="panel panel-info text-center" >
                    <div className="heading">
                        <h1 className="title">Register</h1>
                    </div>     

                    <div  className="panel-body" >
                        <BoundForm onSubmit={this.onSubmit} className="form-horizontal">
                            <label htmlFor="username">Username:</label>
                            <input type="text" className="form-control" name="username" placeholder="username" />

                            <label htmlFor="role">User Role:</label>
                            <select name='role' className='form-control'>
                                <option value="user">User</option>
                                <option value="houseManager">House Manager</option>
                            </select>

                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control" name="password" placeholder="password" />

                            <label htmlFor="repeatPassword">Repeat Password:</label>
                            <input type="password" className="form-control" name="repeatPassword" placeholder="password" />
                            
                            <input type='submit' className="btn btn-success mt-2 mb-2" value='Register'/>   
                        </BoundForm>
                    </div>                     
                </div>  
            </div>
        )
    }
}