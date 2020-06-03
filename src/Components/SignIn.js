import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import ImageCite from './ImgCite';

export default class SignIn extends Component {

  uiConfig = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInFlow: 'popup',
  }

  handleSignOut = () => {
    firebase.auth().signOut();
  }

  render(){
    let content = null;
    if(!this.props.user){
      content = (<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>)
    } else {
      content = (
        <div>
            <div className="alert">
              <h3 className="container">Logged in as {this.props.user.displayName}
                <button className="btn float-right" onClick={this.handleSignOut}>Sign Out</button>
              </h3>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className="image-box">
          <img src="../img/uneven-udistrict.jpeg" alt="Seattle skyline at dusk" className="header-image"></img>
          <ImageCite
            name="Hailey Meister"
            url=""
            classes="cite img-cite"
          />
        </div>
        <div className="colored-header">
            <h1 className="container">Sign-in to Contribute</h1>
        </div>
        {content}
      </div>
    )
  }
}