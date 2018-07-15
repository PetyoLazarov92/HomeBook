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

class App extends Component {
  render () {
    return (
      <div>
        <Navigation />
        <Notification />
        <div className='container'>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/home' exact component={HomePage} />
            <Route path='/about' exact component={AboutPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route path='/logout' component={Logout} />
            <Route path='/ownerships' component={ListCoOwnership} />
            <Route path='/create-co-ownership' component={CreateCoOwnership} />
            <Route path='/details-co-ownership/:id' component={DetailsCoOwnership} />
            <Route path='/edit-co-ownership/:id' component={EditCoOwnership} />
            <Route path='/delete-co-ownership/:id' component={DeleteCoOwnership} />
            <Route path='/create-home-book/:id' component={CreateHomeBook} />
            <Route path='/delete-record/:id' component={DeleteRecordInHB} />
            <Route path='/create-estate/:id' component={CreateEstate} />
            <Route path='/homebook/:id' component={ListHomeBook} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
