import React from 'react'
import react, { Component } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class AddUser extends React.Component
{
    constructor(props)
    {
        super(props);

        this.initialState = {
            userId:0,
            firstName:'',
            lastName:'',
            emailId:'',
            phoneNumber:'',
            address:'',
            pincode:''
        }

        if(props.user)
            this.state = props.user;
        else
            this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({[name]:value});
    }

    handleSubmit(event)
    {
        event.preventDefault();
        this.props.onFormSubmit(this.state);
        this.setState(this.initialState);
    }

    render()
    {
        let pageTitle;
        let actionStatus;

        if(this.state.userId)
        {
            pageTitle = <h2>Edit User</h2>
            actionStatus = <b>Update</b>
        }
        else
        {
            pageTitle = <h2>Add User</h2>
            actionStatus = <b>Save</b>
        }

        const style1 = {
            backgroundColor: "rgba(230, 230, 230, 0.7000)",
            padding:"40px",
            borderRadius: "10px",
            color:"black"
          };

        return(
            <div style={style1} className="col-md-6 offset-md-3">
                <h2>{pageTitle}</h2>
                <Row>
                    <Col sm={7}>
                        <Form onSubmit={this.handleSubmit}>

                            <Form.Group controlId="FirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}
                                    placeholder="FirstName" />
                            </Form.Group>

                            <Form.Group controlId="LastName">
                            <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}
                                    placeholder="LastName" />
                            </Form.Group>

                            <Form.Group controlId="EmailId">
                                <Form.Label>EmailId</Form.Label>
                                <Form.Control type="text" name="emailId" value={this.state.emailId} onChange={this.handleChange}
                                    placeholder="EmailId" />
                            </Form.Group>

                            <Form.Group controlId="PhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange}
                                    placeholder="Phone Number" />
                            </Form.Group>

                            <Form.Group controlId="Address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" name="address" value={this.state.address} onChange={this.handleChange}
                                    placeholder="Address" />
                            </Form.Group>

                            <Form.Group controlId="Pincode">
                                <Form.Label>Pincode</Form.Label>
                                <Form.Control type="text" name="pincode" value={this.state.pincode} onChange={this.handleChange}
                                    placeholder="Pincode" />
                            </Form.Group>

                            <Form.Group>
                                <br/>
                                <Form.Control type="hidden" name="userId" value={this.state.userId} />
                                <Button variant="success" type="submit">{actionStatus}</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        )

    }
}
export default AddUser;