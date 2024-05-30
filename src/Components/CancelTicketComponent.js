import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CancelService from '../Service/CancelService'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';   //npm install react-confirm-alert --save
import 'animate.css'
import { BiCheckCircle } from 'react-icons/bi'
import { RiErrorWarningLine } from 'react-icons/ri'


class CancelTicketComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      booking_details: [],
      booking_Id: "i"
    }

    this.changeBooking_IdHandler = this.changeBooking_IdHandler.bind(this);
    this.cancel = this.cancel.bind(this);

  }

  componentDidMount() {
    CancelService.getBookingId(sessionStorage.getItem('Id')).then((response) => { this.setState({ booking_details: response.data }) });
  }
  changeBooking_IdHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });

  }
  cancel = () => {
    if (this.state.booking_Id !== "i") {
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => CancelService.CancelTicket(this.state.booking_Id).then(res => {
              toast.success(<div>&nbsp;<BiCheckCircle />&nbsp;{res.data}</div>, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: false,
              });

              setTimeout(function () {
                window.location.replace('/bookings');
              }, 3000);
            })
          },
          {
            label: 'No',
            onClick: () => this.props.history.push('/cancelTicket')
          }
        ]
      });
    }
    else {
      toast.warn(<div>&nbsp;<RiErrorWarningLine />&nbsp;{"Please select your Booking Id"}</div>, {
        position: "top-center",
        hideProgressBar: false,
        pauseOnHover: false
      });
    }
  };
  render() {

    const rounded = {
      borderRadius: "20px",
      boxShadow: "1px 1px 10px 5px #778899"
    }
    const style1 = {
      backgroundColor: "rgba(230, 230, 230, 0.6000)",

    };

    return (
      <div class="cancelticketBgImg overflow">
        <div >
          <div className="container">

            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3 animate__animated animate__fadeInDown blurDiv-roundCorners" style={style1}>
                <br></br><br></br><br></br><br></br>
                <h3 align="center" class="serif">Cancel Ticket</h3>
                <div className="card-body">
                  <br></br>
                  <div className="select-container">
                    <select className="form-select" value={this.state.booking_Id} name="booking_Id" onChange={this.changeBooking_IdHandler}>
                      <option selected>Choose Your Booking to cancel </option>
                      {
                        this.state.booking_details.map(option1 => (
                          <option key={option1.booking_Id} value={option1.booking_Id}>{option1.booking_Id}</option>
                        ))
                      }
                    </select>
                    <br></br>
                    <div align="center">
                      <button type="button" style={rounded} class="btn btn-outline-danger" onClick={this.cancel}>Cancel Ticket</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default CancelTicketComponent