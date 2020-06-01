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
    //console.log(this.props.locationData)
    if (this.props.locationData.hasOwnProperty('severity')) {
      let addressStr = "Address: " + this.props.locationData.address;
      let problemStr = "Sidewalk Problem: " + this.props.locationData.problem;
      let severityStr = "Severity: " + this.props.locationData.severity;
      contentToRender.push(addressStr, problemStr, severityStr);
    } else {
      let addressStr = "Address: " + this.props.locationData.address;
      let problemStr = "Sidewalk Problem: " + this.props.locationData.problem;
      contentToRender.push(addressStr, problemStr);
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