import React, { Component } from "react";
import { NavBar } from "./NavBar";
import { MapData } from "./Map";
import { ImageCite } from "./ImgCite";

export class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      locations: []
    }
  }

  componentDidMount() {
    // https://github.com/PaulLeCam/react-leaflet/issues/453#issuecomment-541142178
    // Fix for weird bug that happens when you import the CSS file directly into your JS
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }


  render() {
    return (
      <div>
        <header>
          <NavBar />
        </header>

        <main>
          <section>
            <div className="image-box">
              <img
                src="img/top-stock.jpg"
                alt="Seattle skyline at dusk"
                className="header-image"
              ></img>
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
              <p>
                View and record sidewalk accessibility accross the Greater
                Seattle area. Click the marker icons on the map for more
                information on accessibility flaws at a location or fill out the
                form at the bottom to contribute to the map! Check the about
                page for more information on this project. Click on the map to hide the extra information shown on the side.
              </p>
            </div>
          </section>

          <MapData />

        </main>

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
      </div>
    );
  }
}

export default App;
