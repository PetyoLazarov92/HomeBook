import React, { Component } from "react"
import userManageService from "../../services/userManageService";
import observer from "../../infrastructure/observer";

export default class SubscribedUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: []
        }
    }

    loadUserById = (id) =>{
        userManageService.loadUser(id)
            .then(res => {
                this.setState({
                    user: res
                })
            })
            .catch(res => {
                observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description })
            })
    }

    componentDidMount(){
        this.loadUserById(this.props.su.userId)
    }

    render = () => {
        return(
            <div className="d-flex align-items-center border rounded mb-3">
                <div>
                    { this.props.su.approved === 'false'
                    ?
                    <button onClick={() => this.props.approve(this.props.su.userId, this.props.coid)} className="d-flex btn box-shadow-none text-success mx-2 p-0" title="Approve"><i className="material-icons md-36">person_add</i></button>
                    :
                    <button onClick={() => this.props.refuse(this.props.su.userId, this.props.coid)} className="d-flex btn box-shadow-none text-danger mx-2 p-0" title="Remove Member"><i className="material-icons md-36">remove_circle</i></button>}
                </div>
                <div className="border-left px-2">
                    { this.state.user[0] !== undefined ? this.state.user[0].username : null }
                </div>
            </div>
        )
    }
}