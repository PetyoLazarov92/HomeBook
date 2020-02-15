import React, { Component } from 'react';
import userManageService from "../../services/userManageService";
import observer from '../../infrastructure/observer';
import Pagination from '../common/Pagination';
import BoundForm from '../common/BoundForm';

export default class UsersRolesManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allUsers : [],
            allRoles : [],
            pageOfItems: []
        }
    }
    onChangePage = (pageOfItems) => {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    getAllUsersAndRoles = () => {
        Promise.all([userManageService.loadAllUsers(), userManageService.loadUsersRoles()])
            .then(res => {
                this.setState({
                    allUsers: res[0],
                    allRoles: res[1]
                })
            })
            .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }
    onRoleChange = (event) => {
        console.log(event);
    }
    onSubmitAssign = (data) => {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            return observer.trigger(observer.events.notification, {type: 'info', message: 'You have not selected an option from the drop-down menu!' })
        }
        if(!data.user || 'empty' === data.user) {
            return observer.trigger(observer.events.notification, {type: 'info', message: 'You need to select a user to assign a role!' })
        }
        if(!data.role || 'empty' === data.role) {
            return observer.trigger(observer.events.notification, {type: 'info', message: 'You must assign a role to the user!' })
        }
        userManageService.assignRole(data.user, data.role)
        .then(res =>{
            observer.trigger(observer.events.notification, {type: 'success', message: "The role was assigned successfully to the user!"})
            this.props.history.push('/admin-panel');
        })
        .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }
    onSubmitRevoke = (data) => {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            return observer.trigger(observer.events.notification, {type: 'info', message: 'You have not selected an option from the drop-down menu!' })
        }
        if(!data.user || 'empty' === data.user) {
            return observer.trigger(observer.events.notification, {type: 'info', message: 'You must select a user to remove the role from!' })
        }
        if(!data.role || 'empty' === data.role) {
            return observer.trigger(observer.events.notification, {type: 'info', message: 'You must to choose a role for removing!' })
        }
        console.log(data);
        userManageService.revokeRole(data.user, data.role)
        .then(res =>{
            observer.trigger(observer.events.notification, {type: 'success', message: "The role was removed successfully!"})
            this.props.history.push('/admin-panel');
        })
        .catch(res =>  observer.trigger(observer.events.notification, {type: 'error', message: res.responseJSON.description }));
    }

    componentDidMount = () => {
        this.getAllUsersAndRoles();
    }

    render = () => {
        return(
            <div className="d-flex flex-column flex-md-row">
                <div className="col-12 col-md-6 pl-0">
                <h2 className="title d-inline-block pl-md-0">Current users roles</h2>
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
                            {this.state.pageOfItems.map((u, i) => <tr key={u._id} ><td>{u.username}</td><td className="roles-array">{ u._kmd.roles !== undefined && 0 !== u._kmd.roles.length ? this.state.allRoles.map((r, i) => u._kmd.roles.map((ur,i) => ur.roleId === r._id ? <span key="i">{r.name}</span> : null) ) : <span className="text-primary">'No role is assigned!'</span>}</td></tr>)}
                        </tbody>
                    </table>
                    <Pagination items={this.state.allUsers} onChangePage={this.onChangePage} />
                </div>
                <div className="col-12 col-md-6 pr-md-0">
                <h2 className="title">Assign role to user</h2>
                    <hr className="mt-0"/>
                    <BoundForm onSubmit={this.onSubmitAssign} className="form-horizontal">
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

                    <h2 className="title d-inline-block mt-4">Revoke role from user</h2>
                    <hr/>

                    <BoundForm onSubmit={this.onSubmitRevoke} className="form-horizontal">
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

                        <input type='submit' className="btn btn-danger mt-2 mb-2" value='Revoke'/>
                    </BoundForm>
                </div>
            </div>
        )
    }
}