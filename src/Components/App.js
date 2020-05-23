import React, {Component} from 'react';
import {NavBar} from './NavBar';
import {MapSection} from './MapSection';
import {FormSection} from './Form';
import {ImageCite} from './ImgCite';


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
                        <ImageCite 
                          name="Zhifei Zhou" 
                          url="https://unsplash.com/@phoebezzf?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" 
                          classes="cite img-cite" 
                        />                        
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
                    <MapSection />
                </section>

                <section className="container">
                    <h2>Record Sidewalk Information</h2>
                    <FormSection />
                </section>
            </main>

            <footer>
                <div className="footer">
                    <div className="container">
                        <div className="inline">
                            <p aria-label="copyright">&#169;Hailey Meister</p>
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