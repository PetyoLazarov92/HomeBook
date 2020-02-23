import React, {Component} from 'react'; 
import { Navbar, Nav } from 'react-bootstrap';
import observer from '../../infrastructure/observer';
import userManageService from '../../services/userManageService';
import { NavLink } from 'react-router-dom';


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
                if( sessionStorage.getItem('roles') !== null && sessionStorage.getItem('username') !== null ){
                    if( sessionStorage.getItem('roles').length !== 0 && sessionStorage.getItem('username').length !== 0 ){
                        let userRoles = sessionStorage.getItem('roles');
                        let availableRoles = res;
                        let rolesAsNames = availableRoles.filter(element => userRoles.indexOf(element._id) !== -1);
                        rolesAsNames = rolesAsNames.map(e => e.name);
                        return observer.trigger(observer.events.loginUser, [sessionStorage.getItem('username'), rolesAsNames]);
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            })
            .catch(res => {
                observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description })
            })
      }
    render = () => {
        const loggedIn = sessionStorage.getItem('authtoken');
        const userName = this.state.username;
        const houseManagerAccess = this.state.userRoles.indexOf('admin') !== -1 || this.state.userRoles.indexOf('houseManager') !== -1;
        const adminAccess = this.state.userRoles.indexOf('admin') !== -1;

        return(
            <Navbar fixed="top" bg="light" expand="lg" collapseOnSelect defaultExpanded={false}>
                <div className="container">
                    <Navbar.Brand href="/">Home Book</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavLink to='/' className="nav-link" >Home</NavLink>
                            <NavLink to='/about' className="nav-link" >About</NavLink>
                            {adminAccess && <NavLink to='/admin-panel' className="nav-link" >Admin Panel</NavLink>}
                            {houseManagerAccess && <NavLink to='/house-manager-panel' className="nav-link" >House Manager Panel</NavLink>}
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