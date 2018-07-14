import React, { Component } from 'react';

export default class CreateCoOwnership extends Component{
    render = () => {
        return (
            <div>
                <h1>OwnerShips</h1>
                <label htmlFor="role">Co-Ownerships:</label>
                            <ul name='coOwnerShips' className='form-control'>
                                <li>Etajan Sobstvenost 1</li>
                                <li>Etajna Sobstvenost 2</li>
                            </ul>
            </div>
        )
    }
}