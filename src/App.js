import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/Login";
import {auth} from "./firebase";
import {useStateValue} from "./StateProvider";

function App() {
    const [{}, dispatch] = useStateValue();

    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            // console.log('The user is ', authUser.email);
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

    });

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
