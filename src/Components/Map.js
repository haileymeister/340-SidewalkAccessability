import React, { Component } from "react";
import {Route, Switch} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/database';
import "whatwg-fetch";

import MakeCard from "./Cards";
import FormSection from './Form';
import MakeMap from './MakeMap';
import Bookmarked from './Bookmarked';
import MapNav from './MapNav';

export default class MapData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      showCard: false, 
      clickedLocationData: [],
      validAddress: null,
      newLocation: null,
    };
  }

  locationRef = firebase.database().ref('locations');

  componentDidMount() {
    this.locationRef.on('value', (snapshot) => {
      let value = snapshot.val();
      let keys = Object.keys(value);
      let locations = keys.map((key) => {
        return {key: key, ...value[key] }
      });
      this.setState({locations: locations})
    });
  }

  componentWillUnmount() {
    this.locationRef.off()
  }

  getNewLocation = (address, problem) => {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB4rr7XG9Pd1n0LYtuAUsEomezPNaubrDA';

    let currentState = this.state.locations;

    fetch(url)
      .then( (response) => {
        return response.json();
      })
      .then( (data) => {
        if (data.status !== 'ZERO_RESULTS'){
          let newLocation = {};
          data.results.forEach( (point) => {
            let lat = point.geometry.location.lat;
            let lng = point.geometry.location.lng;
            let coordinates = [lat, lng];

            newLocation = {
                number: this.state.locations.length + 1,
                coordinates: coordinates,
                address: point.formatted_address,
                problem: problem,
              }
            
            let coordString = coordinates.toString().replace(",", " ").replace('.', "").replace('.', "");

            firebase.database().ref('locations').child(coordString).update( {
              coordinates: coordinates,
              address: point.formatted_address,
              problem: problem,
              bookmarked: false,
            } );
            
          });

          let newState = currentState.concat(newLocation);
          this.setState( {
            locations: newState,
            validAddress: true,
            newLocation: newLocation,
          } );
          
        } else {
          this.setState( {validAddress: false} );
        }
      })
      .catch( (error) => {
        console.log(error);
      });
  };

  setCardState = (location) => {
    this.setState( {
      showCard: true,
      clickedLocationData: location
    } );
  }

  hideCard = () => {
    this.setState( {showCard: false, clickedLocationData: ''} );
  }

  makeCard = (clickedLocation) => {
    //gets its information from the clicked location state

    if(this.state.showCard){
      return <MakeCard locationData={clickedLocation} handleBookmark={() => {this.handleBookmark(clickedLocation)}} user={this.props.user}/>
    }
  }

  handleBookmark = (locationData) => {
    // Get updated information
    this.locationRef.on('value', (snapshot) => {
      let value = snapshot.val();
      let keys = Object.keys(value);
      let locations = keys.map((key) => {
        return {key: key, ...value[key] }
      });
      this.setState({locations: locations})
    });

    let userKey = this.props.user.email.replace(/[^a-zA-Z0-9]/g, "");
    let userRef = firebase.database().ref('userBookmarks').child(userKey);
    let key = '';

    //If its a new point then use this
    if (locationData.key === undefined){
      key = locationData.coordinates.toString().replace(",", " ").replace(".", "").replace(".", "");
    } else {
      key = locationData.key;
    }

    if (!locationData.bookmarked){
      locationData.bookmarked = true;
      this.setState( {clickedLocationData: locationData} )
      userRef.child(key).update(locationData);      
    } else {
      locationData.bookmarked = false;
      this.setState( {clickedLocationData: locationData} )
      userRef.child(key).remove();

      // Hide the card if unbookmarked in bookmarked section
      if(window.location.href.includes('/bookmarked')){
        this.hideCard();
      }
    }  
  }

  render() {
    return (
      <section>
        <div className="map-background">
          <div className="colored-header">
            <h2 className="container">View</h2>
          </div>
          <div className="container">
            <h3>Map</h3>
            <MapNav hideCard={this.hideCard}/>
            
            <div className="flex-map map-background">
              <div className="flex-map-item" id="mapid">
                <Switch>
                  <Route exact path='/home' render={ (renderProps) => 
                  (<MakeMap {...renderProps} 
                    locations={this.state.locations} 
                    setCardState={this.setCardState} 
                    hideCard={this.hideCard}
                    center={this.state.newLocation}/>)}
                  />
                  <Route path='/home/bookmarked' render={ (renderProps) => 
                  (<Bookmarked {...renderProps} 
                    user={this.props.user} 
                    setCardState={this.setCardState} 
                    hideCard={this.hideCard}/>)}
                  />
                </Switch>
              </div>
              <div className="flex-item">
                <div className="cards">
                  {this.makeCard(this.state.clickedLocationData)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <h2>Record Sidewalk Information</h2>
          <FormSection addMarker={this.getNewLocation} validAddress={this.state.validAddress}/>
        </div>
      </section>
    );
  }
}