import React, { Component } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css'
import FlightService from '../Service/FlightService';
import { BiCheckCircle } from 'react-icons/bi'


class Passenger_Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flight_No: this.props.location.state.flight_No,
            total_Amount: this.props.location.state.cost,
            class_Type: this.props.location.state.class_Type,
            name: '',
            gender: '',
            dob: '',
            passport_No: '',
            type_Of_Payment: '',
            card_No: '',
            exp_Date: '',
            cvv: '',
            name_On_Card: ''
        }

        this.changeFullName = this.changeFullName.bind(this);
        this.changeGender = this.changeGender.bind(this);
        this.changeDOB = this.changeDOB.bind(this);
        this.changePassport_No = this.changePassport_No.bind(this);
        this.changePaymentType = this.changePaymentType.bind(this);
        this.changeCard_No = this.changeCard_No.bind(this);
        this.changeExp_Date = this.changeExp_Date.bind(this);      //not in db
        this.changeCVV = this.changeCVV.bind(this);                //not in db
        this.changeName_On_Card = this.changeName_On_Card.bind(this);


        this.submitData = this.submitData.bind(this);
    }

    componentDidMount() {

    }


    submitData(event) {
        let userData = {
            flight_No: this.state.flight_No, name: this.state.name, gender: this.state.gender, dob: this.state.dob, passport_No: this.state.passport_No,
            type_Of_Payment: this.state.type_Of_Payment, card_No: this.state.card_No, name_On_Card: this.state.name_On_Card,
            class_Type: this.state.class_Type, total_Amount: this.state.total_Amount, id: sessionStorage.getItem('Id')
        }
        console.log('userData =>' + JSON.stringify(userData));

        FlightService.booking(userData).then(res => {
            console.log("After submitting, data returned is: " + res.data);
            toast.success(<div>&nbsp;<BiCheckCircle />&nbsp;{"Your ticket has been successfully booked."}</div>, {
                position: "top-center",
                hideProgressBar: true,
                autoClose: 3000,
                pauseOnHover: false,
            });
            setTimeout(function () {
                window.location.replace('/bookings');
            }, 3000);
        });


        event.preventDefault();
    }


    changeFullName(event) {
        this.setState({ name: event.target.value });
    }

    changeGender(event) {
        this.setState({ gender: event.target.value });
    }

    changeDOB(event) {
        this.setState({ dob: event.target.value });
    }

    changePassport_No(event) {
        this.setState({ passport_No: event.target.value });
    }

    changePaymentType(event) {
        this.setState({ type_Of_Payment: event.target.value });
    }

    changeCard_No(event) {
        this.setState({ card_No: event.target.value });
    }

    changeExp_Date(event) {
        this.setState({ exp_Date: event.target.value });
    }

    changeCVV(event) {
        this.setState({ cvv: event.target.value });
    }

    changeName_On_Card(event) {
        this.setState({ name_On_Card: event.target.value });
    }



    render() {
        const rounded = {
            borderRadius: "20px",
            boxShadow: "1px 1px 10px 5px #778899"
        }



        const style1 = {
            backgroundColor: "rgba(230, 230, 230, 0.6000)",
        };

        return (
            <div className=" paymentBgImg overflow" >

                <div className="container">
                    <div className="row">
                        <div className="card container blurDiv-roundCorners  animate__animated animate__fadeInDown" style={style1} align="center" >

                            <form onSubmit={this.submitData}>
                                <br></br>
                                <div className="card-body row">

                                    <br />
                                    <div class="col-md-6">
                                        <br />
                                        <h4>Passenger Details</h4>
                                        <div className="form-group">
                                            <br /><br />
                                            <label>Full Name</label>
                                            <br />
                                            <input style={rounded} placeholder="Full Name" name="name" className="form-control" required
                                                value={this.state.name} onChange={this.changeFullName} />
                                            <br />
                                        </div>

                                        <div className="form-group row">
                                            <div className="radio col-md-4">
                                                <br />
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="Male"
                                                        required
                                                        checked={this.state.gender === "Male"}
                                                        onChange={this.changeGender}
                                                    />
                                                    Male&nbsp;
                                                </label>
                                            </div>
                                            <div className="radio col-md-4">
                                                <br />
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="Female"
                                                        required
                                                        checked={this.state.gender === "Female"}
                                                        onChange={this.changeGender}
                                                    />
                                                    Female&nbsp;
                                                </label>
                                            </div>
                                            <div className="radio col-md-4">
                                                <br />
                                                <label htmlFor="baggage_info">Baggage</label>
                                                <select className="form-control" id="baggage_info" name="baggage_info" value={this.state.baggage_info} onChange={this.handleBaggageChange} required>
                                                <option value="">-- Select baggage --</option>
                                                <option value="carry_on">Carry-On Only</option>
                                                <option value="checked_baggage">Checked Baggage</option>
                                                <option value="both">Both Carry-On and Checked Baggage</option>
                                                </select>
                                           
                                                <br />
                                                <label htmlFor="Meal Type">Meal Type</label>
                                                <select className="form-control" id="meal" name="meal" value={this.state.baggage_info} onChange={this.handleBaggageChange} required>
                                                <option value="">-- Select Meal --</option>
                                                <option value="carry_on">vegetarian</option>
                                                <option value="checked_baggage">Non-vegetarian</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <br />
                                                <label>Birth Date</label>
                                                <input style={rounded} type="date" placeholder="Birth Date" name="dob" className="form-control" required
                                                    value={this.state.dob} onChange={this.changeDOB} />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <br />
                                                <label>Passport Number</label>
                                                <input style={rounded} placeholder="Passport Number" name="passport_No" className="form-control" minLength="6" maxLength="6"
                                                    value={this.state.passport_No} onChange={this.changePassport_No} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ---------------------------------------------------------------------------------------- */}
                                    <div class="col-md-6">
                                        <br />
                                        <h4>Payment</h4>



                                        <div className="form-group row">

                                            <div className="radio col-md-6">

                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="card"
                                                        value="Credit Card"
                                                        required
                                                        checked={this.state.type_Of_Payment === "Credit Card"}
                                                        onChange={this.changePaymentType}
                                                    />
                                                    Credit Card
                                                </label>
                                            </div>
                                            <div className="radio col-md-6">

                                                <label>
                                                    <input
                                                        type="radio"
                                                        name="card"
                                                        value="Debit Card"
                                                        required
                                                        checked={this.state.type_Of_Payment === "Debit Card"}
                                                        onChange={this.changePaymentType}
                                                    />
                                                    Debit Card
                                                </label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <br />
                                            <label>Card Number</label>
                                            <input style={rounded} placeholder="Card Number" name="card_No" className="form-control" minLength="16" maxLength="16" required
                                                value={this.state.card_No} onChange={this.changeCard_No} />
                                        </div>

                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <br />
                                                <label>Expiration Date</label>
                                                <input style={rounded} type="month" placeholder="Expiration Date" name="exp_Date" className="form-control" required
                                                    value={this.state.exp_Date} onChange={this.changeExp_Date} />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <br />
                                                <label>CVV/CVC</label>
                                                <input style={rounded} type="password" placeholder="" name="cvv" className="form-control" minLength="3" maxLength="3" required
                                                    value={this.state.cvv} onChange={this.changeCVV} />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <br />
                                            <label>Card Holder Name</label>
                                            <input style={rounded} placeholder="Card Holder Name" name="name_On_Card" className="form-control" required
                                                value={this.state.name_On_Card} onChange={this.changeName_On_Card} />
                                        </div>
                                        <br />
                                    </div>


                                    <h4 >Payment Amount: {this.state.total_Amount}</h4>


                                </div>
                                <div >
                                    <br></br>
                                    <button style={rounded} type="Submit" class="btn btn-outline-success " >&nbsp;&nbsp;&nbsp;Book&nbsp;&nbsp;&nbsp;</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <br></br>
            </div>
        )
    }
}
export default Passenger_Payment