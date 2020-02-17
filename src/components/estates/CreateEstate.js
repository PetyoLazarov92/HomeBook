import React, { Component } from 'react';
import BoundForm from '../common/BoundForm';
import observer from '../../infrastructure/observer';
import estateService from '../../services/esteateService'
import coOwnership from '../../services/coOwnershipService'

export default class CreateEstate extends Component {
    constructor(props){
        super(props);

        this.state = ({
            name: '',
            coOwnershipId: ''
        })
    }    

    componentDidMount() {
        const { match: { params } } = this.props;
        coOwnership.loadPostById(params.id)
            .then(res => {
                const coOwnershipId = res._id;
                const name = res.name;
                this.setState({ name, coOwnershipId });
            })
    }
    
    
    onSubmit = (data, e) => {
        let newData = {
            type: data.type,
            number: data.number,
            floor: data.floor,
            builtUpArea: data.builtUpArea,
            comonParts: data.comonParts,
            coOwnership: this.state.coOwnershipId
        }
        estateService.createEstate(newData)
        .then(res =>{
            observer.trigger(observer.events.notification, {type: 'success', message: "Estate Created Successfully!"})
            this.props.history.push("/estates/"+ this.state.coOwnershipId);
        })
        .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }
    render = () => {
        return(
            <div className="mx-auto mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
                <div className="panel panel-info text-center" >
                    <div className="heading">
                        <h2 className="title">New Estate to <span className='font-italic text-primary'>{this.state.name}</span></h2>
                    </div>     

                    <div  className="panel-body" >
                        <BoundForm onSubmit={this.onSubmit} className="form-horizontal">
                            <label htmlFor="type">Type:</label>
                            <select name='type' className='form-control'>
                                <option value="apartment">Аpartment</option>
                                <option value="garage">Garage</option>
                                <option value="atelier">Atelier</option>
                                <option value="office">Office</option>
                                <option value="basement">Basement</option>
                                <option value="warehouse">Warehouse</option>
                            </select>

                            <label htmlFor="number">Number:</label>
                            <input type="text" className="form-control" name="number" placeholder="Number" />

                            <label htmlFor="floor">Floor:</label>
                            <input type="text" className="form-control" name="floor" placeholder="Floor" />

                            <label htmlFor="builtUpArea">Built-up area:</label>
                            <input type="text" className="form-control" name="builtUpArea" placeholder="m2" />

                            <label htmlFor="comonParts">Common parts:</label>
                            <input type="text" className="form-control" name="comonParts" placeholder="m2" />

                            <input type='submit' className="btn btn-success mt-2 mb-2" value='Create'/>   
                        </BoundForm>
                    </div>                     
                </div>  
            </div>
        )
    }
}