import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default class Navigation extends Component {
    render = () => {
        let loggedIn = sessionStorage.getItem('authtoken');
        let userName = this.props.username;
        let houseManagerAccess = this.props.userRoles.indexOf('admin') !== -1 || this.props.userRoles.indexOf('houseManager') !== -1;
        let adminAccess = this.props.userRoles.indexOf('admin') !== -1;

        return(
            <Navbar fixed="top" bg="light" expand="lg">
                <div className="container">
                    <Navbar.Brand href="/">Home Book</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavLink exact to='/' className="nav-link" >Home</NavLink>
                            <NavLink to='/about' className="nav-link" >About</NavLink>
                            {adminAccess && <NavLink to='/admin-panel' className="nav-link" >Admin Panel</NavLink>}
                            {houseManagerAccess && <NavLink to='/create-co-ownership' className="nav-link" >Create-Co-Ownership</NavLink>}
                            {loggedIn && <NavLink to='/ownerships' className="nav-link" >Ownerships</NavLink>}
                            {loggedIn && <NavLink to='/home' className="nav-link"><strong>Hello, {userName}!</strong></NavLink>}
                            {loggedIn && <NavLink to='/logout' className="nav-link text-danger">Logout</NavLink>}
                            {!loggedIn && <NavLink to='/register' className="nav-link" >Register</NavLink>}
                            {!loggedIn && <NavLink to='/login' className="nav-link" >Login</NavLink>}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        )
    }
}