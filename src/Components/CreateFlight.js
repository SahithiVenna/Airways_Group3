import React, { Component } from 'react';
import FlightService from '../Service/FlightService';
import { FaSave } from 'react-icons/fa'
import 'animate.css'
import '../App.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiCheckCircle } from 'react-icons/bi'
import {MdCancel} from 'react-icons/md'

class CreateFlight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flight_No: this.props.match.params.flight_No,
            flight_Name: '',
            source: '',
            destination: '',
            takeoff_Time: '',
            landing_Time: '',
            business_Cost: '',
            economy_Cost: '',
            available_Tickets: '',
            travel_Date: ''
        }
        this.changeFlightNameHandler = this.changeFlightNameHandler.bind(this);
        this.changeSourceHandler = this.changeSourceHandler.bind(this);
        this.changeDestinationHandler = this.changeDestinationHandler.bind(this);
        this.changeTakeoffTimeHandler = this.changeTakeoffTimeHandler.bind(this);
        this.changeLandingTimeHandler = this.changeLandingTimeHandler.bind(this);
        this.changeBusinessCostHandler = this.changeBusinessCostHandler.bind(this);
        this.changeEconomyCostHandler = this.changeEconomyCostHandler.bind(this);
        this.changeAvailableTicketsHandler = this.changeAvailableTicketsHandler.bind(this);
        this.changeTravelDateHandler = this.changeTravelDateHandler.bind(this);
        this.saveOrUpdateFlight = this.saveOrUpdateFlight.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    componentDidMount() {
        if (this.state.flight_No === '_add')
            return;
        else {
            FlightService.DisplayFlightByFLightNo(this.state.flight_No).then((res) => {
                let flight = res.data;
                this.setState({ flight_Name: flight.flight_Name, source: flight.source, destination: flight.destination, takeoff_Time: flight.takeoff_Time, landing_Time: flight.landing_Time, business_Cost: flight.business_Cost, economy_Cost: flight.economy_Cost, available_Tickets: flight.available_Tickets, travel_Date: flight.travel_Date });
            }
            );
        }
    }
    saveOrUpdateFlight(event) {
        let flight = { flight_Name: this.state.flight_Name, source: this.state.source, destination: this.state.destination, takeoff_Time: this.state.takeoff_Time, landing_Time: this.state.landing_Time, business_Cost: this.state.business_Cost, economy_Cost: this.state.economy_Cost, available_Tickets: this.state.available_Tickets, travel_Date: this.state.travel_Date, id: sessionStorage.getItem('Id') }
        if (this.state.flight_No === '_add') {
            FlightService.createFlight(flight).then(res => {
                toast.success(<div>&nbsp;<BiCheckCircle />&nbsp;{"Flight has been added successfully"}</div>, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    pauseOnHover: false,
                });

                setTimeout(function () {
                    window.location.replace('/flights');
                }, 3000);
            });
        }
        else {
            FlightService.updateFlight(this.state.flight_No, flight).then(res => {
                toast.success(<div>&nbsp;<BiCheckCircle />&nbsp;{"Flight details has been updated successfully"}</div>, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    pauseOnHover: false,
                });

                setTimeout(function () {
                    window.location.replace('/flights');
                }, 3000);
            });
        }
        event.preventDefault();
    }


    changeFlightNameHandler(event) {
        this.setState({ flight_Name: event.target.value });
    }
    changeSourceHandler(event) {
        this.setState({ source: event.target.value });
    }
    changeDestinationHandler(event) {
        this.setState({ destination: event.target.value });
    }
    changeTakeoffTimeHandler(event) {
        this.setState({ takeoff_Time: event.target.value });
    }
    changeLandingTimeHandler(event) {
        this.setState({ landing_Time: event.target.value });
    }
    changeBusinessCostHandler(event) {
        this.setState({ business_Cost: event.target.value });
    }
    changeEconomyCostHandler(event) {
        this.setState({ economy_Cost: event.target.value });
    }
    changeAvailableTicketsHandler(event) {
        this.setState({ available_Tickets: event.target.value });
    }
    changeTravelDateHandler(event) {
        this.setState({ travel_Date: event.target.value });
    }

    cancel() {
        this.props.history.push('/flights');
    }
    getTitle() {
        if (this.state.flight_No === '_add')
            return <h2 style={{ color: "black", fontFamily: "serif" }} className="text-center animate__animated animate__fadeInDown">Add Flight</h2>
        else
            return <h2 style={{ color: "black", fontFamily: "serif" }} className="text-center animate__animated animate__fadeInDown">Update Flight</h2>
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
            backgroundColor: "rgba(230,230,230, 0.7000)"
        };


        return (
            <div class="adminAnUBgImg overflow">
                <div  >
                    <div className="row">
                        <div className="card col-md-8 offset-md-2 offset-md-2 animate__animated animate__fadeInDown blurDiv-roundCorners" style={style1}>
                            <br></br><br></br>
                            {this.getTitle()}
                            <div className="card-body">
                                <form class="" onSubmit={this.saveOrUpdateFlight}>

                                    <div className="row" style={{ width : "30px"}}>
                                        <div className="form-group ">
                                            <label><h6 style={font}>Flight Name</h6></label>
                                            <input style={rounded} placeholder="Flight Name" type="text" name="flight_Name" class="form-control" value={this.state.flight_Name} onChange={this.changeFlightNameHandler} required minLength="4" />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label><h6 style={font}>Source</h6></label>
                                            <input style={rounded} placeholder="Source" type="text" name="source" class="form-control" value={this.state.source} onChange={this.changeSourceHandler} required minLength="3"/>
                                        </div>
                                        <div className="form-group col-md-6" style={{ width : "30px"}}>
                                            <label><h6 style={font}>Destination</h6></label>
                                            <input style={rounded} placeholder="Destination" type="text" name="destination" class="form-control" value={this.state.destination} onChange={this.changeDestinationHandler} required minLength="3"/>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label><h6 style={font}>Takeoff Time</h6></label>
                                            <input style={rounded} placeholder="HH:MM:SS" type="time" name="takeoff_Time" class="form-control" value={this.state.takeoff_Time} onChange={this.changeTakeoffTimeHandler} required />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label><h6 style={font}>Landing Time</h6></label>
                                            <input style={rounded} placeholder="HH:MM:SS" type="time" name="landing_Time" class="form-control" value={this.state.landing_Time} onChange={this.changeLandingTimeHandler} required />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group col-md-4">
                                            <label><h6 style={font}>Business Cost</h6></label>
                                            <input style={rounded} placeholder="Business Cost" type="number" name="business_Cost" class="form-control" value={this.state.business_Cost} onChange={this.changeBusinessCostHandler} required minLength="4"/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label><h6 style={font}>Economy Cost</h6></label>
                                            <input style={rounded} placeholder="Economy Cost" type="number" name="economy_Cost" class="form-control" value={this.state.economy_Cost} onChange={this.changeEconomyCostHandler} required minLength="4"/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label><h6 style={font}>Available Tickets</h6></label>
                                            <input style={rounded} placeholder="Available Tickets" type="number" name="available_Tickets" class="form-control" value={this.state.available_Tickets} onChange={this.changeAvailableTicketsHandler} required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label><h6 style={font}>Travel Date</h6></label>
                                        <input style={rounded} placeholder="Travel Date" type="date" name="travel_Date" class="form-control" value={this.state.travel_Date} onChange={this.changeTravelDateHandler} required />
                                    </div>
                                    <br /><br />
                                    <centerr>
                                        <button className="btn btn-success" type="submit" style={rounded}><FaSave />&nbsp;Save</button>&nbsp;&nbsp;
                                        <button className="btn btn-danger" onClick={this.cancel} style={rounded}><MdCancel/>&nbsp;Cancel</button>

                                    </centerr>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default CreateFlight;