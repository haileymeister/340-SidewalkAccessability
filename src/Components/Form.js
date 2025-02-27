import React, { Component } from "react";
import ImageCite from "./ImgCite";

export default class FormSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      street: '',
      city: '',
      state: '',
      zipcode: '',
      problem: '',
      otherText: '',

      errorMessage: '',
      disabled: false,
      success: null,
    };
  }

  handleChange = (event) => {
    let name = event.target.name;
    let newValue = event.target.value;

    this.setState( {[name]: newValue, disabled: false, success: null} );
  };

  handleOther = (event) => {
    //console.log('other', event.target.value)
    this.setState( {otherText: event.target.value, problem: event.target.value, disabled: false} );
  }

  getMissingField = () => {
    let allFields = {
      street: this.state.street, 
      city: this.state.city, 
      state: this.state.state, 
      zipcode: this.state.zipcode, 
      problem: this.state.problem
    };

    let missing = [];
    Object.keys(allFields).map( (key) => {
      if (allFields[key] === ""){
        missing.push(key);
      }
      return key;
    });
    return missing;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    let missingField = this.getMissingField();
    let error = '';

    let fieldStr = 'feild';
    if(missingField.length > 1){
      fieldStr = 'feilds';
    }

    if (missingField.length > 0){
      let missingStr = missingField.toString().replace(/,/g, ', ').replace(/,([^,]*)$/,', and$1');
      error = <p className="alert alert-danger"><strong>Please fill in the {missingStr} {fieldStr}.</strong></p>;
      this.setState( {errorMessage: error, disabled: true} );
    } else if (this.state.problem === 'Other' && this.state.otherText === ''){
      error = <p className="alert alert-danger"><strong>Please fill in the other text field.</strong></p>;
      this.setState({disabled: false, errorMessage: error});

    } else {
      let address = this.state.street + " " + this.state.city + " " + this.state.state + " " + this.state.zipcode;
      this.props.addMarker(address, this.state.problem)
      this.setState( {disabled: false, success: true, errorMessage: ''} );
      this.clearForm();
    }
  };


  clearForm = () => {
    this.setState({
        street: '',
        city: '',
        state: '',
        zipcode: '',
        problem: '',
        otherText: '',
        disabled: false,
      });
  }

  successMessage = () => {
    if (this.props.validAddress && this.state.success){
      return (<p id="success" className="alert alert-success">Thank You!</p>)
    } else if (!this.props.validAddress && this.props.validAddress !== null) {
      return (<p id="failed" className="alert alert-danger">Address may not be valid. Try again.</p>)
    }
  }


  render() {
    return (
      <div>
        <div className="flex-container">
          <div className="flex-item">
            {this.successMessage()}
            {this.state.errorMessage}
            <form id="input-form">
              <div className="form-group">
                <h3 className="form-header">Address</h3>
                <label htmlFor="street" id="street-lab">
                  Street
                </label>{" "}
                <input
                  type="text"
                  id="street"
                  name="street"
                  className="text-input"
                  placeholder="Enter street address"
                  value={this.state.street}
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
                  value={this.state.city}
                  onChange={this.handleChange}
                ></input>
                <br></br>
                <label htmlFor="state">State</label>{" "}
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="text-input"
                  placeholder="Enter state"
                  value={this.state.state}
                  onChange={this.handleChange}
                ></input>
                <br></br>
                <label htmlFor="zip">Zipcode</label>{" "}
                <input
                  type="text"
                  id="zip"
                  name="zipcode"
                  className="text-input"
                  placeholder="Enter zipcode"
                  value={this.state.zipcode}
                  onChange={this.handleChange}
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
                      onChange={this.handleChange}
                      checked={this.state.problem === 'Obstruction'}
                    ></input>{" "}
                    <label htmlFor="obstruction">Obstruction</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="pothole"
                      name="problem"
                      value="Pothole"
                      onChange={this.handleChange}
                      checked={this.state.problem === 'Pothole'}
                    ></input>{" "}
                    <label htmlFor="pothole">Pothole</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="bump"
                      name="problem"
                      value="Large Bump"
                      onChange={this.handleChange}
                      checked={this.state.problem === 'Large Bump'}
                    ></input>{" "}
                    <label htmlFor="bump">Large Bump</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="other"
                      name="problem"
                      value="Other"
                      onChange={this.handleChange}
                      checked={this.state.problem === 'Other' || this.state.otherText.length > 0}
                    ></input>{" "}
                    <label htmlFor="other">Other</label>{" "}
                    <input
                      type="text"
                      id="otherText"
                      name="problem"
                      className="text-input"
                      placeholder="Please specify..."
                      value={this.state.otherText}
                      onChange={this.handleOther}
                      
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
                src="../img/bricks.jpeg"
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
