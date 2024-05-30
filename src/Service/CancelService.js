import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

const Ticket_API_BASE_URL = "http://localhost:8090/ARS";

class CancelService {

    getBookingId(id) {
        return axios.get(Ticket_API_BASE_URL + "/DisplayBookingId/" + id);
    }

    CancelTicket(booking_Id) {
        return axios.delete(Ticket_API_BASE_URL + "/CancelTicket/" + booking_Id);
    }

}
export default new CancelService();