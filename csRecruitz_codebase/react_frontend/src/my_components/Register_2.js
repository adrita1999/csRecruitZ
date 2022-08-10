import React, {Component} from "react";
import Navb from "./Navb";
import './registration.css';
import {InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
class Register_2 extends Component {
    render() {

        return(<React.Fragment>
            <Navb/>
            <div className="content_reg">
                <p style={{
              fontSize:18,
              marginBottom:-10,
              fontWeight:"bold"
          }}>Job Experience</p>
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

        </form>
            </div>
        </React.Fragment>)
    }
}
export default Register_2;