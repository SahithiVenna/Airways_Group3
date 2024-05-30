import React, { useState, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react'
import 'animate.css'
import '../App.css'
import 'semantic-ui-css/semantic.min.css'
import FlightService from '../Service/FlightService';
import { MDBTable } from 'mdbreact';
import { BsFillTrashFill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BiCheckCircle } from 'react-icons/bi'
import {IoMdAddCircle} from 'react-icons/io'

const Passengers = (props) => {
  const [passengers, setPassengers] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [selectedAirlines, setSelectedAirlines] = useState([])
  const [mount, setMount] = useState(false)

  useEffect(()=>{

  },[mount]);

  useEffect(()=>{
    FlightService.getFlights().then((res => {
      const airlines = res.data.map((airline) => {
        return {
          key: airline.flight_No,
          text: airline.flight_Name,
          value: airline.flight_Name
        }
      })
      setAirlines(airlines)
  }));
  },[])

  useEffect(()=>{

    FlightService.getbookingDetailsByAirlines(selectedAirlines).then((res => {
      let temp = res.data.map((bookingdetails)=>{
        return {
          flight_Name : bookingdetails.flight_Name,
          source: bookingdetails.source,
          destination: bookingdetails.destination,
          passenger_Name : bookingdetails.name,
          travel_Date : bookingdetails.travel_Date,
          class : bookingdetails.class_Type
        }
      })
      setPassengers([...temp])
  }));
  },[selectedAirlines])

  const font = {
    fontFamily: "Cursive"
};

const rounded = {
  borderRadius: "20px",
  boxShadow: "1px 1px 10px 5px #778899",
  color: "white"
}

  return (
    <div class="bookingDetailsBgImg overflow">
      <p>hello Passengers</p>
      <Dropdown 
      placeholder='Skills' 
      fluid multiple selection options={airlines}
      onChange={(event,options)=>{
        setSelectedAirlines(options.value)
      }} 
      />
      <MDBTable scrollY maxHeight="260px">
                        <table className="table table-hover" >
                            <thead>
                                <tr>
                                    <th style={font}>Flight Name</th>
                                    <th style={font}>Passenger Name</th>
                                    <th style={font}>Source</th>
                                    <th style={font}>Destination</th>
                                    <th style={font}>Travel Date</th>
                                    <th style={font}>Class</th>
                                    <th style={font}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    passengers.map(
                                        flight =>
                                            <tr key={flight.flight_No}>
                                                <td style={font}>{flight.flight_Name}</td>
                                                <td style={font}>{flight.passenger_Name}</td>
                                                <td style={font}>{flight.source}</td>
                                                <td style={font}>{flight.destination}</td>
                                                <td style={font}>{flight.travel_Date}</td>
                                                <td style={font}>{flight.class}</td>
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
  )
}

export default Passengers
