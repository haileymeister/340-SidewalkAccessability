import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as bookmarkSolid} from '@fortawesome/free-solid-svg-icons';
import { faBookmark as bookmarkReg } from '@fortawesome/free-regular-svg-icons';


export default class MakeCard extends Component {

  makeParagraphs = (contentArr) => {
      let cards = contentArr.map( (string) => {
        return (<p key={string}>{string}</p>);
      });
      return cards;
    }

  render(){
    let contentToRender = [];
    if (this.props.locationData.hasOwnProperty('severity')) {
      let addressStr = "Address: " + this.props.locationData.address;
      let neighborhoodStr = "Neighborhood: " + this.props.locationData.neighborhood;
      let problemStr = "Sidewalk Problem: " + this.props.locationData.problem;
      let severityStr = "Severity: " + this.props.locationData.severity;
      contentToRender.push(addressStr, neighborhoodStr, problemStr, severityStr);
    } else {
      let addressStr = "Address: " + this.props.locationData.address;
      let problemStr = "Sidewalk Problem: " + this.props.locationData.problem;
      contentToRender.push(addressStr, problemStr);
    }

    let bookmark = null;
    if (this.props.user){
      if (this.props.locationData.bookmarked){
        bookmark = (<span onClick={() => this.props.handleBookmark(this.props.locationData)} className='bookmark' aria-hidden='true'><FontAwesomeIcon icon={bookmarkSolid} /></span>);
      } else {
        bookmark = (<span onClick={() => this.props.handleBookmark(this.props.locationData)} className='bookmark' aria-hidden='true'><FontAwesomeIcon icon={bookmarkReg} /></span>);
      }
    } else {
      bookmark = null;
    }
    

    return (
      <div className="cards">
        <div className="card" id="cardID">
          {bookmark}
          {this.makeParagraphs(contentToRender)}
        </div>
      </div>
    )
  }
}