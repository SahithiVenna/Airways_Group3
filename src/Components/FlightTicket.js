import React, { Component } from 'react';
import FlightService from '../Service/FlightService';
import {BiPrinter, BiArrowBack} from 'react-icons/bi'
import 'animate.css'

class FlightTicket extends Component {
    constructor(props) {
        super(props)

        this.state = { booking_Id: this.props.match.params.booking_Id, booking: {} }

        this.cancel = this.cancel.bind(this);
    }
    
    cancel() {

        this.props.history.push('/bookings');
    }

    componentDidMount() {
        FlightService.DisplayTicketDetailsByBookingId(this.state.booking_Id).then(res => {
            this.setState({ booking: res.data });
        })
    }

    render() {
        const rounded = {
            borderRadius: "20px",
            boxShadow: "1px 1px 10px 5px #778899",
            fontFamily: "serif"
        }


        const font = {
            fontFamily: "Cursive"
        };


        return (
            <div class="viewTicketBgImg overflow">


                <div className="col-md-10 offset-md-1 animate__animated animate__fadeInDown blurDiv-roundCorners">
                    <br></br>
                    <div class="container-fluid col-sm-12 animate__animated animate__fadeInRight animate__delay-1s" style={{ backgroundColor: "red", padding: "10px", borderRadius: "5px" }}>
  <h1 class="animate__animated animate__fadeIn animate__delay-2s" align="right" style={{ color: "blue", fontFamily: "serif" }}>Secure Airways</h1>
</div>
  <br />
                    <div class="row">
                        <div class="col-sm-4 animate__animated animate__bounceInDown animate__delay-2s" ><h3 style={font}>Your Ticket</h3></div>
                        <div class="col-sm-4" ></div>
                        <div class="col-sm-4 animate__animated animate__bounceInDown animate__delay-2s" ><h3 align="right" style={font}>Booking Id: {this.state.booking.booking_Id}</h3></div>
                    </div>
                    <br />
                    
                    <div>
                        <div class="row">
                            <div class="col-md-2"><h5 class="serif">Flight Name :</h5></div>
                            <div class="col-md-2"><h6 class="serif">{this.state.booking.flight_Name}</h6></div>
                            <div class="col-md-2"><h5 class="serif">Source :</h5></div>
                            <div class="col-md-2"><h6 class="serif">{this.state.booking.source}</h6></div>
                            <div class="col-md-2"><h5 class="serif">Destination :</h5></div>
                            <div class="col-md-2"><h6 class="serif">{this.state.booking.destination}</h6></div>
                        </div>

                        <hr/>

                        <div class="row">
                            <div class="col-md-2"><h5 class="serif">Takeoff Time :</h5></div>
                            <div class="col-md-2"><h6 class="serif">{this.state.booking.takeoff_Time}</h6></div>
                            <div class="col-md-2"><h5 class="serif">Landing Time :</h5></div>
                            <div class="col-md-2"><h6 class="serif">{this.state.booking.landing_Time}</h6></div>
                            <div class="col-md-2"><h5 class="serif">Passport Number :</h5></div>
                            <div class="col-md-2"><h6 class="serif">{this.state.booking.passport_No}</h6></div>
                        </div>

                        <hr/>

                        <div class="row">
                            <div class="col-md-2"><h5 class="serif">Passenger Name :</h5></div>
                            <div class="col-md-2"><h6 class="serif">{this.state.booking.name}</h6></div>
                            <div class="col-md-2"><h5 class="serif">Date of Birth :</h5></div>
                            <div class="col-md-2"><h6 class="serif">{this.state.booking.dob}</h6></div>
                            <div class="col-md-2"><h5 class="serif">Gender :</h5></div>
                            <div class="col-md-2"><h6 class="serif">{this.state.booking.gender}</h6></div>
                        </div>

                        <hr/>

                        <div class="row">
                            <div class="col-md-2"><h5 class="serif">Class :</h5></div>
                            <div class="col-md-2"><h6 class="serif">{this.state.booking.class_Type}</h6></div>
                            <div class="col-md-2"><h5 class="serif">Travel Date :</h5></div>
                            <div class="col-md-2"><h6 class="serif">{this.state.booking.travel_Date}</h6></div>
                            <div class="col-md-2"><h5 class="serif">Booking Date :</h5></div>
                            <div class="col-md-2"><h6 class="serif">{this.state.booking.booking_Date}</h6></div>
                        </div>

                        <hr/>

                        <div class="row">
                            <div class="col-md-2"><h5 class="serif">Total Amount :</h5></div>
                            <div class="col-md-2"><h6 class="serif">{this.state.booking.total_Amount}</h6></div>
                            <div class="col-md-2"><h5 class="serif">Baggage type :</h5></div>
                            <div class="col-md-2"><h6 class="serif"><h7 class="serif">Checked Baggage</h7></h6></div>
                            <div class="col-md-2"><h5 class="serif">Meal Type :</h5></div>
                            <div class="col-md-2"><h6 class="serif"><h7 class="serif">vegetarian</h7></h6></div>
                            <div class="col-md-2 offset-md-4" align="center">
                                <button style={rounded} className="btn btn-danger " onClick={this.cancel} >&nbsp;<BiArrowBack />&nbsp;Back</button>
                            </div>
                            <div class="col-md-2">
                                &nbsp;<button style={rounded} className="btn btn-warning " onClick={() => window.print()}>&nbsp;<BiPrinter/>&nbsp;Print</button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        )
    }


}

export default FlightTicket