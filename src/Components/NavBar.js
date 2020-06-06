import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAccessibleIcon } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';

// For navbar toggling 
import 'bootstrap/dist/js/bootstrap.bundle.min';



export default class NavBar extends Component {
    render(){
      return (
        <header>
          <nav className="navbar navbar-head navbar-expand-lg navbar-light" role="navigation">
            <div>
              <a href="#main-content" className="skip-link">Skip to main content</a>
            </div>
            <p className="navbar-brand nav-title top-header">
              <span className='pr-3' aria-hidden='true'><FontAwesomeIcon icon={faAccessibleIcon} /></span>Access Seattle
            </p>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">   
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/home">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/sign-in">Sign In</NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      )
    }
}