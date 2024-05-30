import React, { Component } from 'react'
import Select from 'react-select'
import { Button } from 'react-bootstrap'
import 'animate.css'
import { MDBTable } from 'mdbreact';
import FlightService from '../Service/FlightService'

class Booking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flights: [],
            selectOptions: [],
            selectOptions2: [],
            flight_Name: '',
            source: '',
            source_n: '',
            destination: '',
            destination_n: '',
            class_Type: '',
            travel_Date: '',
            takeoff_Time: '',
            landing_Time: '',
            business_Cost: '',
            economy_Cost: '',
            displayInfo: 1,
            displayCost: false
        }

        this.changeClass_Type = this.changeClass_Type.bind(this);
        this.changeTravelDate = this.changeTravelDate.bind(this);
        this.showFlights = this.showFlights.bind(this);
    }
    async getOptions() {
        const res = await FlightService.getCities();
        const data = res.data
        const options = data.map(d => ({
            "label": d.source
        }))
        this.setState({ selectOptions: options })

    }

    async getOptions2() {
        const res = await FlightService.destination();
        const data = res.data
        const options = data.map(d => ({
            "label": d.destination
        }))
        this.setState({ selectOptions2: options })

    }


    handleChange(event) {
        this.setState({ source_n: event.label })
    }
    handleChange2(event) {
        this.setState({ destination_n: event.label })
    }
    changeClass_Type(event) {
        this.setState({ class_Type: event.target.value });
    }
    changeTravelDate(event) {
        this.setState({ travel_Date: event.target.value });
    }

    bookFlight(flight_No, cost, class_Type) {
        this.props.history.push({
            pathname: "/user-info",
            state: { flight_No: flight_No, cost: cost, class_Type: class_Type }
        });
    }

    showFlights(event) {
        event.preventDefault();

        if (this.state.class_Type === "Business") {
            FlightService.businessClass(this.state.source_n, this.state.destination_n, this.state.travel_Date).then((res => {
                this.setState({ flights: res.data });
                if (this.state.flights.length === 0) {
                    this.setState({ displayInfo: 3 })
                }
                else {
                    this.setState({ displayInfo: 2 })
                    this.setState({ displayCost: true })
                }
            }));
        }
        if (this.state.class_Type === "Economy") {
            FlightService.economyClass(this.state.source_n, this.state.destination_n, this.state.travel_Date).then((res => {
                this.setState({ flights: res.data });
                if (this.state.flights.length === 0) {
                    this.setState({ displayInfo: 3 })
                }
                else {
                    this.setState({ displayInfo: 2 })
                    this.setState({ displayCost: false })
                }
            }));
        }
    }

    componentDidMount() {
        this.getOptions();
        this.getOptions2();
    }
    render() {

        const rounded = {
            borderRadius: "20px",
            boxShadow: "1px 1px 10px 5px #778899"
        }

        let display = this.state.displayInfo;
        const cost = this.state.displayCost;
        let View;

        if (display === 2) {
            View =
                (
                    <div className="animate__animated animate__fadeInDown" align="center">
                        <h2 className="text-center serif">Available Flights</h2>
                        <div className="row">
                            <MDBTable scrollY maxHeight="320px">
                                <table className="table table-hover">
                                <thead>
    <tr>
        <th class="serif">Flight Name</th>
        <th class="serif">Source</th>
        <th class="serif">Destination</th>
        <th class="serif">Departure Time</th>
        <th class="serif">Arrival Time</th>
        <th class="serif">Tickets Available</th>
        <th class="serif">Cost</th>
        <th class="serif">Action</th>
    </tr>
</thead>

<tbody>
    {this.state.flights.map(flight => (
        <tr key={flight.flight_No}>
            <td class="serif">{flight.flight_Name}</td>
            <td class="serif">{flight.source}</td>
            <td class="serif">{flight.destination}</td>
            <td class="serif">{flight.takeoff_Time}</td>
            <td class="serif">{flight.landing_Time}</td>
            <td class="serif">{flight.available_Tickets}</td>
            <td class="serif">
                {cost ? flight.business_Cost : flight.economy_Cost}
            </td>
            <td>
                {cost ? (
                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                            this.bookFlight(
                                flight.flight_No,
                                flight.business_Cost,
                                this.state.class_Type
                            )
                        }
                        className="btn btn-success serif"
                    >
                        Book
                    </button>
                ) : (
                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                            this.bookFlight(
                                flight.flight_No,
                                flight.economy_Cost,
                                this.state.class_Type
                            )
                        }
                        className="btn btn-success serif"
                    >
                        Book
                    </button>
                )}
            </td>
        </tr>
    ))}
</tbody>

                                </table>
                            </MDBTable>
                        </div>
                    </div>

                );
        }

        if (display === 3) {
            if (this.state.source_n === this.state.destination_n) {
                View =
                    (
                        <div className="animate__animated animate__fadeInDown">
                            <h5>Source and Destination cannot be same</h5>
                        </div>
                    );
            }
            else {
                View =
                    (
                        <div className="animate__animated animate__fadeInDown">
                            <h5>No flights available</h5>
                        </div>
                    );
            }
        }



        return (
            <div class="bookBgImg overflow ">
                <div class="blurDiv-roundCorners animate__animated animate__fadeInDown col-md-10 offset-md-1">

                    <br /><br />
                    <h1 align="center" class="" style={{ fontFamily: "Georgia" }}>Book Your Ticket</h1>
                    <br></br>
                    <div>
                        <form onSubmit={this.showFlights} >
                            <div className="row">
                                <div className="offset-md-2 col-md-4">
                                    <h5 class="serif" align="center">Source</h5>
                                    <div style={rounded} class="roundHover">
                                        <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} required />
                                    </div>
                                    <p class="serif" align="center">You have selected <strong>{this.state.source_n}</strong></p>

                                </div>
                                <div className="col-md-4">
                                    <h5 class="serif" align="center">Destination</h5>
                                    <div style={rounded} class="roundHover">
                                        <Select options={this.state.selectOptions2} onChange={this.handleChange2.bind(this)} required />
                                    </div>
                                    <p class="serif" align="center">You have selected <strong>{this.state.destination_n}</strong></p>
                                </div>
                            </div>

                            <h5 class="serif" align="center">Class</h5>
                            <div className="form-group row" align="center">

                                <div className="radio offset-md-3 col-md-3">
                                    <label>
                                        <input
                                            type="radio"
                                            name="class"
                                            value="Business"
                                            required
                                            checked={this.state.class_Type === "Business"}
                                            onChange={this.changeClass_Type}
                                        />
                                        &nbsp;<h5 class="serif">Business</h5>
                                    </label>
                                </div>
                                <div className="radio col-md-3 ">
                                    <label>
                                        <input
                                            type="radio"
                                            name="class"
                                            value="Economy"
                                            required
                                            checked={this.state.class_Type === "Economy"}
                                            onChange={this.changeClass_Type}
                                        />
                                        &nbsp;<h5 class="serif">Economy</h5>
                                    </label>
                                </div>
                            </div>

                            <div className="form-group offset-md-5 col-md-2" align="center">
                                <h5 class="serif">Travel Date</h5>
                                <input style={rounded} type="date" placeholder="Travel Date" name="travel_Date" className="form-control roundHover" required
                                    value={this.state.travel_Date} onChange={this.changeTravelDate} />
                            </div>

                            <br></br>
                            <div align="center" style={{ backgroundColor: "red"}}>
                                <Button style={rounded} class="serif" type="Submit" variant="outline-success" >Check Flights</Button>
                            </div>
                        </form>
                    </div>
                    <br /><br />
                    <div align="center">
                        {View}
                    </div>
                </div>

            </div>


        )
    }
}

export default Booking