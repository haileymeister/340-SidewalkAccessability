import React, { Component } from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';


import { NavBar } from './NavBar';
import { SignIn } from './SignIn';
import {HomePage} from './HomePage';
import {AboutPage} from './AboutPage';
import {Footer} from './Footer';


export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {user: undefined}
  }

  // Sign in code from Tim Carsons database lecture recall demo


  componentDidMount() {
    this.authUnSubFunction = firebase.auth().onAuthStateChanged( (firebaseUser) => {
      if(firebaseUser) {
        console.log('logged in')
        this.setState( {user: firebaseUser} );
      } else {
        console.log('logged out')
        this.setState( {user: null} );
      }
    });    
  }

  componentWillUnmount(){
    this.authUnSubFunction();
    //this.turnOffListenerFunction();
  }



  render(){
        
      return (
      <div>
        <NavBar />
        <Switch>
          <Route path='/home' component={ (routerProps) => (
          <HomePage {...routerProps} user={this.state.user} />
          )}/>
          <Route path='/sign-in' render={ (routerProps) => (
            <SignIn {...routerProps} user={this.state.user} uiConfig={this.uiConfig}/>
          )} />
          <Route path='/about' component={AboutPage} />
          <Redirect to='/home' />
        </Switch>
        
        <Footer />
      </div>
      
    );
    
    
  }
}

export default App;
