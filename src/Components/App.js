import React, { Component } from "react";
import {Route} from 'react-router-dom';
// import firebase from 'firebase/app';

import { NavBar } from "./NavBar";
import {HomePage} from './HomePage';
import {AboutPage} from './AboutPage';
import {Footer} from './Footer';


export class App extends Component {

  render(){
    return (
      <div>
        <NavBar />
        <Route exact path='/' component={HomePage}/>
        <Route path='/about' component={AboutPage} />
        <Footer />
      </div>
      
    );
  }
}

export default App;
