import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import esteateService from '../../services/esteateService';

export default class HomeBook extends Component {
    constructor(props){
        super(props);

        this.state= {
            estate: {}
        }
    }

    componentDidMount = () => {
        esteateService.loadPostById(this.props.toEstate)
        .then(res => {
            console.log(res);
            this.setState({
                estate: res
            })
        })
    }

  render = () => {
      console.log(this.state.estate);
      return(
        
      <tr>
        <td>{this.props.names}</td>
        <td>{this.state.estate.type} № {this.state.estate.number}</td>
        <td>{this.props.startingDate}</td>
        <td>{this.props.typeOfBusines}</td>
        <td>{this.props.typeOfOccupant}</td>
        <td>
            <Link to="/" className="btn btn-primary btn-rounded btn-sm mx-2">Details</Link>
            <Link to="/" className="btn btn-warning btn-rounded btn-sm mx-2">Edit</Link>
            <Link to="/" className="btn btn-danger btn-rounded btn-sm mx-2">Delete</Link>
        </td>
      </tr>
    
      )
  }
}
