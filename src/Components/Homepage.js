import React, { Component } from 'react'
import Select from 'react-select'
import { Carousel, Nav } from 'react-bootstrap'
import 'animate.css'
import { MDBTable } from 'mdbreact';
import FlightService from '../Service/FlightService'
import { GiCommercialAirplane } from "react-icons/gi";
import { Col, Card, } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'



class Homepage extends Component {
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
            travel_Date: new Date('D-MMM-YYYY'),
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
        this.setState({ travel_Date: "Nan-Nan-05" });
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


        const style1 = {
            backgroundColor: "rgba(230,230,230, 0.9000)",
            padding: "10px",
            color: "black",

        };

        let display = this.state.displayInfo;
        const cost = this.state.displayCost;
        let View;
        if (display === 2) {
            View =
                (
                    <div className="animate__animated animate__fadeInDown container blurDiv-roundCorners" align="center" style={style1}>
                        <h2 className="text-center serif">Available Flights</h2>
                        <div className="row container">
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
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            this.state.flights.map(
                                                flight =>
                                                    <tr key={flight.flight_No}>
                                                        <td class="serif">{flight.flight_Name}</td>
                                                        <td class="serif">{flight.source}</td>
                                                        <td class="serif">{flight.destination}</td>
                                                        <td class="serif">{flight.takeoff_Time}</td>
                                                        <td class="serif">{flight.landing_Time}</td>
                                                        <td class="serif">{flight.available_Tickets}</td>
                                                        <td class="serif">
                                                            {
                                                                cost ? (flight.business_Cost) : (flight.economy_Cost)
                                                            }
                                                        </td>
                                                    </tr>
                                            )
                                        }
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
                        <div className="animate__animated animate__fadeInDown blurDiv-roundCorners">
                            <h5 class="serif">Source and Destination cannot be same</h5>
                        </div>
                    );
            }
            else {
                View =
                    (
                        <div className="animate__animated animate__fadeInDown blurDiv-roundCorners">
                            <h5 class="serif">No flights available</h5>
                        </div>
                    );
            }
        }


        const font = {
            textShadow: " 2px 2px 2px black",
            fontFamily: "Cursive"
        }

        const rounded = {
            borderRadius: "20px",
            boxShadow: "1px 1px 10px 5px #778899"
        }

        return (
            <div class="homePageBg overflow-home">
                <br></br>
                <div class="row">
                <div class="container-fluid col-sm-12" style={{ backgroundColor: "red", padding: "15px" }}>
  <h1 class="animate__animated animate__fadeIn animate__delay-1s" align="right" style={{ color: "blue", fontFamily: "serif" }}>Welcome to Secure Airways</h1>
</div>

                </div>

                <div class="row">
                    <div class="container-fluid">


                        {/* Carousel starts */}
                        <Carousel fade>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://img.freepik.com/premium-photo/commercial-plane-taking-airport-track-flying-air-generative-ai_751108-4126.jpg?w=740"
                                    alt="First slide"
                                    style={{ 'height': "90vh" }}
                                />
                                <Carousel.Caption>
                                    <h1 style={font} class="card-img-top overflow serif">Journey made memorable.</h1>
                                    <p class="card-img-top overflow serif">The moment you doubt whether you can fly, you cease for ever to be able to do it</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://runwaygirlnetwork.com/wp-content/uploads/2024/04/Screenshot-2024-04-18-at-8.42.03%E2%80%AFAM-800x415.jpeg"
                                    alt="Second slide"
                                    style={{ 'height': "90vh" }}
                                />

                                <Carousel.Caption>
                                    <h1 class="card-img-top overflow serif" style={font}>Fly in comfort</h1>
                                    <p class="card-img-top overflow serif">“Remember that happiness is a way of travel, not a destination.”</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://runwaygirlnetwork.com/wp-content/uploads/2021/09/VUE-800x415.jpg"
                                    alt="Third slide"
                                    style={{ 'height': "90vh" }}
                                />

                                <Carousel.Caption>
                                    <h1 class="card-img-top overflow serif" style={font}>Dedicated for happy flying experience</h1>
                                    <p class="card-img-top overflow serif">“Travel. Your money will return. Your time won’t.”</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
                {/* Carousel ends */}

                {/*check Flights starts */}
                <div class="row " >
                    <div class="col-md-12 cardHover" style={style1} >


                        <br /><br />
                        <div>
                            <form onSubmit={this.showFlights} >
                                <div className="row ">
                                    <div className="offset-md-2 col-md-4">
                                        <h5 align="center" class="serif">Source</h5>
                                        <div style={rounded} class="roundHover ">
                                            <Select style={rounded} options={this.state.selectOptions} onChange={this.handleChange.bind(this)} required />
                                        </div>
                                        <p align="center" class="serif">You have selected <strong>{this.state.source_n}</strong></p>
                                    </div>
                                    <div className="col-md-4">
                                        <h5 align="center" class="serif">Destination</h5>
                                        <div style={rounded} class="roundHover ">
                                            <Select style={rounded} options={this.state.selectOptions2} onChange={this.handleChange2.bind(this)} required />
                                        </div>
                                        <p align="center" class="serif">You have selected <strong>{this.state.destination_n}</strong></p>
                                    </div>
                                </div>

                                <h5 align="center" class="serif">Class</h5>
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

                                <div className="form-group offset-md-4 col-md-4" align="center">
                                    <h5 class="serif">Travel Date</h5>
                                    <input style={rounded} type="input" placeholder="Travel Date" name="travel_Date" className="form-control " required
                                        value={this.state.travel_Date} onChange={this.changeTravelDate} />
  
                                </div>

                                <br></br>
                                <div align="center" style={{ backgroundColor: "red"}}>
                                    <button style={rounded} type="Submit" class="btn btn-outline-success serif" >Check Flights</button>
                                </div>
                            </form>
                        </div>
                        <br /><br />

                    </div>
                    <br></br>
                    <div align="center" class="container-fluid animate__animated animate__fadeInDown ">
                        <br></br>
                        {View}
                    </div>
                    <br></br>
                </div>
                {/*check Flights ends */}

                {/*page Details starts */}
                <div class="row col-md-12 container">
                    <div class="col-md-5 offset-md-1">
                        <br></br>
                        <h6 class="serif">&nbsp;&nbsp;#1 Flight booking site</h6>
                        <br />
                        <h2 class="serif">Welcome to Secure Airways</h2>
                        <br />
                        <div class="row">
                            <div class="col-sm-6"><p class="serif">From quick breaks to epic adventures, find the best prices across millions of flights right here. No hidden fees. No hidden charges.</p></div>
                            <div class="col-sm-6"><p class="serif">Smart search filters, such as number of stops and departure time, help you find your perfect flight. Plus we’ve got heaps of tips and tricks to help you save more.</p></div>
                        </div>
                    </div>
                    <div class="col-md-5 offset-md-1 ">
                        <img src="https://5.imimg.com/data5/PP/OB/QW/SELLER-25686744/air-ticket-booking-500x500.png"></img>
                    </div>

                </div>
                {/* page details ends */}

                {/* page details 2 starts */}
                <br></br>
                <div class="row" style={style1} >
                    <div class="col-md-5 offset-md-1" >
                        <br></br>
                        <h1 class="serif" style={{ color: "blue" }}>What we mean by modern travel</h1>
                        <img class="plane-img overflow" src="https://content.skyscnr.com/m/7e7bc1d67ce2a552/original/illustration-modern-travel.svg"></img>
                    </div>
                    <div class="col-md-6 ">
                        <br></br>
                        <p class="serif">Travel is all about freedom. So it makes sense that planning and booking your trip should be simple, not a chore.</p>
                        <br />
                        <p class="serif">We know you're looking for the best prices and most flexibilty to choose what's right for you. Which is why we're always hard at work making sure our website are super straightforward and speedy.</p>
                        <br />
                        <p class="serif">Choose where you want to go, when you want to go and get the very best price from thousands of sites without having to look anywhere else. Plus, check out all the ways we can help you find a trip that's tailored to what you’re looking for, no matter your travel style or your budget.</p>
                        <br />
                        <p class="serif">Feeling flexible? Search ‘Everywhere’ to see where you can go for a great price. Got a destination in mind? Use our Price Alerts to find out when the fare changes.</p>
                        <br />
                        <br/>
                    </div>
                </div>
            </div>


        )
    }
}

export default Homepage