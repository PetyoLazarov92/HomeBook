import React, { Component } from 'react';
import homeBookService from '../../services/homeBookService'
import observer from '../../infrastructure/observer';
import esteateService from '../../services/esteateService';
import coOwnership from '../../services/coOwnershipService';


export default class EditHomeBook extends Component {
    constructor(props){
        super(props)

        this.state = ({
            homeBookRecord: {},
            coOwnershipName: '',
            coOwnershipId: '',
            estates: [],
            toEstateId: ''
        })
    }

    onChange = (event) => {
        const { homeBookRecord } = this.state;
        const newObj = {
            ...homeBookRecord,
            [event.target.name]: event.target.value
        }
        this.setState(
            {homeBookRecord: newObj }
        );
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        homeBookService.loadPostById(params.id)
            .then(res => {
                this.setState({ homeBookRecord: res , toEstateId: res.toEstate});
            }).then(
                coOwnership.loadPostById(params.id)
                    .then(res => {
                        this.setState( {coOwnershipName: res.name, coOwnershipId: res._id} );
                    })
                ).then(
                    esteateService.loadPostById(this.state.toEstateId)
                        .then(res => {
                            this.setState( {estates: res} );
                        })
                    )
        
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.homeBookRecord);
        homeBookService.editPost(this.state.homeBookRecord, this.state.homeBookRecord._id)
        .then(res =>{
            observer.trigger(observer.events.notification, {type: 'success', message: "Home book record Edited Successfully!"})
            this.props.history.push('/');
        })
        .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }

    render = () => {
        return(
            <div className="mx-auto mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
                <div className="panel panel-info text-center" >
                    <div className="heading">
                        <h3>Edit: <span className='font-italic text-primary'>{this.state.homeBookRecord.names}</span></h3>
                    </div>     

                    <div  className="panel-body" >
                        <form onSubmit={this.onSubmit} className="form-horizontal">
                        <label htmlFor="toEstate">To Estate:</label>
                            <select onChange={this.onChange} name='toEstate' className='form-control'>
                                {this.state.estates.map((p, i) => <option key={p._id} value={p._id}>{p.type} № {p.number}</option>)}
                            </select>

                            <label htmlFor="typeOfBusiness">Тype:</label>
                            <select onChange={this.onChange} value={this.state.homeBookRecord.typeOfBusines} name='typeOfBusines' className='form-control'>
                                <option value="individual">Individual</option>
                                <option value="company">Company</option>
                            </select>

                            <label htmlFor="names">Name, Father's name, Surname:</label>
                            <input type="text" onChange={this.onChange} value={this.state.homeBookRecord.names} className="form-control" name="names" placeholder="Name/Father's name/Surname" />

                            <label htmlFor="typeOfOccupant">Type of Occupant:</label>
                            <select name='typeOfOccupant' onChange={this.onChange} value={this.state.homeBookRecord.typeOfOccupant} className='form-control'>
                                <option value="owner">Owner</option>
                                <option value="relatedEntity">Related Entity</option>
                                <option value="occupant">Occupant / Tenant</option>
                            </select>

                            <label htmlFor="startingDate">Starting Date:</label>
                            <input type="date" onChange={this.onChange} value={this.state.homeBookRecord.startingDate} className="form-control" name="startingDate" />

                            <input type='submit' className="btn btn-success mt-2 mb-2" value='Edit'/>    
                        </form>
                    </div>                     
                </div>  
            </div>
        )
    }
}
