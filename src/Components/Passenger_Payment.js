import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import 'animate.css';
import FlightService from '../Service/FlightService';
import { BiCheckCircle } from 'react-icons/bi';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51P6a3w07b4pLNc6mR07eBua2uFTTGduFoBFqSAAA7PgckcSmKh4Rty2ro0dQZAwbjGSatyD4dXK2fteem28xO0pj00DcWoRZiY');

const Passenger_Payment = (props) => {
    const [state, setState] = useState({
        flight_No: props.location.state.flight_No,
        total_Amount: props.location.state.cost,
        class_Type: props.location.state.class_Type,
        name: '',
        gender: '',
        dob: '',
        passport_No: '',
        type_Of_Payment: '',
        card_No: '',
        exp_Date: '',
        cvv: '',
        name_On_Card: ''
    });

    const stripe = useStripe();
    const elements = useElements();

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const submitData = async (event) => {
        event.preventDefault();

        let userData = {
            flight_No: state.flight_No,
            name: state.name,
            gender: state.gender,
            dob: state.dob,
            passport_No: state.passport_No,
            type_Of_Payment: state.type_Of_Payment,
            card_No: state.card_No,
            name_On_Card: state.name_On_Card,
            class_Type: state.class_Type,
            total_Amount: state.total_Amount,
            id: sessionStorage.getItem('Id')
        };

        FlightService.booking(userData).then(res => {
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

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                name: state.name_On_Card,
                // Add other billing details as needed
            },
        });

        if (error) {
            console.error(error);
        } else {
            console.log('PaymentMethod created successfully:', paymentMethod);
        }
    };

    const rounded = {
        borderRadius: "20px",
        boxShadow: "1px 1px 10px 5px #778899"
    };

    const style1 = {
        backgroundColor: "rgba(230, 230, 230, 0.6000)"
    };

    const product = {
        price: state.total_Amount,
        name: state.name_On_Card,
        description: state.flight_No,
        image: ''
    };

    let userData = {
        flight_No: state.flight_No,
        name: state.name,
        gender: state.gender,
        dob: state.dob,
        passport_No: state.passport_No,
        type_Of_Payment: state.type_Of_Payment,
        card_No: state.card_No,
        name_On_Card: state.name_On_Card,
        class_Type: state.class_Type,
        total_Amount: state.total_Amount,
        id: sessionStorage.getItem('Id')
    };

    return (
        <div className="paymentBgImg overflow">
            <div className="container">
                <CheckoutForm product={product} userData={userData} />
            </div>
            <br />
        </div>
    );
};

export default Passenger_Payment;