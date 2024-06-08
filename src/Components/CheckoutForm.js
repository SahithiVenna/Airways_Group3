import React, { useState, useRef, useEffect } from 'react';
import FlightService from '../Service/FlightService';
import { BiCheckCircle } from 'react-icons/bi';
import { toast } from 'react-toastify';

function CheckoutForm({ product , userData }) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);  // State to track if PayPal SDK is loaded
  const paypalRef = useRef();

  useEffect(() => {
    // Function to load PayPal script dynamically
    const addPayPalScript = () => {
      if (window.paypal) {
        setLoaded(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=Aflwv-hItxpTeBkpsSQW08TYOdHlgKF7QshoqGeGkHVbcYXE7bdgmemrYjpq6tkJA79GJi6tcC-J5grY'; // Replace YOUR_CLIENT_ID with your actual PayPal client ID
      script.onload = () => {
        setLoaded(true);
      };
      document.body.appendChild(script);
    };

    addPayPalScript();
  }, []);

  useEffect(() => {
    if (loaded) {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                description: product.description,
                amount: {
                  currency_code: 'USD',
                  value: product.price,
                },
              }],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            setPaidFor(true);
          },
          onError: err => {
            setError(err);
            console.error(err);
          },
        })
        .render(paypalRef.current);

    }
  }, [loaded, product.description, product.price]);

  if (paidFor) {
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
    return (
      <div>
         <h1>Congrats, you just bought {product.name}!</h1>
        <img src={product.imageUrl} alt={product.description} />
      </div>
    );
  }

  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <h1>
        {product.description} for ${product.price}
      </h1>
    </div>
  );
}
export default CheckoutForm;
