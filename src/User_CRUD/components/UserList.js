import React, { Component, useReducer } from 'react';
import { Button, Table} from 'react-bootstrap';
import axios from 'axios';
import UserService from '../services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

class UserList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {error:null, users:[], response:{}}
        this.deleteUser = this.deleteUser.bind(this)
    }

    componentDidMount()
    {
        UserService.getAllUsers().then( res =>
            {
                this.setState({users:res.data});
            },
            (error) => {alert("UserList::componentDidMount()..Error" + error); this.setState({error});}
            )
    }

    deleteUser(userId)
    {
        UserService.deleteUser(userId).then(res =>
            {
                this.setState({response:res.data, users:this.state.users.filter(user => user.userId !== userId)});
            },
            (error) => {this.setState({error});}
            )
    }

    render()
    {
        const {error, users} = this.state;

        if(error)
        {
            return(
                <div>Error : {error.message}</div>
            );
        }
        else
        {

            
          
            const style1 = {
              backgroundColor: "rgba(230, 230, 230, 0.7000)",
              padding:"40px",
              borderRadius: "10px",
              color:"black"
            };
          
            return(
                <div className="Container">
                    <br/>
                    <div style={style1}>
                    <table className="table table-hover" >
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>last Name</th>
                                <th>Email ID</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Pincode</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user =>
                                    (
                                        <tr key={user.userId}>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.emailId}</td>
                                            <td>{user.phoneNumber}</td>
                                            <td>{user.address}</td>
                                            <td>{user.pincode}</td>
                                            <td>
                                                <Button type="button" variant="info" onClick={ () => this.props.editUser(user.userId)}>Edit</Button>&nbsp;
                                                <Button type="button" variant="danger" onClick={ () => this.deleteUser(user.userId)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
            )
        }
    }
}
export default UserList