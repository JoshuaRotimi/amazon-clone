import React from "react";
import './CSS/Checkout.css';
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import {useStateValue} from "../StateProvider";

const Checkout = () => {
    const [{basket, user}] = useStateValue();

    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <img className='checkout__ad'
                     src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt=""
                />
                <div className='checkout__title'>
                    <h3>Hello, {user? user.email : 'Guest'}</h3>
                    <h2>Your Shopping Basket</h2>
                    {basket.length !== 0 ? basket.map((item => (
                        <CheckoutProduct
                            key={item.index}
                            id={item.id}
                            title={item.title}
                            rating={item.rating}
                            price={item.price}
                            image={item.image}
                        />
                    ))): <p>Your Shopping bag is empty. Start adding items!</p>}
                </div>
            </div>

            <div className='checkout_right'>
                <Subtotal/>
            </div>
        </div>
    )
};

export default Checkout