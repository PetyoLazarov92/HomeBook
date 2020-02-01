import React, {Component} from 'react';
import observer from '../../infrastructure/observer';
import {NavLink} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

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
        if(sessionStorage.getItem('authtoken')){
        loggedInSection =
            <div className="navbar-nav mr-auto">
                <NavLink to='/ownerships' className="nav-link" >Ownerships</NavLink>
                <NavLink to='/home' className="nav-link"><strong>Hello, {sessionStorage.getItem('username')}!</strong></NavLink>
                <NavLink to='/logout' className="nav-link text-danger">Logout</NavLink>
            </div>
        } else {
            loggedInSection = 
                <div className="navbar-nav mr-auto">
                    <NavLink to='/register' className="nav-link" >Register</NavLink>
                    <NavLink to='/login' className="nav-link" >Login</NavLink>
                </div>
        }

        let isInRole='';
        if(sessionStorage.getItem('role') === 'houseManager' || sessionStorage.getItem('role') === 'admin'){
            isInRole = <NavLink to='/create-co-ownership' className="nav-link" >Create-Co-Ownership</NavLink>
        }

        return(
            <Navbar fixed="top" bg="light" expand="lg">
                <div className="container">
                    <Navbar.Brand href="/">Home Book</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavLink exact to='/' className="nav-link" >Home</NavLink>
                            <NavLink to='/about' className="nav-link" >About</NavLink>
                            {isInRole}
                            {loggedInSection}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        )
    }
}