import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAccessibleIcon } from '@fortawesome/free-brands-svg-icons'


export class NavBar extends Component {
    render(){

        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <div>
                    <a href="#main-content" className="skip-link">Skip to main content</a>
                </div>
                <h1 className="navbar-brand nav-title top-header">
                    <span className='pr-3'><FontAwesomeIcon icon={faAccessibleIcon} /></span>Access Seattle
                </h1>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">   
                    <a href="#" className="hamburger"><i className="fa fa-bars" aria-label="menu"></i></a>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}