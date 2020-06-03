import React, {Component} from 'react';

export default class Footer extends Component {

  render(){

    return (
      <footer>
          <div className="footer">
            <div className="container">
              <div className="inline">
                <p aria-label="copyright">&#169;Hailey Meister</p>
              </div>
              <div className="inline">
                <a
                  href="mailto:hmeister@uw.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="foot-link"
                >
                  Email Us
                </a>
              </div>
              <div className="inline">
                <p>
                  JSON map data from{" "}
                  <a
                    href="https://sidewalk-sea.cs.washington.edu/developer#access-api-header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="foot-link"
                  >
                    Project Sidewalk
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
    )
  }
}