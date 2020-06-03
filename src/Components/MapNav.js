import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';


export class MapNav extends Component {
  render(){
    return(
      <nav className="navbar navbar-expand-sm navbar-light">
        <ul className="navbar-nav">
          <li onClick={this.props.hideCard} className="nav-item">
            <NavLink exact className="nav-link" activeClassName="active" to="/home">All Data</NavLink>
          </li>
          <li onClick={this.props.hideCard} className="nav-item">
            <NavLink className="nav-link" activeClassName="active" to="/home/bookmarked">Bookmarked</NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}