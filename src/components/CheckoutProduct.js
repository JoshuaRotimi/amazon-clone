import React from "react";
import './CSS/CheckoutProduct.css';
import {useStateValue} from "../StateProvider";

const CheckoutProduct = ({id, image, title, price, rating, hidebutton}) => {
    const [state , dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        })
    };
    return (
        <div className='checkoutProduct'>
            <img src={image} className='checkoutProduct__image' alt=''/>
            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className='checkoutProduct__price'>
                    <strong>${price}</strong>
                </p>
                <div className='checkoutProduct__rating'>
                    {Array(rating).fill().map((_, i) => <span role='img' aria-label='star'>🌟</span> )}
                </div>
                {!hidebutton && (
                    <button onClick={removeFromBasket}>Remove from Basket</button>
                )}
            </div>
        </div>
    )
};

export default CheckoutProduct;