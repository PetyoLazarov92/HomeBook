import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import coOwnership from '../../services/coOwnershipService'

export default class DetailsCoOwnership extends Component {
    constructor(props){
        super(props);

        this.state = ({
            coOwnership: {},
            isCreator: false
        })
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        coOwnership.loadPostById(params.id)
            .then(res => {
                this.setState({
                    coOwnership: res,
                    isCreator: res._acl.creator === sessionStorage.getItem('userId')
                });
            })
    }

    render = () => {
        return (
            <table className="table table-striped">
        		<thead>
        			<tr>
        				<th className='title' colSpan="2">
                        <h3>Details: <span className='font-italic text-primary'>{this.state.coOwnership.name}</span>
                        {this.state.isCreator && <Link to={"/edit-co-ownership/"+ this.state.coOwnership._id} className="btn btn-warning btn-rounded btn-sm ml-5">Edit Information</Link>}
                        </h3>
                        </th>
        			</tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{this.state.coOwnership.name}</td>
                    </tr>
                    <tr>
                        <th>Area</th>
                        <td>{this.state.coOwnership.area}</td>
                    </tr>
                    <tr>
                        <th>Municipality</th>
                        <td>{this.state.coOwnership.municipality}</td>
                    </tr>
                    <tr>
                        <th>Region</th>
                        <td>{this.state.coOwnership.region}</td>
                    </tr>
                    <tr>
                        <th>Postal Code</th>
                        <td>{this.state.coOwnership.postCode}</td>
                    </tr>
                    <tr>
                        <th>City / Village</th>
                        <td>{this.state.coOwnership.city}</td>
                    </tr>
                    <tr>
                        <th>Neighborhood</th>
                        <td>{this.state.coOwnership.neighborhood}</td>
                    </tr>
                    <tr>
                        <th>Street / Boulevard</th>
                        <td>{this.state.coOwnership.street}</td>
                    </tr>
                    <tr>
                        <th>Number</th>
                        <td>{this.state.coOwnership.number}</td>
                    </tr>
                    <tr>
                        <th>Apartment Building Number</th>
                        <td>{this.state.coOwnership.apartmentBuilding}</td>
                    </tr>
                    <tr>
                        <th>Entrance</th>
                        <td>{this.state.coOwnership.entrance}</td>
                    </tr>
        		</tbody>
            </table>
        )
    }
}