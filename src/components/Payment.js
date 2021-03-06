import React, {useEffect, useState} from "react";
import './CSS/Payment.css'
import {useStateValue} from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import {Link} from 'react-router-dom';
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import {getBasketTotal} from "../context/reducer";
import {useHistory} from 'react-router-dom';
import axios from '../axios';
import {db} from "../firebase";

const Payment = () => {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
           const response = await axios ({
               method: 'post',
               url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
           setClientSecret(response.data.clientSecret)
        };
        getClientSecret();
    }, [basket]);

    console.log('The secret is', clientSecret);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('You need to be signed in first!')
        }
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            //paymentIntent = payment confirmation

            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id).set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            });

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET',

            });

            history.replace('/orders')
        })

    };
    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : '');

    };


    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>Checkout (<Link to={'/checkout'}>{basket.length} items</Link>)</h1>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>Hello, {user? user.email: 'Guest'}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            rating={item.rating}
                            image={item.image}
                            price={item.price}
                        />)}
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit} action="">
                            <CardElement onChange={handleChange} />
                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (

                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>

                    </div>

                </div>

            </div>

        </div>
    )
};

export default Payment;