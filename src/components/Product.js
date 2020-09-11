import React from "react";
import './CSS/Product.css';
import {useStateValue} from "../StateProvider";

const Product = ({id, title, price, rating, image}) => {
    const [state, dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title,
                image,
                price,
                rating
            }
        });

    };
  return (
      <div className='product'>
          <div className='product__info'>
              <p>{title}</p>
              <p className='product__price'>
                  <small>$</small>
                  <strong>{price}</strong>
              </p>
              <div className='product__rating'>
                  {Array(rating).fill().map((_, i) => <span role='img' aria-label='star'>🌟</span> )}

              </div>
          </div>
          <img src={image} alt=""/>
          <button onClick={addToBasket}>Add to Basket</button>


      </div>
  )
};

export default Product;
