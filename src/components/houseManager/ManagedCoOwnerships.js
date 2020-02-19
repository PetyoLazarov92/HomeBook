import React, { Component } from 'react';

export default class ManagedCoOwnerships extends Component {

    render = () => {
        return(
            <div className="d-flex flex-column flex-md-row">
                <div className="col-12 col-md-6 pl-0">
                <h2 className="title d-inline-block pl-md-0">Currently managed ownerships</h2>
                </div>
            </div>
        )
    }
}