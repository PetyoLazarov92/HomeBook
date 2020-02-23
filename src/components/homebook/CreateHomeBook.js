import React, { Component } from 'react';
import BoundForm from '../common/BoundForm';
import observer from '../../infrastructure/observer';
import homeBookService from '../../services/homeBookService'
import esteateService from '../../services/esteateService';
import coOwnership from '../../services/coOwnershipService';

export default class CreateHomeBook extends Component {
    constructor(props){
        super(props);

        this.state = ({
            estates: [],
            coOwnershipName: '',
            coOwnershipId: ''
        })
    }    

    componentDidMount() {
        const { match: { params } } = this.props;
        coOwnership.loadPostById(params.id)
            .then(res => {
                this.setState( {coOwnershipName: res.name, coOwnershipId: res._id} );
            })
        esteateService.loadAllEstatesForThisCoOwnership(params.id)
            .then(res => {
                this.setState( {estates: res} );
            })
    }

    onSubmit = (data, e) => {
        if(!data.toEstate || 'empty' === data.toEstate) {
            return observer.trigger(observer.events.notification, {type: 'info', message: 'You must select a estate!' })
        }
        if(!data.typeOfBusines || 'empty' === data.typeOfBusines) {
            return observer.trigger(observer.events.notification, {type: 'info', message: 'You must select Personal or Corporate!' })
        }
        if(!data.names || 'empty' === data.names) {
            return observer.trigger(observer.events.notification, {type: 'info', message: "Occupant name can't be empty!" })
        }
        if(!data.typeOfOccupant || 'empty' === data.typeOfOccupant) {
            return observer.trigger(observer.events.notification, {type: 'info', message: 'You must select Type Of Occupant!' })
        }
        let newData = {
            names:data.names,
            startingDate:data.startingDate,
            toEstate: data.toEstate,
            typeOfBusines: data.typeOfBusines,
            typeOfOccupant: data.typeOfOccupant,
            toCoOwnership: this.state.coOwnershipId
        }
        homeBookService.createHomeBook(newData)
        .then(res =>{
            observer.trigger(observer.events.notification, {type: 'success', message: "Home Book Record Created Successfully!"})
            this.props.history.push('/homebook/'+ this.state.coOwnershipId);
        })
        .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }

    render = () => {
        return(
            <div className="mx-auto mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
                <div className="panel panel-info text-center" >
                    <div className="heading">
                        <h2 className="title">New Home Book Record to <span className='font-italic text-primary'>{this.state.coOwnershipName}</span></h2>
                    </div>     

                    <div  className="panel-body" >
                        <BoundForm onSubmit={this.onSubmit} className="form-horizontal">
                            <label htmlFor="toEstate">To Estate:</label>
                            <select name='toEstate' className='form-control'>
                                <option value="empty">- Select To Estate -</option>
                                {this.state.estates.map((p, i) => <option key={p._id} value={p._id}>{p.type} № {p.number}</option>)}
                            </select>

                            <label htmlFor="typeOfBusiness">Personal or Corporate:</label>
                            <select name='typeOfBusines' className='form-control'>
                                <option value="empty">- Select type -</option>
                                <option value="individual">Individual</option>
                                <option value="company">Company</option>
                            </select>

                            <label htmlFor="names">Name, Father's name, Surname:</label>
                            <input type="text" className="form-control" name="names" placeholder="Name/Father's name/Surname" />

                            <label htmlFor="typeOfOccupant">Type of Occupant:</label>
                            <select name='typeOfOccupant' className='form-control'>
                                <option value="empty">- Select type of Occupant -</option>
                                <option value="owner">Owner</option>
                                <option value="relatedEntity">Related Entity</option>
                                <option value="occupant">Occupant / Tenant</option>
                            </select>

                            <label htmlFor="startingDate">Starting Date:</label>
                            <input type="date" className="form-control" name="startingDate" />

                            <input type='submit' className="btn btn-success mt-2 mb-2" value='Create'/>   
                        </BoundForm>
                    </div>                     
                </div>  
            </div>
        )
    }
}