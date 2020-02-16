import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Switch, Redirect} from 'react-router';
import {Route} from 'react-router-dom';
import HomePage from './../home/HomePage';
import UsersRolesManagement from './UsersRolesManagement';

export default class AdminPanel extends Component {
    render = () => {
        return(
        <div>
            <div className="heading">
                <h1 className="title">Admin panel</h1>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink to='/admin-panel/users-roles' className="nav-link" >Users Roles</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/admin-panel/users' className="nav-link" >Users</NavLink>
                    </li>
                </ul>
            </div>
                <Switch>
                    <Route exact path='/admin-panel/users-roles' component={UsersRolesManagement} />
                    <Route exact path='/admin-panel/users' component={HomePage} />
                    <Redirect path="/admin-panel" to="/admin-panel/users-roles"/>
                </Switch>
        </div>
    )
  }
}
