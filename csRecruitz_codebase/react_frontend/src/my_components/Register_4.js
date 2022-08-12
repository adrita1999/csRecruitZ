import React, {Component} from "react";
import Navb from "./Navb";
import './registration.css';
import Foot from "./Foot";
import {MdOutlineAdd} from 'react-icons/md';
import {Animated} from "react-animated-css";
import Select from "react-select";
import {InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
var jsonData = {
    "pub_name": "",
    "pub_link": "",
    "lic_name": "",
    "lic_org": "",
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
class Register_4 extends Component {
    constructor() {
        super();
        this.state = {
            input: {},
            numDivs: 0,
            numDivs_2:0
        };
        this.handleSubmit =this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleClickSkip() {
       window.location.href="/"
      }
      handleSubmit(event) {
          event.preventDefault();
          var str1=this.state.input["pub_name_start"];
          var str2=""
          if(this.state.input["pub_link_start"]) {
              str2=this.state.input["pub_link_start"]
          }
          else str2="?"

          var str3=this.state.input["lic_name_start"];
          var str4=this.state.input["lic_org_start"];

          for(let i=0;i<this.state.numDivs;i++) {
              var ind1="pub_name_"+i;
              var ind2="pub_link_"+i;

              str1=str1+"#"+this.state.input[ind1]

              if(this.state.input[ind2]) {
                  str2 = str2 + " " + this.state.input[ind2]
              }
              else str2=str2+" "+'?'
          }
          for(let i=0;i<this.state.numDivs_2;i++) {
              var ind3="lic_name_"+i;
              var ind4="lic_org_"+i;

              str3=str3+"#"+this.state.input[ind3]
              str4=str4+"#"+this.state.input[ind4]


          }
          console.log(str1)
          console.log(str2)
          console.log(str3)
          console.log(str4)

          jsonData.pub_name=str1
          jsonData.pub_link=str2
          jsonData.lic_name=str3
          jsonData.lic_org=str4

          fetch('http://127.0.0.1:8000/first_module/pub/addpub/', {  // Enter your IP address here

      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
          window.location.href = "/"
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
                <div className="row" style={{
             marginBottom:5
         }}>
                    <div className="col-sm-6">
                    <div className="form-group">
                 <InputLabel for="pub_name">Publication Name:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>

                 <input
                     type="text"
                     name="pub_name_start"

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
                     name="pub_link_start"

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Your Publication's Link"
                     id="pubs"/>
             </div>
                    </div>

            </div>
                     {new Array(this.state.numDivs).fill(0).map((item, index) => (
        <div>
            <hr/>
            <div className="row" style={{
             marginBottom:5
         }}>
                    <div className="col-sm-6">
                    <div className="form-group">
                 <InputLabel for="pub_name">Publication Name:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>

                 <input
                     type="text"
                     name={"pub_name_"+index}

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
                     name={"pub_link_"+index}

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Your Publication's Link"
                     id="pubs"/>
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

                    <div className="row" style={{
             marginBottom:5
         }}>
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="lic_name">License Name:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                 <input
                     type="text"
                     name="lic_name_start"

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Your License's Name"
                     id="lic_name" required/>

             </div>
                  </div>
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="lic_org">Issuing Organization:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                 <input
                     type="text"
                     name="lic_org_start"

                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Issuing Organization's Name"
                     id="lic_org" required/>

             </div>
                  </div>

             </div>

            <div className="row" style={{
             marginBottom:5
         }}>

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

                    <div className="row" style={{
             marginBottom:5
         }}>
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="lic_name">License Name:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                 <input
                     type="text"
                     name={"lic_name_"+index}

                     onChange={this.handleChange}
                     className="form-control"
                      placeholder="Enter Your License's Name"
                     id="lic_name" required/>

             </div>
                  </div>
                  <div className="col-sm-6">
                 <div className="form-group">
                <InputLabel for="lic_org">Issuing Organization:<sup style={{
                color:"red",
                fontSize:16,
                lineHeight:0,
                top:-1.4,
                left:1
            }}>*</sup></InputLabel>
                 <input
                     type="text"
                     name={"lic_org_"+index}

                     onChange={this.handleChange}
                     className="form-control"
                     placeholder="Enter Issuing Organization's Name"
                     id="lic_org" required />

             </div>
                  </div>

             </div>

            <div className="row" style={{
             marginBottom:5
         }}>

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