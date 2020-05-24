import React, {Component} from 'react';
import {MakeCard} from './Cards';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import 'whatwg-fetch';


export class MapSection extends Component{

  constructor(props){
    super(props);

    this.state = {
      locations: []
    }

  }

  componentDidMount(){ 
    let allData = [];

    fetch('data/access_attr_with_labels.json')
      .then( (response) => {
        return response.json();
      })
      .then( (data) => {
        data.features.forEach(function(point){

          let type = point.properties.label_type;
          let problem = type.replace(/([^A-Z])([A-Z])/g, "$1 $2").trim();
          let severity = point.properties.severity;
          if (severity === null){
              severity = 'not noted';
          }

          let locationData = { 
            coordinates: [point.geometry.coordinates[1], point.geometry.coordinates[0]],
            neighborhood: point.properties.neighborhood,
            problem: problem,
            severity: severity,
            number: allData.length
          }
          allData.push(locationData);

        });
        this.setState({locations: allData});
      })
          
    }

  

  render(){
      //console.log(this.state)

    return(
      <section className="map-background">
        <div className="colored-header">
          <h2 className="container">View</h2>
        </div>
        <div className="container">
          <h3>Map</h3>
          <div className="flex-map map-background">
            <div className="flex-map-item" id="mapid">
              <MakeMap locations={this.state.locations}/>
            </div>
            <div className="flex-item">
              <div className="cards">
                <div className="card">
                  {/* <MakeCard /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
    )
  }
}

export class MakeMap extends Component {
  constructor(props){
    super(props);

    this.state = {
      lat: 47.662,
      lng: -122.313,
      zoom: 14,
    }
  }

  handleClick = () => {
    console.log('clicked')
    //return <MakeCard />
  }

  makeMarkers = (locations) => {
    // console.log('locations', locations)
     if(locations.length > 0){
      let renderedLocations = locations.map( (point) => {
      let coord = point.coordinates
      //console.log(coord)
          return(
          <Marker key={point.number} position={coord} onCLick={this.handleClick}>
              {/* <Popup>
                <span>Make cards pop up!</span>
              </Popup> */}
          </Marker>
          )
        });
      return renderedLocations;
    }
  }

  render(){

    return(
      <div className="flex-map-item" id="mapid">
        <Map 
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
        >
          {/* If I want to use mapbox tiles https://stackoverflow.com/questions/42765309/render-mapbox-vector-tiles-inside-react-leaflet */}
          <TileLayer
            url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {this.makeMarkers(this.props.locations)}
          <SubmittedMarker />
        </Map>
      </div>
    )
  }
}

export class SubmittedMarker extends Component {

  constructor(props){
    super(props)

    this.state = {
      address: this.props.address,
      coordinates: ''
    }
  }
  
  componentDidMount(){
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.props.address + '&key=AIzaSyB4rr7XG9Pd1n0LYtuAUsEomezPNaubrDA';

    fetch(url)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        if (data.status !== 'ZERO_RESULTS'){
          data.results.forEach(function(point){
            //console.log()
            let lat = point.geometry.location.lat;
            let lng = point.geometry.location.lng;
            let coordinates = [lat, lng]; 
            this.setState({
              coordinates: coordinates
            }) 
          });
        } 
      })

  }
  

  render(){
    
    return (
      <Marker key={this.state.address} position={this.state.coordinates}>
        <Popup>from form</Popup>
      </Marker>
    )

  }

}