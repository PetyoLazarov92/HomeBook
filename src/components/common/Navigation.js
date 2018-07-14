import React, {Component} from 'react';
import observer from '../../infrastructure/observer';
import {NavLink} from 'react-router-dom';

export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };

        observer.subscribe(observer.events.loginUser, this.userLoggedIn);
        observer.subscribe(observer.events.logoutUser, this.userLogout);
    }

    userLogout = () => this.setState({ username: '' });

    userLoggedIn = username => this.setState({ username });

    render = () => {
        let loggedInSection='';
        if(this.state.username !== ''){
        loggedInSection = 
        <ul className="navbar-nav ml-auto">
            <li className='nav-item'>
                <NavLink to='/logout' className="nav-link"><strong>Hello, {this.state.username}!</strong> | Logout</NavLink>
            </li>
        </ul>
        } else {
            loggedInSection =
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <NavLink to='/register' className="nav-link" >Register</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to='/login' className="nav-link" >Login</NavLink>
            </li>
            </ul>
        }

        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container">
                    <a className="navbar-brand" >HomeBook</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link" >Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/' className="nav-link" >About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/create-co-ownership' className="nav-link" >Create-Co-Ownership</NavLink>
                            </li>
                            {loggedInSection}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}