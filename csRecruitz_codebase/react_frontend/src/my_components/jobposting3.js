import React, {Component} from "react";
import Navb from "./Navb";
import './registration.css';
import Foot from "./Foot";
import {MdOutlineAdd} from 'react-icons/md';
import {Animated} from "react-animated-css";
import {storage} from "./Firebase";
import Select from "react-select";
import {InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Loader from "./loader";
var jsonData = {
    "j_edu": "",
    "j_step": "3",
    "j_add": "",
    "j_apply": "",

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
class Job_3 extends Component {
    constructor() {
        super();
        this.state = {
            input: {},
            numDivs: 0,
            numDivs_2:0,
            tot_certis:"",
            DetailsLoaded4:false,
        };
        this.handleSubmit =this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleChangeFile=this.handleChangeFile.bind(this);
    }


      handleSubmit(event) {
          event.preventDefault();
          var str1=this.state.input["edu"];
          var str2="";
          if(this.state.input["add"]) {
              str2=this.state.input["add"];
          }
          var str3="";
          if(this.state.input["apply"]) {
              str3=this.state.input["apply"];
          }

          jsonData.j_edu=str1;
          jsonData.j_add=str2;
          jsonData.j_apply=str3;



          fetch('http://127.0.0.1:8000/jobpost/', {  // Enter your IP address here

      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
          window.location.href = "/emp"
      }
      handleChange(event) {

    let input = this.state.input;
    console.log(event.target.name);
    input[event.target.name] = event.target.value;


    this.setState({
      input
    });
  }
  handleChangeFile(event) {
        let input = this.state.input;
    console.log(event.target.name);
    input[event.target.name] = event.target.files[0];
    this.setState({
      input
    });
        //console.log(event.target.files)
  }
    render() {

        return(<React.Fragment>
            <Navb/>
            <div >
                <br/><br/>
                <ul className="list-unstyled multi-steps">
                    <li >Step 1</li>
                    <li>Step 2</li>
                    <li className="is-active"><b style={{
                        color:"green"
                    }}>Step 3</b></li>
                </ul>
            </div>
            <Animated animationIn="slideInLeft"  animationInDuration={2000}  isVisible={true}>
            <div className="content_reg_2">
                <p className="seems-h1_reg"><b> Create A New Job Post</b></p>
                <hr/>

                 <form onSubmit={this.handleSubmit}>
                             <div className="row" style={{
             marginBottom:5
         }}>

                    <div className="form-group" >
                        <InputLabel htmlFor="proj_desc">Educational Requirements:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                        <textarea
                            name="edu"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Mention Educational Requirements"
                            id="job_res" required/>

                  </div>
                </div>
                     <div className="row" style={{
             marginBottom:5
         }}>

                    <div className="form-group" >
                        <InputLabel htmlFor="proj_desc">Additional Requirements:</InputLabel>
                        <textarea
                            name="add"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Mention Additional Requirements"
                            id="job_res"/>

                  </div>
                </div>
                     <div className="row" style={{
             marginBottom:5
         }}>

                    <div className="form-group" >
                        <InputLabel htmlFor="proj_desc">Application Process:</InputLabel>
                        <textarea
                            name="apply"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Mention Application Process"
                            id="job_res"/>

                  </div>
                </div>

                    <div className="row btn-group-justified" style={{
                        width:"120%"
                    }} >

                       <input type="submit" value="Finish" className="btn btn-success sub_btn_job1" />
                </div>

        </form>
            </div>
            </Animated>
            <Foot margin_value={172}/>
        </React.Fragment>)
    }
}
export default Job_3;