import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import {MakeCard} from './Cards';


export class MakeMap extends Component {
  constructor(props){
    super(props);

    // Might not need to be state!!!
    this.state = {
      lat: 47.662,
      lng: -122.313,
      zoom: 14,
    }
  }

  handleClick = () => {
    return <MakeCard />
  }

  makeMarkers = (locations) => {
    // console.log('locations', locations)
     if(locations.length > 0){
      let renderedLocations = locations.map( (point) => {
      let coord = point.coordinates
      //console.log(coord)
          return(
          <Marker key={point.number} position={coord} onCLick={this.handleClick}>
              <Popup>
                <span>Make cards pop up!</span>
              </Popup>
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
        if (data.status != 'ZERO_RESULTS'){
          data.results.forEach(function(point){
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
