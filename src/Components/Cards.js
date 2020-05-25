import React, { Component } from 'react'

export class MakeCard extends Component {

  makeParagraphs = (contentArr) => {
      let cards = contentArr.map( (string) => {
        return (<p key={string}>{string}</p>);
      });
      return cards;
    }

  render(){

    //console.log('makecard', this.props.locationData);

    let contentToRender = [];
    if (this.props.locationData.hasOwnProperty('address')) {
      let addressStr = "Address: " + this.props.locationData.address;
      let problemStr = "Sidewalk Problem: " + this.props.locationData.problem;
      contentToRender.push(addressStr, problemStr);
    } else {
      let neighborhoodStr = "Neighborhood: " + this.props.locationData.neighborhood;
      let problemStr = "Sidewalk Problem: " + this.props.locationData.problem;
      let severityStr = "Severity: " + this.props.locationData.severity;
      contentToRender.push(neighborhoodStr, problemStr, severityStr);
    }
    //console.log(contentToRender);
    
    return (
      <div className="cards">
        <div className="card" id="cardID">
          {this.makeParagraphs(contentToRender)}
        </div>
      </div>
    )
  }
}