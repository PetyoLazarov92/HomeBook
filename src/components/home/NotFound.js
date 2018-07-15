import React, {Component} from 'react';

export default class NotFound extends Component {
    render = () => {
        const { location } = this.props;
        const pathname = location.pathname.substring(1);
        return (
        <header className="jumbotron my-4">
            <h1 className="display-3 text-danger">Erorr 404!</h1>
            <h3 className="lead">Page not Found! ---> <code>{pathname}</code></h3>
      </header>
        )
    }
}