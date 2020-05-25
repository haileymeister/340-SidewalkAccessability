import React, { Component } from "react";
import { ImageCite } from "./ImgCite";

export class FormSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      street: '',
      city: '',
      state: '',
      zipcode: '',
      problem: '',

      errorMessage: '',
      disabled: false,
      sucess: false,
    };
  }

  handleChange = (event) => {
    let name = event.target.name;
    let newValue = event.target.value ? true : false;
    console.log(newValue);
    //console.log(newValue)
    this.setState( {[name]: newValue} );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('clicked')
    
    let error = '';
    if ( this.state.street === '' || this.state.city === '' || this.state.state === '' || this.state.zipcode === '' || this.state.problem === ''){
      error = <p><strong>Please fill in all feilds.</strong></p>
      this.setState( {errorMessage: error, disabled: true} );

    }  else {
      let address = this.state.street + " " + this.state.city + " " + this.state.state + " " + this.state.zipcode;
      console.log('entered')
      this.props.addMarker(address, this.state.problem)
      console.log('before set')
      this.setState( {disabled: false, success: null} )
    }

    this.clearForm();
  };

  clearForm = () => {
    this.setState({
        street: '',
        city: '',
        state: '',
        zipcode: '',
        problem: '',
        disabled: false,
        success: true
      });
  }

  successMessage = () => {
    console.log('success', this.props.validAddress)
    if (this.props.validAddress && !this.state.disabled){
      return (<p id="success" className="alert alert-success">Thank You!</p>)
    } else if (!this.props.validAddress && this.props.validAddress != null) {
      return (<p id="failed" className="alert alert-danger">Address may not be valid. Try again.</p>)
    }
  }



  render() {
    return (
      <div>
        <div className="flex-container">
          <div className="flex-item">
            {this.successMessage()}
            <form id="input-form">
              <div className="form-group">
                <h3 className="form-header">Address</h3>
                {this.state.errorMessage}
                <label htmlFor="street" id="street-lab">
                  Street
                </label>{" "}
                <input
                  type="text"
                  id="street"
                  name="street"
                  className="text-input"
                  placeholder="Enter street address"
                  value={this.state.currentStreetValue}
                  onChange={this.handleChange}
                ></input>
                <br></br>
                <label htmlFor="city">City</label>{" "}
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="text-input"
                  placeholder="Enter city"
                  value={this.state.currentCityValue}
                  onChange={this.handleChange}
                  required
                ></input>
                <br></br>
                <label htmlFor="state">State</label>{" "}
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="text-input"
                  placeholder="Enter state"
                  value={this.state.currentStateValue}
                  onChange={this.handleChange}
                  required
                ></input>
                <br></br>
                <label htmlFor="zip">Zipcode</label>{" "}
                <input
                  type="text"
                  id="zip"
                  name="zipcode"
                  className="text-input"
                  placeholder="Enter zipcode"
                  value={this.state.currentZipValue}
                  onChange={this.handleChange}
                  required={'required'}
                ></input>
              </div>
              <div className="form-group">
                <h3 className="form-header">Accessibility Problem</h3>
                <ul className="form-list">
                  <li>
                    <input
                      type="radio"
                      id="obstruction"
                      name="problem"
                      value="Obstruction"
                      onClick={this.handleChange}
                      required
                    ></input>{" "}
                    <label htmlFor="obstruction">Obstruction</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="pothole"
                      name="problem"
                      value="Pothole"
                      onClick={this.handleChange}
                    ></input>{" "}
                    <label htmlFor="pothole">Pothole</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="bump"
                      name="problem"
                      value="Large Bump"
                      onClick={this.handleChange}
                    ></input>{" "}
                    <label htmlFor="bump">Large Bump</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="other"
                      name="problem"
                      value="other" 
                    ></input>{" "}
                    <label htmlFor="other">Other</label>{" "}
                    <input
                      type="text"
                      id="otherText"
                      name="problem"
                      className="text-input"
                      placeholder="Please specify..."
                      onChange={this.handleChange}
                    ></input>
                  </li>
                  <li>
                    <input
                      type="submit"
                      value="Submit"
                      className="submit-button"
                      aria-label="submit button"
                      onClick={this.handleSubmit}
                      disabled={this.state.disabled}
                    ></input>
                  </li>
                </ul>
              </div>
            </form>
          </div>
          <div className="flex-item">
            <div className="image-box image-hide">
              <img
                src="img/bricks.jpeg"
                alt="sidewalk with jagged bricks"
                className="flex-image"
              ></img>
              <ImageCite
                name="Marylyn Baxter"
                url="https://pixabay.com/users/marilynbaxter-1492801/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=976939"
                classes="cite img-cite small-image-cite"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
