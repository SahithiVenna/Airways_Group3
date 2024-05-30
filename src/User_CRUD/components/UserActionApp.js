import React, {Component} from 'react';
import { Button, ContainerFluid } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './UserList'
import UserService from '../services/UserService'
import AddUser from './AddUser'
import 'bootstrap/dist/css/bootstrap.min.css';

class UserActionApp extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            isAddUser: false,
            error: null,
            response: {},
            isEditUser: false,
            isUserDetails: true,
            userData: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    onCreate()
    {
        this.setState({userData:null});
        this.setState({isAddUser:true, isUserDetails:false});
    }

    onDetails()
    {
        this.setState({isAddUser:false, isUserDetails:true});
    }

    onFormSubmit(data)
    {
        this.setState({isAddUser:true, isUserDetails:false});

        if(this.state.isEditUser)
        {
            UserService.updateUserDetails(data).then(result => {
                this.setState({response:result, isAddUser:false, isEditUser:false, isUserDetails:true})
            });
        }
        else
        {
            UserService.InsertUserDetails(data).then(result => {
                this.setState({response:result, isAddUser:false, isEditUser:false, isUserDetails:true})
            });
        }
    }

    editUser = userId => {
        this.setState({isUserDetails:false});

        UserService.GetUserDetailsById(userId).then(result => {
            this.setState({userData:result.data, isAddUser:true, isEditUser:true, isUserDetails:false});
        })
    }

    render()
    {
        let userForm;
        if(this.state.isAddUser || this.state.isEditUser)
        {
            userForm = <AddUser onFormSubmit={this.onFormSubmit} user={this.state.userData} />
        }

        return(
            <div className="container-fluid">
                
                    <h1 style={{textAlign:'center'}}>CRUD Operations in REACT</h1>
                    <hr/>
                    {!this.state.isUserDetails && <Button variant="primary" onClick={() => this.onDetails()}>User Details</Button>}
                    {!this.state.isAddUser && <Button variant="primary" onClick={() => this.onCreate()}>Add user</Button>} <br/>
                    {!this.state.isAddUser && <UserList editUser={this.editUser} />}
                    {userForm}
                
            </div>
        )
    }
}
export default UserActionApp;