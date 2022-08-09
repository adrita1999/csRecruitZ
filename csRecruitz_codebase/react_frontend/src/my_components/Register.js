import React, {Component} from "react";
import Navb from "./Navb";
import './registration.css';
import {InputLabel} from "@mui/material";
import Select from "react-select";
var jsonData = {
    "name":"",
    "password":"",
    "email":"",
    "dob":"",
  }
  const dropDownStyle ={
    control: (base, state) => ({
    ...base,

        // This line disable the blue border
        boxShadow: state.isFocused ? 0 : 0,
        //marginBottom:-20

    }),
   dropdownIndicator: (base, state) => ({
    ...base,
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
   })
};
const GenderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' }
    ]
const CatOptions = [
    { value: 'Teaching', label: 'Teaching' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Security', label: 'Security' },
    { value: 'Research and Development', label: 'Research and Development' },
    { value: 'Programming', label: 'Programming' },
  ]
const NatureOptions = [
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Remote', label: 'Remote' },
    { value: 'Freelancing', label: 'Freelancing' }
    ]
  const OrgOptions = [
    { value: 'Government', label: 'Government' },
    { value: 'Semi Government', label: 'Semi Government' },
    { value: 'NGO', label: 'NGO' },
    { value: 'Private Firm', label: 'Private Firm' },
    { value: 'International Agencies', label: 'International Agencies' }
  ]
const SkillOptions = [
    { value: 'Python', label: 'Python' },
    { value: 'C++', label: 'C++' },
    { value: 'Angular', label: 'Angular' },
    { value: 'Django', label: 'Django' },
    { value: 'Java', label: 'Java' }
    ]
const LocationOptions = [
    { value: 'Dhaka', label: 'Dhaka' },
    { value: 'Rajshahi', label: 'Rajshahi' },
    { value: 'Rangpur', label: 'Rangpur' },
    { value: 'Sylhet', label: 'Sylhet' },
    { value: 'Khulna', label: 'Khulna' },
    { value: 'Chittagong', label: 'Chittagong' },
    { value: 'Mymensingh ', label: 'Mymensingh ' },
    { value: 'Barishal', label: 'Barishal' }
  ]
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
  onFocusHandle(event) {
        event.target.type='date';
  }
  onBlurHandle(event) {
        event.target.type='text';
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log("geree");

    if(this.validate()){
        console.log(this.state);
        jsonData.name=this.state.input["name"];
        jsonData.email=this.state.input["email"];
        jsonData.password=this.state.input["password"];
        jsonData.dob=this.state.input["dob"];
        let input = {};

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

              className="form-control"
              placeholder="Enter name"
              onChange={this.handleChange}
              id="name" required/>

          </div>
             </div>
             <div className="col-sm-6">
                 <div className="form-group">
                     <InputLabel for="dob">Date of Birth:</InputLabel>
                     <input
                         type="text"
                         name="dob"

                         className="form-control"
                         placeholder="Enter Date of Birth"
                         onFocus={this.onFocusHandle}
                         onBlur={this.onBlurHandle}
                         id="dob" required/>


                 </div>
             </div>
         </div>
            <div className="row">
            <div className="col-sm-6">
            <div className="form-group">
                <InputLabel for="gender">Gender:</InputLabel>
                <Select name="gender" id="gender" styles={dropDownStyle} options={GenderOptions}  placeholder="Enter Gender" openMenuOnFocus isClearable />


                <div className="text-danger">{this.state.errors.email}</div>
            </div>
            </div>
            <div className="col-sm-6">
            <div className="form-group">
                <InputLabel for="mob">Contact Number:</InputLabel>
                <input
                    type="number"
                    name="mob"

                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter Contact Number"
                    id="mob" required/>

            </div>
            </div>
                </div>
            <div className="row">
            <div className="col-sm-6">
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
            </div>
            <div className="col-sm-6">
            <div className="form-group">
                <InputLabel for="nid">NID number:</InputLabel>
                <input
                    type="number"
                    name="nid"

                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter NID Number"
                    id="nid" required/>

            </div>
            </div>
                </div>
            <div className="row">
             <div className="col-sm-6">
          <div className="form-group">
            <InputLabel for="password">Password:</InputLabel>
            <input
              type="password"
              name="password"

              onChange={this.handleChange}
              className="form-control"
              placeholder="Enter password"
              id="password" required/>

              <div className="text-danger">{this.state.errors.password}</div>
          </div>
             </div>
                <div className="col-sm-6">
                <div className="form-group">
                    <InputLabel htmlFor="password">Confirm Password:</InputLabel>
                    <input
                        type="password"
                        name="confirm_password"

                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Retype password"
                        id="confirm_password" required/>
                </div>
                </div>

            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <InputLabel htmlFor="father">Father's Name:</InputLabel>
                        <input
                            type="text"
                            name="father"

                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter Father's Name:"
                            id="father"/>

                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <InputLabel htmlFor="mother">Mother's Name:</InputLabel>
                        <input
                            type="text"
                            name="mother"

                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter Mother's Name"
                            id="mother"/>
                    </div>
                </div>

            </div>


            <div className="row">

                    <div className="form-group" >
                        <InputLabel htmlFor="about">Self Description</InputLabel>
                        <textarea
                            name="about"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Write Something About Yourself"
                            id="about"/>

                  </div>
                </div>
            <p></p>
            <p style={{
            fontSize:16,
             fontWeight:"bold"
            }}>Address Information</p>
            <hr/>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <InputLabel htmlFor="street">Street/Road:</InputLabel>
                        <input
                            type="text"
                            name="street"

                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter Street Name:"
                            id="street"/>

                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <InputLabel htmlFor="thana">Thana:</InputLabel>
                        <input
                            type="text"
                            name="thana"

                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter Thana"
                            id="thana"/>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <InputLabel htmlFor="dis">District:</InputLabel>
                        <input
                            type="text"
                            name="dis"

                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter District:"
                            id="dis"/>

                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <InputLabel for="gender">Division:</InputLabel>
                <Select name="loc" id="loc" styles={dropDownStyle} options={LocationOptions}  placeholder="Enter Division" openMenuOnFocus isClearable />
                    </div>
                </div>

            </div>
            <p></p>
                <p style={{
              fontSize:18,
              fontWeight:"bold"
          }}>Professional Information</p>
          <hr/>
            <div className="row">
            <div className="col-sm-6">
            <div className="form-group">
                <InputLabel for="field">Field of Work:</InputLabel>
                <Select name="field" id="field" styles={dropDownStyle} options={CatOptions}  placeholder="Enter Your Current Field of Work" openMenuOnFocus isClearable />

            </div>
            </div>
            <div className="col-sm-6">

                <div className="form-group">
                <InputLabel for="pref_org">Preferred Organization:</InputLabel>
                <Select name="pref_org" id="pref_org" styles={dropDownStyle} options={OrgOptions}  placeholder="Enter Your Preferred Organization Type" openMenuOnFocus isClearable />

            </div>
            </div>
                </div>
            <div className="row">
            <div className="col-sm-6">
            <div className="form-group">
                <InputLabel for="pref_nat">Preferred Job Nature:</InputLabel>
                <Select name="pref_nat" id="pref_nat" styles={dropDownStyle} options={NatureOptions}  placeholder="Enter Your Preferred Job Nature" openMenuOnFocus isClearable />

            </div>
            </div>
            <div className="col-sm-6">
                   <div className="form-group">
                <InputLabel for="pref_sal">Preferred Salary:</InputLabel>
                <input
                    type="number"
                    name="pref_sal"

                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter Your Expected Salary in BDT"
                    id="pref_sal"/>

            </div>

            </div>
                </div>
            <div className="row">
                 <div className="form-group">
                 <InputLabel for="skills">Skills:</InputLabel>
                 <Select name="skills" id="skills" styles={dropDownStyle} options={SkillOptions} isMulti placeholder="Add Your Skills" openMenuOnFocus isClearable />

             </div>

            </div>
            <div className="row">
                 <div className="form-group">
                <InputLabel for="open_skills">Currently Open To:</InputLabel>
                 <Select name="open_skills" id="open_skills" styles={dropDownStyle} options={SkillOptions} isMulti placeholder="Add Skills that You are Currently Open to Work with " openMenuOnFocus isClearable />

             </div>

            </div>
             <p></p>
            <p style={{
               fontSize:16,
              fontWeight:"bold"
          }}>Job Experience <p className="btn btn-success" onClick={() => { this.setState({numDivs: this.state.numDivs+1}); }}>Add</p></p>

         <hr/>
              <div className="row">
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="job_des">Designation:</InputLabel>
                 <input
                     type="text"
                     name="job_des"

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Your Designation in the Job"
                     id="job_des"/>

             </div>
                  </div>
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="job_emp">Employer:</InputLabel>
                 <input
                     type="text"
                     name="job_emp"

                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Employer/Organization Name"
                     id="job_emp"/>

             </div>
                  </div>

             </div>

            <input type="submit" value="Submit" className="btn btn-success" />
        </form>
      </div>
            </React.Fragment>
    );
  }

}
export default Register;

// <input
//               tabIndex={-1}
//               autoComplete="off"
//               style={{ opacity: 0, height: 0 }}
//
//               required
//             />