import React from "react";
import './CSS/Home.css';
import Product from "./Product";

const Home = () => {
    return (
        <div className='home'>
            <div className='home__container'>
                <img
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    alt="" className='home__image'/>
            </div>
            <div className='home__row'>
                <Product
                    id={'439203729'}
                    title={'The Lean Startup'}
                    price={19.99}
                    rating={5}
                    image={"https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"}
                />
                <Product
                    id={'439203730'}
                    title={'Samsung Curved LED Gaming Monitor'}
                    price={239.0}
                    rating={5}
                    image={"https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"}
                />
            </div>
            <div className='home__row'>
                <Product
                    id={'439203730'}
                    title={'Samsung Curved LED Gaming Monitor'}
                    price={479.0}
                    rating={2}
                    image={"https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"}
                />
                <Product
                    id={'439203730'}
                    title={'Samsung Curved LED Gaming Monitor'}
                    price={39.0}
                    rating={1}
                    image={"https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"}
                />
                <Product
                    id={'439203730'}
                    title={'Samsung Curved LED Gaming Monitor'}
                    price={90.0}
                    rating={3}
                    image={"https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"}
                />


            </div>
            <div className='home__row'>
                <Product
                    id={'439203730'}
                    title={'Samsung Curved LED Gaming Monitor'}
                    price={2309.0}
                    rating={3}
                    image={"https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"}
                />
            </div>

        </div>
    )
};

export default Home;