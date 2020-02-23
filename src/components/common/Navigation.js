import React, {Component} from 'react'; 
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
                            <Nav.Link href='/' className="nav-link" >Home</Nav.Link>
                            <Nav.Link href='/about' className="nav-link" >About</Nav.Link>
                            {adminAccess && <Nav.Link href='/admin-panel' className="nav-link" >Admin Panel</Nav.Link>}
                            {houseManagerAccess && <Nav.Link href='/house-manager-panel' className="nav-link" >House Manager Panel</Nav.Link>}
                            {houseManagerAccess && <Nav.Link href='/create-co-ownership' className="nav-link" >Create-Co-Ownership</Nav.Link>}
                            {loggedIn && <Nav.Link href='/ownerships' className="nav-link" >Ownerships</Nav.Link>}
                            {loggedIn && <Nav.Link href='/home' className="nav-link"><strong>Hello, {userName}!</strong></Nav.Link>}
                            {loggedIn && <Nav.Link href='/logout' className="nav-link text-danger">Logout</Nav.Link>}
                            {!loggedIn && <Nav.Link href='/register' className="nav-link" >Register</Nav.Link>}
                            {!loggedIn && <Nav.Link href='/login' className="nav-link" >Login</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        )
    }
}