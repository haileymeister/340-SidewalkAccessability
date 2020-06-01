import React, {Component} from 'react';
import { Map, TileLayer, Marker } from "react-leaflet";


export class MakeMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 47.662,
      lng: -122.313,
      zoom: 14,
    };
  }

  handleClick = (location) => {
    this.props.setCardState(location);
  };

  handleMapClick = () => {
    this.props.mapClick();
  }

  makeMarkers = (locations) => {
    //console.log("Make marker")
    if (locations.length > 0) {
      let renderedLocations = locations.map((point) => {
        let coord = point.coordinates;
        return (
          <Marker key={point.key} position={coord} onCLick={() => this.handleClick(point)}></Marker>
        );
      });
      return renderedLocations;
    } 
  };

  render() {
    return (
      <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} onCLick={this.handleMapClick}>
        {/* If I want to use mapbox tiles https://stackoverflow.com/questions/42765309/render-mapbox-vector-tiles-inside-react-leaflet */}
        <TileLayer
          url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.makeMarkers(this.props.locations)}
      </Map>
    );
  }
}
