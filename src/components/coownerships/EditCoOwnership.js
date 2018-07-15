import React, { Component } from 'react';
import coOwnership from '../../services/coOwnershipService'
import observer from '../../infrastructure/observer';

export default class EditCoOwnership extends Component {
    constructor(props){
        super(props)

        this.state = ({
            coOwnership: {}
        })
        console.log(props);
    }

    onChange = (event) => {
        const { coOwnership } = this.state;
        const newObj = {
            ...coOwnership,
            [event.target.name]: event.target.value
        }
        this.setState(
            {coOwnership: newObj }
            // (prevState, props) => ({
            //     coOwnership: prevState.coOwnership + props
            //   })
        );
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.coOwnership);
        coOwnership.editPost(this.state.coOwnership, this.state.coOwnership._id)
        .then(res =>{
            observer.trigger(observer.events.notification, {type: 'success', message: "Co-Ownership Edited Successfully!"})
            this.props.history.push('/');
        })
        .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        coOwnership.loadPostById(params.id)
            .then(res => {
                this.setState({ coOwnership: res });
            })
    }

    render = () => {
        return(
            <div className="mx-auto mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
                <div className="panel panel-info text-center" >
                    <div className="heading">
                        <h3>Edit: <span className='font-italic text-primary'>{this.state.coOwnership.name}</span></h3>
                    </div>     

                    <div  className="panel-body" >
                        <form onSubmit={this.onSubmit} className="form-horizontal">
                            <label htmlFor="name">Name:</label>
                            <input type="text" onChange={this.onChange} className="form-control" name="name"  placeholder="Name E.g.: (жк.Мрамор бл.15 вх.А)" value={this.state.coOwnership.name} />

                            <label htmlFor="area">Area:</label>
                            <input type="text" onChange={this.onChange} className="form-control" name="area" placeholder="area" value={this.state.coOwnership.area}/>

                            <label htmlFor="municipality">Municipality:</label>
                            <input type="text" onChange={this.onChange} className="form-control" name="municipality" placeholder="municipality" value={this.state.coOwnership.municipality}/>

                            <label htmlFor="region">Region:</label>
                            <input type="text" onChange={this.onChange} className="form-control" name="region" placeholder="region" value={this.state.coOwnership.region}/>

                            <label htmlFor="postCode">Postal Code:</label>
                            <input type="text" onChange={this.onChange} className="form-control" name="postCode" placeholder="postal-code" value={this.state.coOwnership.postCode}/>

                            <label htmlFor="city">City / Village:</label>
                            <input type="text" onChange={this.onChange} className="form-control" name="city" placeholder="City / Village" value={this.state.coOwnership.city}/>

                            <label htmlFor="neighborhood">Neighborhood:</label>
                            <input type="text" onChange={this.onChange} className="form-control" name="neighborhood" placeholder="Neighborhood" value={this.state.coOwnership.neighborhood}/>

                            <label htmlFor="street">Street / Boulevard:</label>
                            <input type="text" onChange={this.onChange} className="form-control" name="street" placeholder="Street / Boulevard" value={this.state.coOwnership.street}/>

                            <label htmlFor="number">Number:</label>
                            <input type="text" onChange={this.onChange} className="form-control" name="number" placeholder="Number" value={this.state.coOwnership.number} />

                            <label htmlFor="apartmentBuilding">Apartment Building Number:</label>
                            <input type="text" onChange={this.onChange} className="form-control" name="apartmentBuilding" placeholder="Apartment Building Number" value={this.state.coOwnership.apartmentBuilding} />

                            <label htmlFor="entrance">Entrance:</label>
                            <input type="text" onChange={this.onChange} className="form-control" name="entrance" placeholder="Entrance" value={this.state.coOwnership.entrance} />
                            
                            <input type='submit' className="btn btn-success mt-2 mb-2" value='Edit'/>   
                        </form>
                    </div>                     
                </div>  
            </div>
        )
    }
}
