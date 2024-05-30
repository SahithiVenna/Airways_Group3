import React, { Component } from 'react';
import FlightService from '../Service/FlightService';
import 'animate.css'
import '../App.css'
import { MDBTable } from 'mdbreact';
import { BsFillTrashFill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BiCheckCircle } from 'react-icons/bi';
import {IoMdAddCircle} from 'react-icons/io'


class FlightList extends Component {
    constructor(props) {
        super(props);
        this.state = { flights: [] }
        this.addFlight = this.addFlight.bind(this);
        this.editFlight = this.editFlight.bind(this);
        this.deleteFlight = this.deleteFlight.bind(this);
        this.viewFlight = this.viewFlight.bind(this);
    }

    deleteFlight = (flight_No) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => FlightService.deleteFlight(flight_No).then(res => {
                        this.setState({ flights: this.state.flights.filter(flight => flight.flight_No !== flight_No) });
                        toast.success(<div>&nbsp;<BiCheckCircle />&nbsp;{"Flight Number: " + flight_No + " has been cancelled successfully"}</div>, {
                            position: "top-center",
                            hideProgressBar: false
                        });
                    })
                },
                {
                    label: 'No',
                    onClick: () => this.props.history.push('/flights')
                }
            ]
        });
    };


    viewFlight(flight_No) {
        this.props.history.push(`/view-flight/${flight_No}`);
    }

    editFlight(flight_No) {
        this.props.history.push(`/add-flight/${flight_No}`);
    }

    componentDidMount() {
        FlightService.getFlights().then((res => {
            this.setState({ flights: res.data });
        }));
    }

    addFlight() {
        this.props.history.push('/add-flight/_add')
    }

    render() {
        const rounded = {
            borderRadius: "20px",
            boxShadow: "1px 1px 10px 5px #778899",
            color: "white"
        }

        const font = {
            fontFamily: "Cursive"
        };

        return (
            <div class="adminFlightListBgImg overflow">
                <div className="row col-md-10 offset-md-1 animate__animated animate__fadeInDown animate__delay-1s blurDiv-roundCorners">
                    <div>
                        <br /><br />
                        <center><h2 className="animate__animated animate__fadeInDown" style={{ color: "", fontFamily: "serif" }}>Admin Home Page</h2></center>
                    </div>
                    <nav class="navbar navbar-light " >
                        <form class="container-fluid justify-content-start">
                            <button class="btn btn-success me-2 btn-zoom" style={rounded} type="button" onClick={this.addFlight}>&nbsp;<IoMdAddCircle/>&nbsp;Add Flight</button>
                            <br></br>
                        </form>
                    </nav>
                    <MDBTable scrollY maxHeight="260px">
                        <table className="table table-hover" >
                            <thead>
                                <tr>
                                    <th style={font}>Flight Number</th>
                                    <th style={font}>Flight Name</th>
                                    <th style={font}>Source</th>
                                    <th style={font}>Destination</th>
                                    <th style={font}>Available Tickets</th>
                                    <th style={font}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.flights.map(
                                        flight =>
                                            <tr key={flight.flight_No}>
                                                <td style={font}>{flight.flight_No}</td>
                                                <td style={font}>{flight.flight_Name}</td>
                                                <td style={font}>{flight.source}</td>
                                                <td style={font}>{flight.destination}</td>
                                                <td style={font}>{flight.available_Tickets}</td>
                                                <td>
                                                    <button onClick={() => this.editFlight(flight.flight_No)} style={rounded} className="btn btn-warning btn-zoom">&nbsp;&nbsp;<FaEdit />&nbsp;&nbsp;</button>&nbsp;&nbsp;&nbsp;
                                                    <button style={rounded} onClick={() => this.deleteFlight(flight.flight_No)} className="btn btn-danger btn-zoom">&nbsp;&nbsp;<BsFillTrashFill />&nbsp;&nbsp;</button>&nbsp;&nbsp;&nbsp;
                                                    <button style={rounded} onClick={() => this.viewFlight(flight.flight_No)} className="btn btn-success btn-zoom">&nbsp;&nbsp;<FaEye />&nbsp;&nbsp;</button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </MDBTable>
                </div>
                <br /><br />
            </div>
        )
    }
}

export default FlightList