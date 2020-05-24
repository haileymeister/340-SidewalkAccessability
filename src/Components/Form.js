import React, {Component} from 'react';
import {ImageCite} from './ImgCite';
import {SubmittedMarker} from './MakeMap'


export class FormSection extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentStreetValue: '',
      currentCityValue: '',
      currentStateValue: '',
      currentZipValue: '',
      streetProblem: '',
    }
  }

  handleChange = (event) => {
    let newValue = event.target.value;
    this.setState({whichInput: newValue});
  }

  handleSubmit = (event) => {
      event.prventDefault();
      let address = this.currentStreetValue + ' ' + this.currentCityValue + ' ' + this.currentStateValue + ' ' + this.currentZipValue;
      <SubmittedMarker address={address} problem={this.state.streetProblem} />

      this.setState({
        currentStreetValue: '',
        currentCityValue: '',
        currentStateValue: '',
        currentZipValue: '',
        streetProblem: ''
      })
  }

  render(){

    return(
      <div>

        {/* <p id="success" className="alert alert-success d-none">Thank You!</p>
        <p id="failed" className="alert alert-danger d-none">Address may not be valid. Try again.</p> */}

        <div className="flex-container">
            <div className="flex-item">
                <form id="input-form" onSubmit={this.handleSubmit()}>
                <div className="form-group">
                    <h3 className="form-header">Address</h3>

                    <label htmlFor="street" id="street-lab">Street</label> <input type="text" id="street" name="street" className="text-input" placeholder="Enter street address" value={this.state.currentStreetValue} onChange={this.handleChange()} required></input>
                    <br></br>
                    <label htmlFor="city">City</label> <input type="text" id="city" name="city" className="text-input" placeholder="Enter city" onChange={this.handleChange()} required></input>
                    <br></br>
                    <label htmlFor="state">State</label> <input type="text" id="state" name="state" className="text-input" placeholder="Enter state" onChange={this.handleChange()} required></input>
                    <br></br>
                    <label htmlFor="zip">Zipcode</label> <input type="text" id="zip" name="zipcode" className="text-input" placeholder="Enter zipcode" onChange={this.handleChange()} required></input>
                </div>   
                <div className="form-group">
                    <h3 className="form-header">Accessibility Problem</h3>
                    <ul className="form-list">
                        <li>
                            <input type="radio" id="obstruction" name="problem" value="Obstruction" onChange={this.handleChange()} required></input> <label htmlFor="obstruction">Obstruction</label>
                        </li>
                        <li>
                            <input type="radio" id="pothole" name="problem" value="Pothole" onChange={this.handleChange()}></input> <label htmlFor="pothole">Pothole</label>
                        </li>
                        <li>
                            <input type="radio" id="bump" name="problem" value="Bump" onChange={this.handleChange()}></input> <label htmlFor="bump">Large Bump</label>
                        </li>
                        <li>
                            <input type="radio" id="other" name="problem" value="other" onChange={this.handleChange()}></input> <label htmlFor="other">Other</label> <input type="text" id="otherText" name="other" className="text-input" placeholder="Please specify..." onChange={this.handleChange()}></input>
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