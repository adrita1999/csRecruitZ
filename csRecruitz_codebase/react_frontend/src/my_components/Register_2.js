import React, {Component} from "react";
import Navb from "./Navb";
import './registration.css';
import Foot from "./Foot";
import {Animated} from "react-animated-css";
import {MdOutlineAdd} from 'react-icons/md'
import {InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
class Register_2 extends Component {
    constructor() {
        super();
        this.state = {

            numDivs: 0
        };
    }
    handleClickSkip() {
       window.location.href="/register3"
      }
      handleSubmit(event) {
          event.preventDefault();
          window.location.href = "/register3"
      }


    render() {

        return(<React.Fragment>
            <Navb/>
            <Animated animationIn="slideInLeft"  animationInDuration={2000}  isVisible={true}>
            <div className="content_reg_2">
                <p className="seems-h1_reg"><b> Add Your Experiences</b></p>
                <p style={{
              fontSize:18,
              marginBottom:-4,
              fontWeight:"bold",
                    marginRight:-20

          }}>Job Experience <p className="btn add_btn" onClick={() => { this.setState({numDivs: this.state.numDivs+1}); }}><MdOutlineAdd size={'1.3em'}/>Add More</p></p>

          <hr/>
                <form onSubmit={this.handleSubmit}>
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
                     id="job_des" required/>

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
                     id="job_emp" required/>

             </div>
                  </div>

             </div>
            <div className="row">
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="from_year">From Year:</InputLabel>
                 <input
                     type="number"
                     min="1990"
                     max="2099"
                     step="1"
                     name="from_year"
                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Your Starting Year"
                     id="from_year" required/>

             </div>
                  </div>
                 <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="to_year">To Year:</InputLabel>
                 <input
                     type="number"
                     min="1990"
                     max="2099"
                     step="1"
                     name="to_year"
                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Your Finishing Year"
                     id="to_year" required/>

             </div>
                  </div>

             </div>

            <div className="row">

                    <div className="form-group" >
                        <InputLabel htmlFor="desc">Description</InputLabel>
                        <textarea
                            name="desc"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Write Something About Your Experience"
                            id="desc"/>

                  </div>
                </div>
                    {
    new Array(this.state.numDivs).fill(0).map((item, index) => (
        <div>
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
                     id="job_des" required/>

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
                     id="job_emp" required/>

             </div>
                  </div>

             </div>
            <div className="row">
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="from_year">From Year:</InputLabel>
                 <input
                     type="number"
                     min="1990"
                     max="2099"
                     step="1"
                     name="from_year"
                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Your Starting Year"
                     id="from_year" required/>

             </div>
                  </div>
                 <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="to_year">To Year:</InputLabel>
                 <input
                     type="number"
                     min="1990"
                     max="2099"
                     step="1"
                     name="to_year"
                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Your Finishing Year"
                     id="to_year" required/>

             </div>
                  </div>

             </div>

            <div className="row">

                    <div className="form-group" >
                        <InputLabel htmlFor="desc">Description</InputLabel>
                        <textarea
                            name="desc"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Write Something About Your Experience"
                            id="desc"/>

                  </div>
                </div>
                        </div>

    ))
}
                    <div className="row btn-group-justified" style={{
                        width:"120%"
                    }} >
                        <button className="btn btn-danger skip_btn" onClick={this.handleClickSkip}>Skip</button>
                        <input type="submit" value="Continue" className="btn btn-success sub_btn_2"  />
                </div>

        </form>
            </div>
            </Animated>
            <Foot margin_value={172}/>
        </React.Fragment>)
    }
}
export default Register_2;