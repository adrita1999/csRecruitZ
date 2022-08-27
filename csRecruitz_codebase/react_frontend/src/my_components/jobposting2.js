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
class Job_2 extends Component {
    constructor() {
        super();
        this.state = {
            selectedOptions: [],
            selectedOptions_2:[],
            input: {},
            numDivs: 0
        };
        this.handleChangeSkill = this.handleChangeSkill.bind(this);
        this.handleChangeOpenTo =this.handleChangeOpenTo.bind(this);
        this.handleSubmit =this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleClickSkip() {
       window.location.href="/register4"
      }
       onFocusHandle(event) {
        event.target.type='date';
  }
  onBlurHandle(event) {
        event.target.type='text';
  }
      handleSubmit(event) {
          event.preventDefault();
          var str1=""
          var str2=""
          var str3=this.state.input["proj_name_start"]
          var str4=""
          if(this.state.input["proj_link_start"])  {
              str4=this.state.input["proj_link_start"]
          }
          else str4="?"

          var str5=""
          if(this.state.input["proj_desc_start"]){
              str5=this.state.input["proj_desc_start"]
          }
          else str5="?"
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
          for(let i=0;i<this.state.numDivs;i++) {
              var ind3="proj_name_"+i;
              var ind4="proj_link_"+i;
              var ind5="proj_desc_"+i;


              str3=str3+"#"+this.state.input[ind3]
              //str4=str4+" "+this.state.input[ind4]
              if(this.state.input[ind4]) {
                  str4 = str4 + "#" + this.state.input[ind4]
              }
              else str4=str4+'#'+'?'

              if(this.state.input[ind5]) {
                  str5 = str5 + "#" + this.state.input[ind5]
              }
              else str5=str5+'#'+'?'
          }
          console.log(str3)
          console.log(str4)
          console.log(str5)
          jsonData.proj_name=str3
          jsonData.proj_link=str4
          jsonData.proj_desc=str5
          fetch('http://127.0.0.1:8000/first_module/uskill/addskill/', {  // Enter your IP address here

      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
          window.location.href = "/register4"
      }
       handleChangeSkill = (selectedOptions) => {
           console.log(selectedOptions)
           this.setState({ selectedOptions :selectedOptions })
        }
        handleChangeOpenTo = (selectedOptions) => {
           console.log(selectedOptions)
           this.setState({ selectedOptions_2:selectedOptions })
        }
        handleChange(event) {
    let input = this.state.input;
    console.log(event.target.name);
    input[event.target.name] = event.target.value;


    this.setState({
      input
    });
  }
    render() {

        return(<React.Fragment>
            <Navb/>
            <div >
                <br/><br/>
                <ul className="list-unstyled multi-steps">
                    <li >Step 1</li>
                    <li className="is-active"><b style={{
                        color:"green"
                    }}>Step 2</b></li>
                    <li >Step 3</li>
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
               <div className="col-sm-6">
          <div className="form-group">
            <InputLabel for="name">Salary:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
            <input
              type="number"
              name="sal"

              className="form-control"
              placeholder="Enter Salary in BDT"
              onChange={this.handleChange}
              id="sal" required/>

          </div>
             </div>
             <div className="col-sm-6">
                 <div className="form-group">
                     <InputLabel for="deadline">Deadline Date:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                     <input
                         type="text"
                         name="dead"
                         className="form-control"
                         placeholder="Enter Deadline Date"
                         onFocus={this.onFocusHandle}
                         onBlur={this.onBlurHandle}
                         onChange={this.handleChange}
                         id="dead" required/>


                 </div>
             </div>

            </div>
            <div className="row" style={{
             marginBottom:5
         }}>
                <div className="col-sm-6">
                 <div className="form-group">
            <InputLabel for="name">Required Experience:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
            <input
              type="number"
              name="exp"

              className="form-control"
              placeholder="Enter Required Experience in Years"
              onChange={this.handleChange}
              id="exp" required/>

             </div>
              </div>
                <div className="col-sm-6">
                 <div className="form-group">
            <InputLabel for="name">Vacancies:</InputLabel>
            <input
              type="number"
              name="vac"

              className="form-control"
              placeholder="Enter Number of Vacancies"
              onChange={this.handleChange}
              id="vac"/>

          </div>
                    </div>

            </div>
                     <div className="row" style={{
             marginBottom:5
         }}>

                    <div className="form-group" >
                        <InputLabel htmlFor="proj_desc">Job Responsibilities</InputLabel>
                        <textarea
                            name="job_res"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Write Something About Job responsibilities"
                            id="job_res"/>

                  </div>
                </div>


                    <div className="row btn-group-justified" style={{
                        width:"120%"
                    }} >
                        <button className="btn btn-success sub_btn_job1" >Next</button>
                </div>

        </form>
            </div>
            </Animated>
            <Foot margin_value={172}/>
        </React.Fragment>)
    }
}
export default Job_2;