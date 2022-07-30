import React, {Component} from "react";
import Navb from "./Navb";
import './registration.css';
import {InputLabel} from "@mui/material";
var jsonData = {
    "name":"",
    "password":"",
    "email":"",
    "dob":"",
  }
class Register extends  Component {
    constructor() {
    super();
    this.state = {
      input: {},
      errors: {},
        redirect:false
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    if(this.validate()){
        console.log(this.state);
        jsonData.name=this.state.input["name"];
        jsonData.email=this.state.input["email"];
        jsonData.password=this.state.input["password"];
        jsonData.dob=this.state.input["dob"];
        let input = {};
        input["name"] = "";
        input["email"] = "";
        input["password"] = "";
        input["confirm_password"] = "";
        input["dob"]="";
        this.setState({input:input});
        fetch('http://127.0.0.1:8000/first_module/jobseeker/adduser/', {  // Enter your IP address here

      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
    this.setState({'redirect':true})

        alert('Demo Form is submited');
    }
  }

  validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;


      if (typeof input["email"] !== "undefined") {

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Please enter valid email address.";
        }
      }

      if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {

        if (input["password"] !== input["confirm_password"]) {
          isValid = false;
          errors["password"] = "Passwords don't match.";
        }
      }

      this.setState({
        errors: errors
      });

      return isValid;
  }

  render() {
    return (
        <React.Fragment>
        <Navb/>
      <div className="content_reg">
          <p className="seems-h1_reg"><b> Create a csRecruitZ Account</b></p>
          <p style={{
              fontSize:18,
              marginBottom:-10,
              fontWeight:"bold"
          }}>Personal Information</p>
          <hr/>
        <form onSubmit={this.handleSubmit}>
         <div className="row">
             <div className="col-sm-6">
          <div className="form-group">
            <InputLabel for="name">Name:</InputLabel>
            <input
              type="text"
              name="name"

              class="form-control"
              placeholder="Enter name"
              onChange={this.handleChange}
              id="name" required/>

          </div>
             </div>
             <div className="col-sm-6">
                 <div className="form-group">
                     <InputLabel for="dob">Date of Birth:</InputLabel>
                     <input
                         type="date"
                         name="dob"

                         className="form-control"
                         placeholder="Enter Date of Birth"
                         id="dob" required/>


                 </div>
             </div>
         </div>
          <div className="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              name="password"

              onChange={this.handleChange}
              class="form-control"
              placeholder="Enter password"
              id="password" required/>

              <div className="text-danger">{this.state.errors.password}</div>
          </div>
            <div className="form-group">
                <InputLabel for="email">Email Address:</InputLabel>
                <input
                    type="text"
                    name="email"

                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter email"
                    id="email" required/>

                <div className="text-danger">{this.state.errors.email}</div>
            </div>
          <div className="form-group">
            <label for="password">Confirm Password:</label>
            <input
              type="password"
              name="confirm_password"

              onChange={this.handleChange}
              class="form-control"
              placeholder="Enter confirm password"
              id="confirm_password" required/>
          </div>

          <input type="submit" value="Submit" class="btn btn-success" />
        </form>
      </div>
            </React.Fragment>
    );
  }

}
export default Register;