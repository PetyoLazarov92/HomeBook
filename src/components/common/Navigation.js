import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import observer from '../../infrastructure/observer';
import userManageService from '../../services/userManageService';


export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userRoles: []
        };
        observer.subscribe(observer.events.loginUser, this.userLoggedIn);
        observer.subscribe(observer.events.logoutUser, this.userLogout);
      }
    
      userLogout = () => {
          this.setState({ 
              username: '',
              userRoles: []
          });
      }
    
      userLoggedIn = (data) => {
          this.setState({
              username: data[0],
              userRoles: data[1]
          });
      }
    
      componentDidMount() {
        userManageService.loadUsersRoles()
            .then(res => {
                if(sessionStorage.getItem('roles').length !== 0 && sessionStorage.getItem('username').length !== 0){
                    let userRoles = sessionStorage.getItem('roles');
                    let availableRoles = res;
                    let rolesAsNames = availableRoles.filter(element => userRoles.indexOf(element._id) !== -1);
                    rolesAsNames = rolesAsNames.map(e => e.name);
                    return observer.trigger(observer.events.loginUser, [sessionStorage.getItem('username'), rolesAsNames]);
                } else {
                    return null
                }
            })
      }
    render = () => {
        let loggedIn = sessionStorage.getItem('authtoken');
        let userName = this.state.username;
        let houseManagerAccess = this.state.userRoles.indexOf('admin') !== -1 || this.state.userRoles.indexOf('houseManager') !== -1;
        let adminAccess = this.state.userRoles.indexOf('admin') !== -1;

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