import React, { Component } from 'react';
import FlightService from '../Service/FlightService';
import 'animate.css'
import {BiArrowBack} from 'react-icons/bi'

class ViewFlight extends Component {
    constructor(props) {
        super(props)

        this.state = { flight_No: this.props.match.params.flight_No, flight: {} }

        this.cancel = this.cancel.bind(this);
    }
    cancel() {
        this.props.history.push('/flights');
    }

    componentDidMount() {
        FlightService.DisplayFlightByFLightNo(this.state.flight_No).then(res => {
            this.setState({ flight: res.data });
        })
    }

    render() {

        const rounded = {
            borderRadius: "20px",
            boxShadow: "1px 1px 10px 5px #778899"
        }

        const font = {
            fontFamily: "Cursive"
        };


        const style1 = {
            backgroundColor: "rgba(230, 230, 230, 0.7000)",
        };

        return (
            <div class="viewFlightBgImg overflow">


                <div className="card col-md-8 offset-md-2 animate__animated animate__fadeInDown blurDiv-roundCorners" style={style1}>
                    <br></br><br></br>
                    <h3 className="text-center" style={font}>Flight Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <div style={{ width : "30px"}} className="col-md-3" ><label><h5 style={font}>Flight Number : </h5></label></div>
                            <div className="col-md-3"><h5 style={font}>{this.state.flight.flight_No}</h5></div>

                            <div style={{ width : "30px"}} className="col-md-3" ><label><h5 style={font}>Flight Name : </h5></label></div>
                            <div className="col-md-3"><h5 style={font}>{this.state.flight.flight_Name}</h5></div>
                        </div><hr />
                        <div className="row">
                            <div style={{ width : "30px"}} className="col-md-3"><label><h5 style={font}>Source : </h5></label></div>
                            <div className="col-md-3"><h5 style={font}>{this.state.flight.source}</h5></div>

                            <div style={{ width : "30px"}} className="col-md-3"><label><h5 style={font}>Destination : </h5></label></div>
                            <div className="col-md-3"><h5 style={font}>{this.state.flight.destination}</h5>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-3">
                                <label><h5 style={{font, width : "30px"}}>Takeoff Time : </h5></label></div>
                            <div className="col-md-3"><h5 style={font}>{this.state.flight.takeoff_Time}</h5>
                            </div>

                            <div className="col-md-3">
                                <label><h5 style={font}>Landing Time : </h5></label></div>
                            <div className="col-md-3"><h5 style={font}>{this.state.flight.landing_Time}</h5>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-3">
                                <label><h5 style={font}>Business Cost : </h5></label></div>
                            <div className="col-md-3"><h5 style={font}>{this.state.flight.business_Cost}</h5>
                            </div>

                            <div className="col-md-3">
                                <label><h5 style={font}>Economy Cost : </h5></label></div>
                            <div className="col-md-3"><h5 style={font}>{this.state.flight.economy_Cost}</h5>
                            </div>
                        </div>

                        <hr />
                        <div className="row">
                            <div className="col-md-3">
                                <label><h5 style={{font, width : "30px"}}>Available Tickets : </h5></label></div>
                            <div className="col-md-3"><h5 style={font}>{this.state.flight.available_Tickets}</h5>
                            </div>



                            <div className="col-md-3">
                                <label><h5 style={{font, width : "30px"}} >Travel Date : </h5></label></div>
                            <div className="col-md-3"><h5 style={font}>{this.state.flight.travel_Date}</h5>
                                <br></br>
                            </div>
                        </div>
                        <center>
                            <button style={rounded} className="btn btn-danger" onClick={this.cancel} ><BiArrowBack/>&nbsp;Back</button>
                        </center>
                    </div>
                </div>
            </div>
        )
    }


}

export default ViewFlight