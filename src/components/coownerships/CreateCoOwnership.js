import React, { Component } from 'react';
import BoundForm from '../common/BoundForm';
import observer from '../../infrastructure/observer';
import coOwnership from '../../services/coOwnershipService'

export default class CreateCoOwnership extends Component {
    onSubmit = (data, e) => {
        coOwnership.createCoOwnership(data)
        .then(res =>{
            observer.trigger(observer.events.notification, {type: 'success', message: "Co-Ownership Created Successfully!"})
            this.props.history.push('/ownerships');
        })
        .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }
    render = () => {
        return(
            <div className="mx-auto mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
                <div className="panel panel-info text-center" >
                    <div className="heading">
                        <h1 className="title">New Co-Ownership</h1>
                    </div>     

                    <div  className="panel-body" >
                        <BoundForm onSubmit={this.onSubmit} className="form-horizontal">
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="form-control" name="name" placeholder="Name E.g.: (жк.Мрамор бл.15 вх.А)" />

                            <label htmlFor="area">Area:</label>
                            <input type="text" className="form-control" name="area" placeholder="area" />

                            <label htmlFor="municipality">Municipality:</label>
                            <input type="text" className="form-control" name="municipality" placeholder="municipality" />

                            <label htmlFor="region">Region:</label>
                            <input type="text" className="form-control" name="region" placeholder="region" />

                            <label htmlFor="postCode">Postal Code:</label>
                            <input type="text" className="form-control" name="postCode" placeholder="postal-code" />

                            <label htmlFor="city">City / Village:</label>
                            <input type="text" className="form-control" name="city" placeholder="City / Village" />

                            <label htmlFor="neighborhood">Neighborhood:</label>
                            <input type="text" className="form-control" name="neighborhood" placeholder="Neighborhood" />

                            <label htmlFor="street">Street / Boulevard:</label>
                            <input type="text" className="form-control" name="street" placeholder="Street / Boulevard" />

                            <label htmlFor="number">Number:</label>
                            <input type="text" className="form-control" name="number" placeholder="Number" />

                            <label htmlFor="apartmentBuilding">Apartment Building Number:</label>
                            <input type="text" className="form-control" name="apartmentBuilding" placeholder="Apartment Building Number" />

                            <label htmlFor="entrance">Entrance:</label>
                            <input type="text" className="form-control" name="entrance" placeholder="Entrance" />
                            
                            <input type='submit' className="btn btn-success mt-2 mb-2" value='Create'/>   
                        </BoundForm>
                    </div>                     
                </div>  
            </div>
        )
    }
}