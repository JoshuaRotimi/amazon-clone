import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/Login";
import {auth} from "./firebase";
import {useStateValue} from "./StateProvider";
import Payment from "./components/Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

const promise = loadStripe('pk_test_51HQacHHw2ZkgvWLGvDab9RHKkcZ0ImGfoAJbSCfHXGNNd1DQS4bWk5lgDDNo2jNpmEfkszv3zaA7xZ5m3qwIeTLG006QpTzYSw');


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
                  <Route path='/' exact>
                      <Header/>
                      <Home/>
                  </Route>
                  <Route path='/checkout'>
                      <Header/>
                      <Checkout/>
                  </Route>
                  <Route path='/payment'>
                      <Header/>
                      <Elements stripe={promise}>
                          <Payment/>
                      </Elements>
                  </Route>
                  <Route path={'/login'}>
                      <h1>Log In Page</h1>
                      <Login/>
                  </Route>

              </Switch>

          </div>
      </Router>

  );
}

export default App;
