import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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
          <p>Maybe add an image? Need to fill more space?</p>
          <div className="colored-header">
            <h2 className="container">Sign-in</h2></div>
            <div className="alert">
              <h3 className="container">Logged in as {this.props.user.displayName}
                <button className="btn float-right" onClick={this.handleSignOut}>Sign Out</button>
              </h3>
          </div>
        </div>
      )
    }
    return (<div>{content}</div>)
  }
}