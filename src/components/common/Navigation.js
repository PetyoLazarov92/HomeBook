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
                <Nav.Link href="/ownerships">Ownerships</Nav.Link>
                <Nav.Link href="/home"><strong>Hello, {sessionStorage.getItem('username')}!</strong></Nav.Link>
                <Nav.Link href="/logout" className="text-danger">Logout</Nav.Link>
            </div>
        } else {
            loggedInSection = 
                <div className="navbar-nav mr-auto">
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/login">login</Nav.Link>
                </div>
        }

        let isInRole='';
        if(sessionStorage.getItem('role') === 'houseManager' || sessionStorage.getItem('role') === 'admin'){
            isInRole = <Nav.Link href="/create-co-ownership">Create-Co-Ownership</Nav.Link>
        }

        return(
            <Navbar fixed="top" bg="light" expand="lg">
                <div className="container">
                    <Navbar.Brand href="/">Home Book</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            {isInRole}
                            {loggedInSection}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        )
    }
}