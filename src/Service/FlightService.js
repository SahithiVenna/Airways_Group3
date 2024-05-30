import axios from 'axios'

const FLIGHT_API_BASE_URL = "http://localhost:8090/ARS";

class FlightService {

    getFlights() {
        return axios.get(FLIGHT_API_BASE_URL + "/flights")
    }

    createFlight(flight) {
        var URL = "http://localhost:8090/ARS/addFlight";
        console.log("Flight data: " + flight);
        return axios.post(URL, flight);
    }

    DisplayFlightByFLightNo(flight_No) {
        var URL = "http://localhost:8090/ARS/getFlightByNumber/" + flight_No;
        return axios.get(URL);
    }

    updateFlight(flight_No, flight) {
        var URL = FLIGHT_API_BASE_URL + "/updateFlightDetails/" + flight_No;
        return axios.put(URL, flight);
    }

    deleteFlight(flight_No) {
        var URL = FLIGHT_API_BASE_URL + "/cancelFlight/" + flight_No;
        return axios.delete(URL);
    }

    getBookings(id) {
        var URL = FLIGHT_API_BASE_URL + "/DisplayBookingDetailsById/" + id;
        return axios.get(URL);
    }

    DisplayTicketDetailsByBookingId(booking_Id) {
        var URL = "http://localhost:8090/ARS/DisplayTicketDetails/" + booking_Id;
        return axios.get(URL);
    }

    businessClass(source, destination, travel_Date) {
        var URL = FLIGHT_API_BASE_URL + "/businessClass?source=" + source + "&destination=" + destination +
            "&travel_Date=" + travel_Date;
        return axios.get(URL);
    }

    economyClass(source, destination, travel_Date) {
        var URL = FLIGHT_API_BASE_URL + "/economyClass?source=" + source + "&destination=" + destination +
            "&travel_Date=" + travel_Date;
        return axios.get(URL);
    }

    booking(userData) {
        var URL = FLIGHT_API_BASE_URL + "/booking";
        console.log("Booking Data: " + userData);
        return axios.post(URL, userData);
    }

    getbookingDetailsByAirlines(airlines) {
        const str = {"flights":airlines};
        const URL = FLIGHT_API_BASE_URL + "/GetBookingDetailsByAirlines";
        return axios.post(URL, str);
    }

    login(user) {
        var URL = FLIGHT_API_BASE_URL + "/login";

        return axios.post(URL, user);
    }

    register(user) {
        var URL = FLIGHT_API_BASE_URL + "/register";
        return axios.post(URL, user);
    }

    updatePassword(user) {
        var URL = FLIGHT_API_BASE_URL + "/updatepassword";
        return axios.put(URL, user);
    }

    getCities() {
        return axios.get('http://localhost:8090/ARS/cities')
    }

    destination() {
        return axios.get('http://localhost:8090/ARS/destination')
    }

}



export default new FlightService()