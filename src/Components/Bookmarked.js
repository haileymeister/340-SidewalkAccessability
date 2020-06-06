import React, { Component } from "react";
import firebase from 'firebase/app';
import 'firebase/database';
import MakeMap from './MakeMap';
import { NavLink } from 'react-router-dom';

export default class Bookmarked extends Component {

  constructor(props){
    super(props)
    this.state = {
      bookmarkedLocations: [],
      bookmarkRef: null,
    }
  }

  componentDidMount(){
    if (this.props.user) {
      let userKey = this.props.user.email.replace(/[^a-zA-Z0-9]/g, "");
      let bookmarkRef = firebase.database().ref('userBookmarks/' + userKey);
      this.setState( {bookmarkRef: bookmarkRef} ); 

      //if there is bookmarked information then do this
      bookmarkRef.on('value', (snapshot) => {
        let value = snapshot.val();
        if (value !== null){
          let keys = Object.keys(value);
          let bookmarkedLocations = keys.map((key) => {
            return {key: key, ...value[key] }
          });
          this.setState({bookmarkedLocations: bookmarkedLocations})
        } else {
          this.setState( {bookmarkedLocations: []} );
        }
      });
    }
    //console.log('bookmarkref', this.state.bookmarkRef)
  }

  componentWillUnmount() {
    if(this.props.user){
      this.state.bookmarkRef.off()
    }
  }

  render(){
    if(this.props.user){
      return <MakeMap locations={this.state.bookmarkedLocations} setCardState={this.props.setCardState} hideCard={this.props.hideCard} />;
    } else {
       return <p className="alert alert-warning"><NavLink to="/sign-in">Sign-in</NavLink> to see bookmarked data</p>
    } 

  }
}