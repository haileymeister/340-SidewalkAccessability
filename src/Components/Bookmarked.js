import React, { Component } from "react";
import firebase from 'firebase/app';
import 'firebase/database';
import MakeMap from './MakeMap';
import { NavLink } from 'react-router-dom';

export default class Bookmarked extends Component {

  constructor(props){
    super(props)
    this.state = {
      locations: [],
    }
  }

  componentDidMount(){
    if (this.props.user) {
      let userKey = this.props.user.email.replace(/[^a-zA-Z0-9]/g, "");
      let bookmarkRef = firebase.database().ref('userBookmarks/' + userKey);
      //if there is bookmarked information then do this
      bookmarkRef.on('value', (snapshot) => {
        let value = snapshot.val();
        console.log(value)
        if (value !== null){
          let keys = Object.keys(value);
          let locations = keys.map((key) => {
            //console.log(key)
            return {key: key, ...value[key] }
          });
          this.setState({locations: locations})
        } else {
          this.setState( {locations: []} );
        }
      });
    }
  }

  componentWillUnmount() {
    if(this.props.user){
      let bookmarkRef = firebase.database().ref('userBookmarks/' + this.props.user.email.replace(/[^a-zA-Z0-9]/g, ""));
      bookmarkRef.off()
    }
  }

  render(){
    if(this.props.user){
      return <MakeMap locations={this.state.locations} setCardState={this.props.setCardState} hideCard={this.props.hideCard} handleBookmark={this.props.handleBookmark}/>;
    } else {
       return <p className="alert alert-warning"><NavLink to="/sign-in">Sign-in</NavLink> to see bookmarked data</p>
    } 

  }
}