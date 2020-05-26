import React, { Component } from "react";
import { MakeCard } from "./Cards";
import {FormSection} from './Form';
import {MakeMap} from './MakeMap';

import "whatwg-fetch";

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
    let allData = [];

    fetch("data/access_attr_with_labels.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.features.forEach(function (point) {
          let type = point.properties.label_type;
          let problem = type.replace(/([^A-Z])([A-Z])/g, "$1 $2").trim();
          let severity = point.properties.severity;
          if (severity === null) {
            severity = "not noted";
          }

          let locationData = {
            number: allData.length,
            coordinates: [point.geometry.coordinates[1], point.geometry.coordinates[0]],
            neighborhood: point.properties.neighborhood,
            problem: problem,
            severity: severity
          };
          allData.push(locationData);
        });
        this.setState( {locations: allData} );
      });
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

