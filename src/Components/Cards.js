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
    //console.log('cards', this.props)

    let contentToRender = [];

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

    let bookmark = null;
    if (this.props.user){
      console.log('cards', this.props.locationData)
      if (this.props.locationData.bookmarked){
        bookmark = (<span onClick={this.props.handleBookmark} className='bookmark' aria-hidden='true'><FontAwesomeIcon icon={bookmarkSolid} /></span>);
      } else {
        bookmark = (<span onClick={this.props.handleBookmark} className='bookmark' aria-hidden='true'><FontAwesomeIcon icon={bookmarkReg} /></span>);
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