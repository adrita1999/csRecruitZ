import React, {Component} from "react";
import Navb from "./Navb";
import './registration.css';
import Foot from "./Foot";
import {MdOutlineAdd} from 'react-icons/md';
import {Animated} from "react-animated-css";
import Select from "react-select";
import {InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
var jsonData = {
    "skills": "",
    "open_to": "",
    "proj_name": "",
    "proj_link": "",
    "proj_desc": "",
}
const SkillOptions = [
    { value: 'Python', label: 'Python' },
    { value: 'C++', label: 'C++' },
    { value: 'Angular', label: 'Angular' },
    { value: 'Django', label: 'Django' },
    { value: 'Java', label: 'Java' }
    ]
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
class Register_3 extends Component {
    constructor() {
        super();
        this.state = {
            selectedOptions: [],
            selectedOptions_2:[],
            numDivs: 0
        };
        this.handleChangeSkill = this.handleChangeSkill.bind(this);
        this.handleChangeOpenTo =this.handleChangeOpenTo.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
    }
    handleClickSkip() {
       window.location.href="/register4"
      }
      handleSubmit(event) {
          event.preventDefault();
          var str1=""
          var str2=""
          for (let i=0;i<this.state.selectedOptions.length;i++) {
              str1=str1+"#"+this.state.selectedOptions[i].value
          }
          console.log(str1)
          for (let i=0;i<this.state.selectedOptions_2.length;i++) {
              str2=str2+"#"+this.state.selectedOptions_2[i].value
          }
          jsonData.skills=str1
          jsonData.open_to=str2
          console.log(str2)
          fetch('http://127.0.0.1:8000/first_module/jobexp/addexp/', {  // Enter your IP address here

      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
          //window.location.href = "/register4"
      }
       handleChangeSkill = (selectedOptions) => {
           console.log(selectedOptions)
           this.setState({ selectedOptions :selectedOptions })
        }
        handleChangeOpenTo = (selectedOptions) => {
           console.log(selectedOptions)
           this.setState({ selectedOptions_2:selectedOptions })
        }
    render() {

        return(<React.Fragment>
            <Navb/>
            <div >
                <br/><br/>
                <ul className="list-unstyled multi-steps">
                    <li >Experiences</li>
                    <li className="is-active"><b style={{
                        color:"green"
                    }}>Skills and Projects</b></li>
                    <li >Publications and Licenses</li>
                </ul>
            </div>
            <Animated animationIn="slideInLeft"  animationInDuration={2000}  isVisible={true}>
            <div className="content_reg_2">
                <p className="seems-h1_reg"><b> Add Your Skills and Projects</b></p>
                <p style={{
              fontSize:18,

              fontWeight:"bold",
                    marginRight:-20

                }}>Skills</p>
                <hr/>
                 <form onSubmit={this.handleSubmit}>
                <div className="row">
                 <div className="form-group">
                 <InputLabel for="skills">Skills:</InputLabel>
                 <Select name="skills" id="skills" styles={dropDownStyle} options={SkillOptions} onChange={this.handleChangeSkill} isMulti placeholder="Add Your Skills" openMenuOnFocus isClearable />
             </div>

            </div>
            <div className="row">
                 <div className="form-group">
                <InputLabel for="open_skills">Currently Open To:</InputLabel>
                 <Select name="open_skills" id="open_skills" styles={dropDownStyle} options={this.state.selectedOptions} onChange={this.handleChangeOpenTo} isMulti placeholder="Add Skills that You are Currently Open to Work with " openMenuOnFocus isClearable />

             </div>

            </div>

                <p style={{
                    marginTop:30,
              fontSize:18,

              fontWeight:"bold",
                    marginRight:-20

          }}>Projects <p className="btn add_btn_2" onClick={() => { this.setState({numDivs: this.state.numDivs+1}); }}><MdOutlineAdd size={'1.3em'}/>Add More</p></p>

          <hr/>

                    <div className="row">
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="job_des">Project Name:</InputLabel>
                 <input
                     type="text"
                     name="proj_name"

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Your Project's Name"
                     id="proj_name" required/>

             </div>
                  </div>
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="proj_link">Project Link:</InputLabel>
                 <input
                     type="url"
                     name="proj_link"

                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Project's Repository Link"
                     id="proj_link" />

             </div>
                  </div>

             </div>

            <div className="row">

                    <div className="form-group" >
                        <InputLabel htmlFor="proj_desc">Description</InputLabel>
                        <textarea
                            name="proj_desc"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Write Something About Your Project"
                            id="proj_desc"/>

                  </div>
                </div>
                    {
    new Array(this.state.numDivs).fill(0).map((item, index) => (
        <div>
            <hr/>
            <div className="row">
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="job_des">Project Name:</InputLabel>
                 <input
                     type="text"
                     name="proj_name"

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Your Project's Name"
                     id="proj_name" required/>

             </div>
                  </div>
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="proj_link">Project Link:</InputLabel>
                 <input
                     type="url"
                     name="proj_link"

                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Project's Repository Link"
                     id="proj_link" />

             </div>
                  </div>

             </div>

            <div className="row">

                    <div className="form-group" >
                        <InputLabel htmlFor="proj_desc">Description</InputLabel>
                        <textarea
                            name="proj_desc"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Write Something About Your Project"
                            id="proj_desc"/>

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
export default Register_3;