import React, { Component } from 'react';
import BoundForm from '../common/BoundForm';
import observer from '../../infrastructure/observer';
import userManage from '../../services/userManageService'

export default class AdminPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allUsers : [],
            allRoles : []
        }
    }

    getAllUsersAndRoles = () => {
        Promise.all([userManage.loadAllUsers(), userManage.loadUsersRoles()])
            .then(res => {
                console.log(res)
                this.setState({
                    allUsers: res[0],
                    allRoles: res[1]
                })
            })
            .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }
    getAllUsers = () => {
        
        userManage.loadAllUsers()
            .then(res => {
                this.setState({
                    allUsers: res,
                    ready: true
                })
                console.log(res);
            })
            .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
        userManage.loadUsersRoles()
            .then(res => {
                // this.setState({
                //     allUsers: res,
                //     ready: true
                // })
                console.log(res);
            })
            .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
        userManage.loadRoleMembers("f21174f8-ef05-4911-a20e-4eb612b2c79c")
            .then(res => {
                // this.setState({
                //     allUsers: res,
                //     ready: true
                // })
                console.log(res);
            })
            .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
        userManage.revokeRole("5e3134e20915c73b1875ee6d","f21174f8-ef05-4911-a20e-4eb612b2c79c")
            .then(res => {
                // this.setState({
                //     allUsers: res,
                //     ready: true
                // })
                console.log(res);
            })
            .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }
    onRoleChange = (event) => {
        console.log(event);
    }
    onSubmit = (data) => {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            return observer.trigger(observer.events.notification, {type: 'error', message: 'You have not selected an option from the drop-down menu!' })
        }
        if(!data.user || 'empty' === data.user) {
            return observer.trigger(observer.events.notification, {type: 'error', message: 'You must select a user!' })
        }
        if(!data.role || 'empty' === data.role) {
            return observer.trigger(observer.events.notification, {type: 'error', message: 'You must assign a role to the user!' })
        }
        console.log(data);
        userManage.assignRole(data.user, data.role)
        .then(res =>{
            observer.trigger(observer.events.notification, {type: 'success', message: "The role was assigned successfully to the user!"})
            this.props.history.push('/admin-panel');
        })
        .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }

    componentDidMount = () => {
        this.getAllUsersAndRoles();
    }

    render = () => {
        return(
        <div>
            <div className="heading">
                <h1 className="title">Admin panel</h1>
                <hr/>
            </div>
                <h2 className="title d-inline-block col-6 pl-0">Current user roles</h2>
                <h2 className="title d-inline-block col-6">Assign role to user</h2>
            <div className="d-flex">
                <div className="col-6 pl-0">
                    <table className="table table-striped">
                        <thead>
                            <tr>
        				        <th>
                                    Username
                                </th>
                                <th>
                                    Role
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.allUsers.map((u, i) => <tr key={u._id} ><td>{u.username}</td><td className="roles-array">{0 !== u._kmd.roles.length ? this.state.allRoles.map((r, i) => u._kmd.roles.map((ur,i) => ur.roleId === r._id ? <span key="i">{r.name}</span> : null) ) : <span className="text-primary">'No role is assigned!'</span>}</td></tr>)}
                        </tbody>
                    </table>
                </div>
                <div className="col-6 pr-0">
                    <hr className="mt-0"/>
                    <BoundForm onSubmit={this.onSubmit} className="form-horizontal">
                        <label htmlFor="user">User:</label>
                        <select name='user' className='form-control'>
                            <option value="empty">- Select user -</option>
                            {this.state.allUsers.map((u, i) => <option key={u._id} value={u._id}>{u.username}</option>)}
                        </select>

                        <label htmlFor="role">Assign role:</label>
                        <select name='role' className='form-control'>
                            <option value="empty">- Select role -</option>
                            {this.state.allRoles.map((r, i) => <option key={r._id} value={r._id}>{r.name}</option>)}
                        </select>

                        <input type='submit' className="btn btn-success mt-2 mb-2" value='Assign'/>
                    </BoundForm>
                </div>
            </div>
        </div>
    )
  }
}
