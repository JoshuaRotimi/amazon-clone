import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/Login";
import {auth} from "./firebase";
import {useStateValue} from "./StateProvider";
import Payment from "./components/Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from "./components/Orders";

const promise = loadStripe('pk_test_51HQacHHw2ZkgvWLGvDab9RHKkcZ0ImGfoAJbSCfHXGNNd1DQS4bWk5lgDDNo2jNpmEfkszv3zaA7xZ5m3qwIeTLG006QpTzYSw');


//URL -  https://clone-6e7c0.web.app


function App() {
    const [{state}, dispatch] = useStateValue();

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            // console.log('The user is ', authUser?.email);
            if (authUser) {
                dispatch({
                    type: 'SET_USER',
                    user: authUser
                })
            } else {
                dispatch({
                    type: 'SET_USER',
                    user: null
                })
            }
        })

    },[dispatch]);

  return (
      <Router>
          <div className="app">
              <Switch>

                  <Route path='/checkout'>
                      <Header/>
                      <Checkout/>
                      <Footer/>
                  </Route>
                  <Route path='/orders'>
                      <Header/>
                      <Orders/>
                      <Footer/>
                  </Route>
                  <Route path='/payment'>
                      <Header/>
                      <Elements stripe={promise}>
                          <Payment/>
                      </Elements>
                      <Footer/>
                  </Route>
                  <Route path={'/login'}>
                      <Login/>
                  </Route>
                  <Route path='/'>
                      <Header/>
                      <Home/>
                      <Footer/>
                  </Route>

              </Switch>

          </div>
      </Router>

  );
}

export default App;
