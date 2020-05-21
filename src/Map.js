import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'



// function addToMap(address, problem){
//     let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyB4rr7XG9Pd1n0LYtuAUsEomezPNaubrDA';
//     fetch(url)
//         .then(function(response){
//             return response.json();
//         })
//         .then(function(data){
//             let failed = document.querySelector('p#failed');
//             let success = document.querySelector('p#success');
//             if (data.status == 'ZERO_RESULTS'){
//                 failed.classList.remove('d-none');
//                 success.classList.add('d-none');
//             } else {
//                 success.classList.remove('d-none');
//                 failed.classList.add('d-none');
//                 data.results.forEach(function(point){
//                     let lat = point.geometry.location.lat;
//                     let lng = point.geometry.location.lng;
//                     let coordinates = [lat, lng];
//                     let addressStr = 'Address: ' + point.formatted_address;
//                     let problemStr = 'Sidewalk Problem: ' + problem;
//                     let content = [addressStr, problemStr];
                    
//                     L.marker(coordinates).addTo(map).on('click', function(){
//                         createCard(content);
//                     });
                    
//                 });
//             }
//         })
//         .catch(function(error){
//             console.log(error);
//         });
// }

export default class MapData extends Component {
  constructor(props){
    super(props);
    
    // Might not need to be state!!!
    this.state = {
      lat: 47.662,
      lng: -122.313,
      zoom: 14,
    }
  }

  makePoints = () => {
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
      <div>
        <Map 
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
        >
          <TileLayer 
            attribution= 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            maxZoom= {18}
            id= 'mapbox/streets-v11'
            tileSize= {512}
            zoomOffset= {-1}
            accessToken= 'pk.eyJ1IjoiaGFpbGV5bWVpc3RlciIsImEiOiJjazlyeHR1dHcwemZkM3RxeDZoNWlxcWs4In0.-eRubmoU8XEoaX2_ZjZQfQ'
          />
          {makePoints}
        </Map>
      </div>
    )
  }
}