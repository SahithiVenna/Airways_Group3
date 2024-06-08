import React, { Component } from 'react';
import FlightService from '../Service/FlightService';
import { MDBTable } from 'mdbreact';
import 'animate.css'
import '../App.css'


class FlightBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            displayInfo: 1
        }


        this.viewTicket = this.viewTicket.bind(this);
    }


    viewTicket(booking_Id) {
        this.props.history.push(`/view-ticket/${booking_Id}`);
    }


    componentDidMount() {
        FlightService.getBookings(sessionStorage.getItem('Id')).then((res => {
            this.setState({ bookings: res.data });

            if (this.state.bookings.length === 0) {
                this.setState({ displayInfo: 2 });
            }
        }));
    }


    render() {
        const rounded = {
            borderRadius: "20px",
            boxShadow: "1px 1px 10px 5px #778899",
            fontFamily: "serif"
        }

        const font = {
            fontFamily: "serfif"
        };



        let display = this.state.displayInfo;

        if (display === 2) {
            return (
                <div class="bookingDetailsBgImg">
                    <div align="center" class="col-md-8 offset-md-2 animate__animated animate__fadeInDown blurDiv-roundCorners">
                        <br></br><br></br><br></br><br></br><br></br><br></br>
                        <h2 class="serif">You have no bookings</h2>
                        <br></br>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div class="bookingDetailsBgImg overflow">

                    <div className="row col-md-8 offset-md-2 animate__animated animate__fadeInDown blurDiv-roundCorners">
                        <div>
                            <br /><br /><br /><br />
                            <div class="container-fluid col-sm-12 animate__animated animate__fadeInRight animate__delay-1s" style={{ backgroundColor: "coral", padding: "10px", borderRadius: "5px" }}>
                                <h1 class="animate__animated animate__fadeIn animate__delay-2s" align="center" style={{ color: "white", fontFamily: "serif" }}>Your Bookings</h1>
                            </div>
                            <br /><br />
                        </div>
                        <br /><br />

                        <br></br><br></br>
                        <MDBTable scrollY maxHeight="200px">
                            <table className="table table-hover" >
                                <thead>
                                    <tr>
                                        <th style={font}>Booking Id</th>
                                        <th style={font}>Travel Date</th>
                                        <th style={font}>Source</th>
                                        <th style={font}>Destination</th>
                                        <th style={font}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.bookings.map(
                                            booking =>
                                                <tr key={booking.booking_Id}>
                                                    <td style={font}>{booking.booking_Id}</td>
                                                    <td style={font}>{booking.travel_Date}</td>
                                                    <td style={font}>{booking.source}</td>
                                                    <td style={font}>{booking.destination}</td>
                                                    <td>

                                                        <button style={rounded} onClick={() => this.viewTicket(booking.booking_Id)} className="btn btn-success">View Ticket</button>
                                                    </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </MDBTable>
                    </div>
                    
                </div>
            )
        }
    }
}

export default FlightBooking