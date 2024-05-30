import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BsPersonSquare, BsPeopleCircle  } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi"
import { RiLockPasswordFill } from "react-icons/ri"
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import FlightList from './FlightList'
import CreateFlight from './CreateFlight'
import ViewFlight from './ViewFlight'
import FlightBooking from './FlightBooking'
import FlightTicket from './FlightTicket'
import Passengers from './passengers'
import Login from './Login'
import Register from './Register'
import Logout from './Logout'
import 'animate.css'
import About from './about'
import Booking from './Booking'
import Passenger_Payment from './Passenger_Payment'
import CancelTicketComponent from "./CancelTicketComponent";
import '../App.css';
import Homepage from "./Homepage";
import UpdatePassword from "./UpdatePassword";
import UserProfileComponent from "./UserProfileComponent";
import UserService from '../Service/UserService'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
 
    this.state = {
      user: [],
      first_Name: ''
    }
  }

  NavBar() {
    if (sessionStorage.getItem('Id') !== null && sessionStorage.getItem('UserType') === 'user') {
      return <Nav className="mr-auto">
        <Nav.Link href="/book">Book Ticket</Nav.Link>
        <Nav.Link href="/cancelTicket">Cancel Ticket</Nav.Link>
        <Nav.Link href="/bookings">Bookings</Nav.Link>
      </Nav>
    }
    else if (sessionStorage.getItem('Id') !== null && sessionStorage.getItem('UserType') === 'admin') {
      return <Nav className="mr-auto">

        <Nav.Link href="/flights">Admin Dashboard</Nav.Link>
        <Nav.Link href="/passengers">Passengers</Nav.Link>
      </Nav>;
    }
    else {
      return null;
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem('Id') === null) {
      return this.NavBar
    }
    else {
      UserService.userProfile(sessionStorage.getItem('Id')).then(res => {
        this.setState({ user: res.data });
        this.setState({ first_Name: this.state.user[0].first_Name });
      })
    }
  }

  validateLogin() {
    if (sessionStorage.getItem('Id') === null)
      return <Nav.Link href="/Login">Login</Nav.Link>
    else
      return <Nav className="ml-auto">
        <NavDropdown className="active" title="" id="basic-nav-dropdown">
          <NavDropdown.Item >Hi {this.state.first_Name}</NavDropdown.Item>
          <div class="dropdown-divider"></div>
          <NavDropdown.Item href="/userProfile"><BsPersonSquare />&nbsp;View Profile</NavDropdown.Item>
          <NavDropdown.Item href="/change-password"><RiLockPasswordFill />&nbsp;Change Password</NavDropdown.Item>
          <NavDropdown.Item href="/Logout"><BiLogOutCircle />&nbsp;Logout</NavDropdown.Item>
        </NavDropdown>
        {/* <BsPeopleCircle style={{ color: "white", fontSize: "30px" }} /> */}
      </Nav>
  }

  render() {
    const style1 = {
      boxShadow: "1px 1px 5px 2px #4d4d4d"
    };

    return (<div class="overflow">

      <div class="container row">
        <Navbar className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" style={style1} expand="lg">
          <Navbar.Brand href="/">&nbsp;Welcome to Secure Airways</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="col-md-10">
              {this.NavBar()}
            </div>
            <div className="col-md-2">
              <Nav className="">
                {this.validateLogin()}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <br></br>
      </div>
      <Router >
        <div className="App">
          <Switch>
            <Route path="/" exact component={Homepage}></Route>
            <Route path="/homepage" exact component={Homepage}></Route>
            <Route path="/Login" exact component={Login}></Route>
            <Route path="/Register" exact component={Register}></Route>
            <Route path="/change-password" exact component={UpdatePassword}></Route>
            <Route path="/userProfile" exact component={UserProfileComponent}></Route>
            <Route path="/Logout" exact component={Logout}></Route>
            <Route path="/About" exact component={About}></Route>
            <Route path="/book" exact component={Booking}></Route>
            <Route path="/user-info" exact component={Passenger_Payment}></Route>
            <Route path="/cancelTicket" exact component={CancelTicketComponent}></Route>
            <Route path="/bookings" exact component={FlightBooking}></Route>
            <Route path="/flights" exact component={FlightList}></Route>
            <Route path="/passengers" exact component={Passengers}></Route>
            <Route path="/add-flight/:flight_No" exact component={CreateFlight}></Route>
            <Route path="/view-flight/:flight_No" exact component={ViewFlight}></Route>
            <Route path="/view-ticket/:booking_Id" exact component={FlightTicket}></Route>
          </Switch>
          <ToastContainer />
        </div>
      </Router>
    </div>
    );

  }

}

export default NavBar