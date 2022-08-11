import React, {Component} from "react";
import Navb from "./Navb";
import './registration.css';
import Foot from "./Foot";
import {MdOutlineAdd} from 'react-icons/md';
import {Animated} from "react-animated-css";
import Select from "react-select";
import {InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
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
class Register_4 extends Component {
    constructor() {
        super();
        this.state = {

            numDivs: 0,
            numDivs_2:0
        };
    }
    handleClickSkip() {
       window.location.href="/"
      }
      handleSubmit(event) {
          event.preventDefault();
          window.location.href = "/"
      }
    render() {

        return(<React.Fragment>
            <Navb/>
            <div >
                <br/><br/>
                <ul className="list-unstyled multi-steps">
                    <li >Experiences</li>
                    <li>Skills and Projects</li>
                    <li className="is-active"><b style={{
                        color:"green"
                    }}>Publications and Licenses</b></li>
                </ul>
            </div>
            <Animated animationIn="slideInLeft"  animationInDuration={2000}  isVisible={true}>
            <div className="content_reg_2">
                <p className="seems-h1_reg"><b> Add Your Publications and Certificates</b></p>
                <p style={{
              fontSize:18,

              fontWeight:"bold",
                    marginRight:-20


                }}>Publications<p className="btn add_btn_3" onClick={() => { this.setState({numDivs: this.state.numDivs+1}); }}><MdOutlineAdd size={'1.3em'}/>Add More</p></p>

          <hr/>
                 <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-sm-6">
                    <div className="form-group">
                 <InputLabel for="pub_name">Publication Name</InputLabel>

                 <input
                     type="text"
                     name="pub_name"

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Your Publication's Name"
                     id="pub_name" required/>
             </div>
                    </div>
                    <div className="col-sm-6">
                 <div className="form-group">
                 <InputLabel for="pubs">Publication Link</InputLabel>

                 <input
                     type="url"
                     name="pubs"

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Your Publication's Link"
                     id="pubs" required/>
             </div>
                    </div>

            </div>
                     {new Array(this.state.numDivs).fill(0).map((item, index) => (
        <div>
            <hr/>
            <div className="row">
                    <div className="col-sm-6">
                    <div className="form-group">
                 <InputLabel for="pub_name">Publication Name</InputLabel>

                 <input
                     type="text"
                     name="pub_name"

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Your Publication's Name"
                     id="pub_name" required/>
             </div>
                    </div>
                    <div className="col-sm-6">
                 <div className="form-group">
                 <InputLabel for="pubs">Publication Link</InputLabel>

                 <input
                     type="url"
                     name="pubs"

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Your Publication's Link"
                     id="pubs" required/>
             </div>
                    </div>

            </div>
        </div>

    ))
}


                <p style={{
                    marginTop:30,
              fontSize:18,

              fontWeight:"bold",
                    marginRight:-20

          }}>License And Certificates <p className="btn add_btn_3" onClick={() => { this.setState({numDivs_2: this.state.numDivs_2+1}); }}><MdOutlineAdd size={'1.3em'}/>Add More</p></p>

          <hr/>

                    <div className="row">
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="lic_name">License Name:</InputLabel>
                 <input
                     type="text"
                     name="lic_name"

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Your License's Name"
                     id="lic_name" required/>

             </div>
                  </div>
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="lic_org">Issuing Organization:</InputLabel>
                 <input
                     type="text"
                     name="lic-org"

                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Issuing Organization's Name"
                     id="lic_org" />

             </div>
                  </div>

             </div>

            <div className="row">

                    <div className="form-group" >
                        <InputLabel htmlFor="lic_file">Credential File</InputLabel>
                        <input
                            type="file"
                            name="lic_file"
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Upload Credential"
                            id="lic_file"/>

                  </div>
                </div>
                    {
    new Array(this.state.numDivs_2).fill(0).map((item, index) => (
        <div>
            <hr/>

                    <div className="row">
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="lic_name">License Name:</InputLabel>
                 <input
                     type="text"
                     name="lic_name"

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Your License's Name"
                     id="lic_name" required/>

             </div>
                  </div>
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="lic_org">Issuing Organization:</InputLabel>
                 <input
                     type="text"
                     name="lic-org"

                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Issuing Organization's Name"
                     id="lic_org" />

             </div>
                  </div>

             </div>

            <div className="row">

                    <div className="form-group" >
                        <InputLabel htmlFor="lic_file">Credential File</InputLabel>
                        <input
                            type="file"
                            name="lic_file"

                            className="form-control"
                            placeholder="Upload Credential"
                            id="lic_file"/>

                  </div>
                </div>

                        </div>

    ))
}
                    <div className="row btn-group-justified" style={{
                        width:"120%"
                    }} >
                        <button className="btn btn-danger skip_btn" onClick={this.handleClickSkip}>Skip</button>
                        <input type="submit" value="Finish" className="btn btn-success sub_btn_2"  />
                </div>

        </form>
            </div>
            </Animated>
            <Foot margin_value={172}/>
        </React.Fragment>)
    }
}
export default Register_4;