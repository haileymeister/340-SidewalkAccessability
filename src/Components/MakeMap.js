import React, {Component} from 'react';
import { Map, TileLayer, Marker } from "react-leaflet";


export default class MakeMap extends Component {
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

  handleHideCard = () => {
    this.props.hideCard();
  }

  makeMarkers = (locations) => {
    //If it is the last bookmark bail
    console.log('locations', locations)
    if (locations.length > 0) {
      console.log(locations.length)
      let renderedLocations = locations.map((point) => {
        let coord = point.coordinates;
        return (
          <Marker key={point.key} position={coord} onCLick={() => this.handleClick(point)}></Marker>
        );
      });
      console.log(renderedLocations)
      return renderedLocations;
    }
  };

  render() {
    return (
      <Map center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} onCLick={this.handleHideCard}>
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
