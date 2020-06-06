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
    //console.log("If it is the last bookmark hide card")
    if (locations.length > 0) {
      let renderedLocations = locations.map((point) => {
        let coord = point.coordinates;
        let key = '';
        if(point.key === undefined){
          key = coord.toString().replace('.', '').replace('.', '').replace(',', ' ');
        } else {
          key = point.key;
        }

        return (
          <Marker key={key} position={coord} onCLick={() => this.handleClick(point)}></Marker>
        );
      });
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
