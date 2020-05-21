import React, {Component} from 'react';
import Fetch from 'whatwg-fetch';

export class Map extends Component{

  constructor(props){
    super(props);

    this.state = {
      locations: []
    }
  }

  getState = () => {
    fetch('data/access_attr_with_labels.json')
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        let allData = [];
        data.features.forEach(function(point){

          let type = point.properties.label_type;
          let problem = type.replace(/([A-Z])/g, ' $1').trim();
          let severity = point.properties.severity;
          if (severity === null){
              severity = 'not noted';
          }

          let locationData = { 
            coordinates: point.geometry.coordinates,
            neighborhood: point.properties.neighborhood,
            problem: problem,
            severity: severity,
            number: allData.length
          }
          allData.push(locationData);
        });
        this.setstate({locations: allData});
        console.log(allData);
      });
  }

  render(){
    return(
      <div>
        <div className="container">
            <h3>Map</h3>
            <div className="flex-map map-background">
                <div className="flex-map-item" id="mapid">
                    {/* Map goes here! */}
                    <Map locations={this.state.locations}/>
                </div>
                <div className="flex-item">
                    <div className="cards">
                        <div id="cardID">
                            {/* Card added when label clicked */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
  