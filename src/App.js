import React, { Component } from 'react';
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

class App extends Component {
  render () {
    return (
      <div>
        <Navigation />
        <Notification />
        <div className='container'>
          <Route path='/' exact component={HomePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/logout' component={Logout} />
          <Route path='/create-co-ownership' component={CreateCoOwnership} />
          <Route path='/details-co-ownership/:id' component={DetailsCoOwnership} />
          <Route path='/edit-co-ownership/:id' component={EditCoOwnership} />
          <Route path='/create-home-book/:id' component={CreateHomeBook} />
          <Route path='/create-estate/:id' component={CreateEstate} />
          <Route path='/homebook/:id' component={ListHomeBook} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
