import React, {Component} from 'react';
import {ImageCite} from './ImgCite';


export class FormSection extends Component {

  render(){
    return(
      <div>

        {/* <p id="success" className="alert alert-success d-none">Thank You!</p>
        <p id="failed" className="alert alert-danger d-none">Address may not be valid. Try again.</p> */}

        <div className="flex-container">
            <div className="flex-item">
                <form id="input-form">
                <div className="form-group">
                    <h3 className="form-header">Address</h3>

                    <label htmlFor="street" id="street-lab">Street</label> <input type="text" id="street" name="street" className="text-input" placeholder="Enter street address" required></input>
                    <br></br>
                    <label htmlFor="city">City</label> <input type="text" id="city" name="city" className="text-input" placeholder="Enter city" required></input>
                    <br></br>
                    <label htmlFor="state">State</label> <input type="text" id="state" name="state" className="text-input" placeholder="Enter state" required></input>
                    <br></br>
                    <label htmlFor="zip">Zipcode</label> <input type="text" id="zip" name="zipcode" className="text-input" placeholder="Enter zipcode" required></input>
                </div>   
                <div className="form-group">
                    <h3 className="form-header">Accessibility Problem</h3>
                    <ul className="form-list">
                        <li>
                            <input type="radio" id="obstruction" name="problem" value="Obstruction" required></input> <label htmlFor="obstruction">Obstruction</label>
                        </li>
                        <li>
                            <input type="radio" id="pothole" name="problem" value="Pothole"></input> <label htmlFor="pothole">Pothole</label>
                        </li>
                        <li>
                            <input type="radio" id="bump" name="problem" value="Bump"></input> <label htmlFor="bump">Large Bump</label>
                        </li>
                        <li>
                            <input type="radio" id="other" name="problem" value="other"></input> <label htmlFor="other">Other</label> <input type="text" id="otherText" name="other" className="text-input" placeholder="Please specify..."></input>
                        </li>
                        <li>
                            <input type="submit" value="Submit" className="submit-button" aria-label="submit button"></input>
                        </li>
                    </ul>
                </div>
                </form>
            </div>    
            <div className="flex-item">
                <div className="image-box image-hide">
                    <img src="img/bricks.jpeg" alt="sidewalk with jagged bricks" className="flex-image"></img>
                    <ImageCite 
                      name="Marylyn Baxter"
                      url="https://pixabay.com/users/marilynbaxter-1492801/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=976939"
                      classes="cite img-cite small-image-cite"
                    />
                </div>
            </div>   
        </div>
      </div>
    )
  }
}