import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'


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

  makeMarkers = (locations) => {
    // console.log('locations', locations)
    if(locations.length > 0){
      console.log('if entered')
      console.log(locations)
      locations.map( (point) => {
        return(
          <Marker key={point.number} position={point}>
            <Popup>
              <span>It worked!</span>
            </Popup>
          </Marker>
        )
      });
    } else {
      return;
    }
  }

  render(){

    return(
      <div className="flex-map-item" id="mapid">
        <Map 
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
        >
          <TileLayer
            url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {this.makeMarkers(this.props.locations)}
        </Map>
      </div>
    )
  }
}