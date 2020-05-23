import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


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

  makeMarkers = () => {
    this.props.locations.map( (location) => {
      let point = location.coordinates;
      return (
        <Marker position={point} key={location.number}>
          <Popup>
            <span>Neighborhood: {location.neighborhood}</span>
          </Popup>
        </Marker>
      )
    })
  }

  render(){
    return(
      <div className="flex-map-item" id="mapid">
        <Map 
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
        >
          <TileLayer
            url='https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFpbGV5bWVpc3RlciIsImEiOiJjazlyeHR1dHcwemZkM3RxeDZoNWlxcWs4In0.-eRubmoU8XEoaX2_ZjZQfQ'
            attribution= 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          {this.makeMarkers()}
        </Map>
      </div>
    )
  }
}