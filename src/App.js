import React, {Component} from 'react';
import Leaflet from 'leaflet';
import {NavBar} from './NavBar';
import {Map} from './MapSection';
import {Form} from './Form';


export class App extends Component {
  render(){
      return (
          <div>
          <header>
              <NavBar />
          </header>

          <main>
              <section>
                  <div className="image-box">
                      <img src="img/top-stock.jpg" alt="Seattle skyline at dusk" className="header-image"></img>
                      <div> 
                          <a className="cite img-cite" href="https://unsplash.com/@phoebezzf?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Zhifei Zhou">
                              <span className="image-span">Zhifei Zhou</span>
                          </a>
                      </div>
                  </div>
              </section>
              <section id="main-content">
                  <div className="colored-header">
                      <h1 className="container">Record and View</h1>
                  </div>
                  <div className="container">
                      <p>View and record sidewalk accessibility accross the Greater Seattle area. Click the marker icons on the map for more information on accessibility flaws at a location or fill out the form at the bottom to contribute to the map! Check the about page for more information on this project.</p>
                  </div>
              </section>

              <section className="map-background">
                  <div className="colored-header">
                    <h2 className="container">View</h2>
                  </div>
                  {/* <Map /> */}
              </section>

              <section className="container">
                  <h2>Record Sidewalk Information</h2>
                  <Form />
              </section>
          </main>

          <footer>
              <div className="footer">
                  <div className="container">
                      <div className="inline">
                          <p role="copyright">&#169;Hailey Meister</p>
                      </div>
                      <div className="inline">
                          <a href="mailto:hmeister@uw.edu" target="_blank" rel="noopener noreferrer" className="foot-link">Email Us</a>
                      </div>
                      <div className="inline">
                          <p>JSON map data from <a href="https://sidewalk-sea.cs.washington.edu/developer#access-api-header" target="_blank" rel="noopener noreferrer" className="foot-link">Project Sidewalk</a></p>
                      </div>
                  </div>
              </div>
          </footer>
          </div>
        )
    }
}

export default App;