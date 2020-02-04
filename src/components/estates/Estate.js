import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import esteateService from '../../services/esteateService';
import CreatedBefore from '../common/CreatedBefore';

export default class Estate extends Component {
    constructor(props){
        super(props);

        this.state= {
            estate: {}
        }
    }

    componentDidMount = () => {
        esteateService.loadAllEstates()
        .then(res => {
            this.setState({
                estate: res
            })
        })
    }

  render = () => {
      return(
        
      <tr>
        <td>{this.props.type}
        <CreatedBefore time={this.props._kmd.ect}/>
        </td>
        <td>{this.props.number}</td>
        <td>{this.props.floor}</td>
        <td>{this.props.builtUpArea}</td>
        <td>{this.props.comonParts}</td>
        <td>
            <Link to={"/edit-estate/"+ this.props._id} className="btn btn-warning btn-rounded btn-sm mx-2">Edit</Link>
            <Link to={"/delete-estate/"+ this.props._id} className="btn btn-danger btn-rounded btn-sm mx-2">Delete</Link>
        </td>
      </tr>
    
      )
  }
}
