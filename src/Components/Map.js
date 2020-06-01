import React, { Component } from "react";
import firebase from 'firebase/app';
import 'firebase/database';
import "whatwg-fetch";

import { MakeCard } from "./Cards";
import { FormSection } from './Form';
import { MakeMap } from './MakeMap';

export class MapData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      showCard: false, 
      clickedLocationData: [],
      validAddress: null
    };
  }

  componentDidMount() {
    let locationRef = firebase.database().ref('locations');
    locationRef.on('value', (snapshot) => {
      let value = snapshot.val();
      let keys = Object.keys(value);
      let locations = keys.map((key) => {
        return {key: key, ...value[key] }
      });
      this.setState({locations: locations})
    });
    // let allData = [];

    // fetch("data/access_attr_with_labels.json")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     //console.log(firebase)
    //     data.features.forEach(function (point) {
    //       //console.log(firebase)
    //       console.log(point)
    //       let coordinates = [point.geometry.coordinates[1], point.geometry.coordinates[0]];
    //       let type = point.properties.label_type;
    //       let problem = type.replace(/([^A-Z])([A-Z])/g, "$1 $2").trim();
    //       let severity = point.properties.severity;
    //       if (severity === null) {
    //         severity = "not noted";
    //       }

    //       let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + coordinates.toString() + '&key=AIzaSyB4rr7XG9Pd1n0LYtuAUsEomezPNaubrDA';

    //       fetch(url) 
    //       .then( (response) => {
    //         return response.json();
    //       })
    //       .then( (data) => {
    //         let address = data.results[0].formatted_address;
    //         let coordString = coordinates.toString().replace(",", " ").replace(".", "").replace(".", "");

    //         firebase.database().ref('locations').child(coordString).set( {
    //           address: address,
    //           coordinates: coordinates,
    //           neighborhood: point.properties.neighborhood,
    //           problem: problem,
    //           severity: severity
    //         }).catch(error => console.log(error));
    //       })
          
    //     });
    //   });
  }

  componentWillUnmount() {
    let locationRef = firebase.database().ref('locations');
    locationRef.off()
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
            
            console.log('push')
            let coordString = coordinates.toString().replace(",", " ").replace(".", "").replace(".", "");

            firebase.database().ref('locations').child(coordString).set( {
              coordinates: coordinates,
              address: point.formatted_address,
              problem: problem
            } );
            
          });

          let newState = currentState.concat(newLocation);
          this.setState( {
            locations: newState,
            validAddress: true
          } );
          
        } else {
          this.setState( {validAddress: false} );
        }
      })

  };

  

  setCardState = (location) => {
    this.setState( {
      showCard: true,
      clickedLocationData: location
    } );
  }

  mapClick = () => {
    this.setState( {showCard: false, clickedLocationData: ''} );
  }

  makeCard = () => {
    if(this.state.showCard){
      return <MakeCard locationData={this.state.clickedLocationData} />
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
            <div className="flex-map map-background">
              <div className="flex-map-item" id="mapid">
                <MakeMap locations={this.state.locations} setCardState={this.setCardState} mapClick={this.mapClick}/>
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

