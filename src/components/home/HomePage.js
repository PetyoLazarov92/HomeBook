import React, {Component} from 'react';

export default class HomeContainer extends Component {
    render = () => {
        return (
        <header className="jumbotron my-4">
        <picture className='d-flex mt-0 border-bottom border-5'>
            <img src="../../new_vector logo.svg" alt='logo' className="img-fluid mx-auto" />
        </picture>
        
        <h1 className="display-3">Welcome To Home book!</h1>
        <p className="lead">Dear co-operators, here you can organize and improve your co-living, discuss important topics and issues. Get to know all the new residents of your cooperation, and be informed about recent events and news. Live in peace and understanding with each other.</p>
      </header>
        )
    }
}