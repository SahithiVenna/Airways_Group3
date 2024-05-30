import React, { Component } from 'react';
import UserService from '../Service/UserService'
import { FaUserCircle } from "react-icons/fa";


class UserProfileComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            first_Name: '',
            last_Name: '',
            contact: '',
            gender: ''

        }
    }

    componentDidMount() {
        UserService.userProfile(sessionStorage.getItem('Id')).then(res => {
            this.setState({ user: res.data });
            this.setState({ first_Name: this.state.user[0].first_Name });
            this.setState({ last_Name: this.state.user[0].last_Name });
            this.setState({ gender: this.state.user[0].gender });
            this.setState({ contact: this.state.user[0].contact });
        })
    }




    render() {
        const style1 = {
            backgroundColor: "rgba(230, 230, 230, 0.6000)",
        };

        return (
            <div class="profileBgImg overflow">

                <div className="card card-dark col-md-6 offset-md-3 animate__animated animate__fadeInDown blurDiv-roundCorners" style={style1}>
                    <br></br><br></br><br />
                    <h3 className="text-center serif"><FaUserCircle size={30} /> Profile Page</h3>
                    <div className="card-body">

                        <div className="row">
                            <div class="col-md-5 offset-md-1" ><h5 class="serif">Email-Id: </h5></div>
                            <div class="col-md-5 offset-md-1" > <h5 class="serif">{sessionStorage.getItem('Id')} </h5></div>
                        </div><br />

                        <div className="row">
                            <div class="col-md-5 offset-md-1"><h5 class="serif">First Name : </h5></div>
                            <div class="col-md-5 offset-md-1"> <h5 class="serif">{this.state.first_Name}</h5> </div>
                        </div><br />

                        <div className="row">
                            <div class="col-md-5 offset-md-1"><h5 class="serif"> Last Name   : </h5></div>
                            <div class="col-md-5 offset-md-1"> <h5 class="serif">{this.state.last_Name}</h5> </div>
                        </div><br />

                        <div className="row">
                            <div class="col-md-5 offset-md-1"><h5 class="serif">Gender   : </h5></div>
                            <div class="col-md-5 offset-md-1"> <h5 class="serif">{this.state.gender}</h5> </div>
                        </div><br />

                        <div className="row">
                            <div class="col-md-5 offset-md-1"><h5 class="serif">Contact   : </h5></div>
                            <div class="col-md-5 offset-md-1"> <h5 class="serif">{this.state.contact}</h5> </div>
                        </div><br />

                    </div>
                </div>
                
            </div>


        )
    }
}

export default UserProfileComponent