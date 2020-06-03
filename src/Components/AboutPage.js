import React, { Component } from "react";
import ImageCite from './ImgCite';

export default class AboutPage extends Component {
  render(){

    return (
      <main>
        <section>
          <div className="image-box">
            <img src="img/women-sidewalk.jpg" alt="Women walking on an open sidewalk infront of a wall" className="header-image"></img>
            <div>
                <ImageCite
                  name="Nick Bolton"
                  url="https://unsplash.com/@nickrbolton?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
                  classes="cite img-cite" 
                  />
            </div>
          </div>
        </section>
        <section id="main-content">
            <div className="colored-header">
                <h1 className="container">Project Details</h1>
            </div>
            <div className="container">
                <p>This project was designed and developed by me, Hailey Meister, for INFO 340: Client Side Development. Inspiration for this project was taken from the work of <a href="https://sidewalk-sea.cs.washington.edu/">Project Sidewalk</a> which aims to track sidewalk accessibility pitfalls in the Greater Seattle Area. My project aims to allow users to track and view said sidewalk data In the University District and broader Seattle area.</p>
            </div>
        </section>

        <section className="container">
            <div className="flex-container headshot-container">
                <div className="flex-item flex-align">
                    <img src="img/hailey-headshot.jpeg" alt="headshot of a women wearing black standing in front of a window" className="headshot"></img>
                </div>
                <div className="flex-item">
                    <p className="image-text"> Hailey Meister is a student at the University of Washington studying Informatics with a concentration in HCI and UX/UI design. She is also pursuing a minor in Disability Studies.</p>
                </div>
            </div>
        </section>
    </main>
    
    )
  }
}