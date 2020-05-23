import React, {Component} from 'react';
import {MakeMap} from './MakeMap';
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
            //console.log(problem)
            let severity = point.properties.severity;
            if (severity === null){
                severity = 'not noted';
            }

            let locationData = { 
              coordinates: '[' + point.geometry.coordinates[1] + ', ' + point.geometry.coordinates[0] + ']',
              neighborhood: point.properties.neighborhood,
              problem: problem,
              severity: severity,
              number: allData.length
            }
            allData.push(locationData);
            //console.log(allData)

          });
          //console.log(allData)
          this.setState({locations: allData});
          //console.log('state', this.state);
        })
          
    }
  

  render(){
      console.log(this.state)

    return(
      <div>
        <div className="container">
          <h3>Map</h3>
          <div className="flex-map map-background">
            <MakeMap locations={this.state.locations}/>
            <div className="flex-item">
              <div className="cards">
                <div id="cardID">
                  {/* Card added when marker clicked */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
  