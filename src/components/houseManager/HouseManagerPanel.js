import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Switch, Redirect} from 'react-router';
import {Route} from 'react-router-dom';
import ManagedCoOwnerships from './ManagedCoOwnerships';

export default class HouseManagerPanel extends Component {
    render = () => {
        return(
        <div>
            <div className="heading">
                <h1 className="title">House Manager Panel</h1>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink to='/house-manager-panel/managed-ownerships' className="nav-link" >Managed Ownerships</NavLink>
                    </li>
                </ul>
            </div>
                <Switch>
                    <Route exact path='/house-manager-panel/managed-ownerships' component={ManagedCoOwnerships} />
                    <Redirect path="/house-manager-panel" to="/house-manager-panel/managed-ownerships"/>
                </Switch>
        </div>
    )
  }
}
