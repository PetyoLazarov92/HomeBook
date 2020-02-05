import React, { Component } from 'react';
import './Loading.css'

export default class Loading extends Component {
    render = () => {
        return (
            <div className="cssload-loader">
	            <div className="cssload-inner cssload-one"></div>
	            <div className="cssload-inner cssload-two"></div>
	            <div className="cssload-inner cssload-three"></div>
            </div>
        )
    }
}