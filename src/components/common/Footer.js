import React, {Component} from 'react';

export default class Footer extends Component {

    render = () => {
        return(
            <footer className="py-3 bg-light">
                <div className="container">
                    <p className="m-0 text-center text-black">Copyright &copy; HomeBook 2018</p>
                </div>
            </footer>
        )
    }
}