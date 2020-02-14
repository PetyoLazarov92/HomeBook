import React, { Component } from 'react';
import {Switch} from 'react-router';
import {Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Navigation from './components/common/Navigation';
import Notification from './components/common/Notification';
import Footer from './components/common/Footer';
import HomePage from './components/home/HomePage';
import LoginPage from './components/user/LoginPage';
import Logout from './components/user/Logout';
import RegisterPage from './components/user/RegisterPage';
import CreateCoOwnership from './components/coownerships/CreateCoOwnership';
import DetailsCoOwnership from './components/coownerships/DetailsCoOwnership';
import CreateHomeBook from './components/homebook/CreateHomeBook';
import CreateEstate from './components/estates/CreateEstate';
import ListHomeBook from './components/homebook/ListHomeBook';
import EditCoOwnership from './components/coownerships/EditCoOwnership';
import ListCoOwnership from './components/coownerships/ListCoOwnerships';
import AboutPage from './components/home/AboutPage';
import NotFound from './components/home/NotFound';
import DeleteRecordInHB from './components/homebook/DeleteRecordInHomeBook';
import DeleteCoOwnership from './components/coownerships/DeleteCoOwnership';
import EditHomeBook from './components/homebook/EditHomeBook';
import ListEstates from './components/estates/ListEstates';
import EditEstae from './components/estates/EditEstate';
import DeleteEstate from './components/estates/DeleteEstate';
import AdminPanel from './components/admin/AdminPanel';
import { withAdminAuthorization, withUserAuthorization, withHomeManagerAuthorization } from './utils/withAuthorization';

class App extends Component {
  render () {
    return (
      <div>
        <Navigation />
        <Notification />
        <div className='container mb-5 pb-3'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/home' component={HomePage} />
            <Route exact path='/about' component={AboutPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/logout' component={Logout} />
            <Route path='/admin-panel' component={ withAdminAuthorization(AdminPanel)} />
            <Route path='/ownerships' component={withUserAuthorization(ListCoOwnership)} />
            <Route path='/estates/:id' component={withUserAuthorization(ListEstates)} />
            <Route path='/create-co-ownership' component={withHomeManagerAuthorization(CreateCoOwnership)} />
            <Route path='/details-co-ownership/:id' component={withUserAuthorization(DetailsCoOwnership)} />
            <Route path='/edit-co-ownership/:id' component={withHomeManagerAuthorization(EditCoOwnership)} />
            <Route path='/delete-co-ownership/:id' component={withHomeManagerAuthorization(DeleteCoOwnership)} />
            <Route path='/create-home-book/:id' component={withHomeManagerAuthorization(CreateHomeBook)} />
            <Route path='/delete-record/:id' component={withHomeManagerAuthorization(DeleteRecordInHB)} />
            <Route path='/edit-record/:id' component={withHomeManagerAuthorization(EditHomeBook)} />
            <Route path='/delete-estate/:id' component={withHomeManagerAuthorization(DeleteEstate)} />
            <Route path='/edit-estate/:id' component={withHomeManagerAuthorization(EditEstae)} />
            <Route path='/create-estate/:id' component={withHomeManagerAuthorization(CreateEstate)} />
            <Route path='/homebook/:id' component={withUserAuthorization(ListHomeBook)} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
