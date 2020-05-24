import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAccessibleIcon } from '@fortawesome/free-brands-svg-icons'


export class NavBar extends Component {
    render(){

        return (
            <nav className="navbar navbar-expand-lg navbar-light" role="navigation">
                <div>
                    <a href="#main-content" className="skip-link">Skip to main content</a>
                </div>
                <h1 className="navbar-brand nav-title top-header">
                    <span className='pr-3' aria-hidden='true'><FontAwesomeIcon icon={faAccessibleIcon} /></span>Access Seattle
                </h1>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">   
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <button className="nav-link">Home</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link">About</button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}