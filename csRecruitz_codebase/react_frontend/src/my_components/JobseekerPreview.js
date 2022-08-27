import React, {Component} from "react";
import Navb from "./Navb";
import './registration.css';
import {InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Select from "react-select";
import Foot from "./Foot";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {TypeAnimation} from 'react-type-animation';

import {GrAttachment} from 'react-icons/gr';
import {FaMedal} from 'react-icons/fa';

import {GiRibbonMedal} from 'react-icons/gi';
import {storage} from "./Firebase";

import { ref, uploadBytes } from "firebase/storage";
import Form from "react-bootstrap/Form";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {RiDeleteBin6Line} from "react-icons/ri";

import {FaRegHandPointer} from "react-icons/fa";
import {TiTick} from "react-icons/ti";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {HiExternalLink} from "react-icons/hi";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p:4,
  backdrop:false,
  show:true,
    borderRadius:5,
    border:0,
    overflow:'hidden'
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3C1173",
    color: theme.palette.common.white,
      fontSize: 15,
      fontWeight: "bold",
      border:1,
      padding:5
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
      padding:5

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#E5E4E2",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
var jsonData = {
    "name":"",
    "password":"",
    "email":"",
    "dob":"",
    "gender":"",
    "mob":"",
    "nid":"",
    "nat":"",
    "father":"",
    "mother":"",
    "desc":"",
    "street":"",
    "thana":"",
    "dis":"",
    "div":"",
    "field":"",
    "pref_org":"",
    "pref_nat":"",
    "pref_sal":""
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
class JobseekerPreview extends  Component {
    constructor() {
    super();
    this.state = {
      input: {},
      errors: {},
        redirect:false,
        signinopen:false,
        pdfpath:"",
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.handleChangeDropGen=this.handleChangeDropGen.bind(this);
    this.handleChangeDropDiv=this.handleChangeDropDiv.bind(this);
    this.handleChangeDropNat=this.handleChangeDropNat.bind(this);
    this.handleChangeDropOrg=this.handleChangeDropOrg.bind(this);
    this.handleChangeDropField=this.handleChangeDropField.bind(this);
    this.SubmitAppli=this.SubmitAppli.bind(this);
  }
componentDidMount() {
        console.log("mount hoise")

    storage.ref("pdfs/temp.pdf").getDownloadURL().then(url=>{
          console.log(url);
          this.setState({pdfpath:url});
        })
    }
handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;


    this.setState({
      input
    });
  }
  SubmitAppli(event) {
        this.setState({signinopen: true});
  }
  handleChangeDropGen = (event) => {
        let input = this.state.input;

        console.log(event.value);
        input["gen"]=event.value;
        this.setState({
      input
    });

  }
  handleChangeDropDiv = (event) => {
        let input = this.state.input;
        //console.log("heree");

        console.log(event.value);
        input["div"]=event.value;
        this.setState({
      input
    });

  }
  handleChangeDropNat = (event) => {
        let input = this.state.input;

        console.log(event.value);
        input["pref_nat"]=event.value;
        this.setState({
      input
    });

  }
  handleChangeDropOrg = (event) => {
        let input = this.state.input;

        console.log(event.value);
        input["pref_org"]=event.value;
        this.setState({
      input
    });

  }
  handleChangeDropField = (event) => {
        let input = this.state.input;

        console.log(event.value);
        input["field"]=event.value;
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
  handleClose() {
      this.setState({'signinopen':false})
      console.log(this.state.signinopen)
      }
      handleClickNotnow() {

      }
      handleClickYes() {
        window.location.href="/"
      }
  handleSubmit(event) {
    event.preventDefault();
    console.log("geree");

    if(this.validate()){

        console.log(this.state);
        if(this.state.input["name"]) {
            jsonData.name=this.state.input["name"];
        }
        if(this.state.input["email"]) {
            jsonData.email = this.state.input["email"];
        }
        jsonData.password=this.state.input["password"];
        jsonData.dob=this.state.input["dob"];
        if(this.state.input["gen"]) {
            jsonData.gender = this.state.input["gen"];
        }
        jsonData.mob=this.state.input["mob"];
        jsonData.nid=this.state.input["nid"];
        jsonData.nat=this.state.input["nat"];
        if(this.state.input["father"]) {
            jsonData.father = this.state.input["father"];
        }
        if(this.state.input["mother"]) {
            jsonData.mother = this.state.input["mother"];
        }
        if(this.state.input["about"]) {
            jsonData.desc = this.state.input["about"];
        }
        if(this.state.input["street"]) {
            jsonData.street = this.state.input["street"];
        }
        if(this.state.input["thana"]) {
            jsonData.thana=this.state.input["thana"];
        }
        if(this.state.input["dis"]) {
            jsonData.dis = this.state.input["dis"];
        }
        jsonData.div=this.state.input["div"];
        jsonData.field=this.state.input["field"];
        if(this.state.input["pref_org"]) {
            jsonData.pref_org = this.state.input["pref_org"];
        }
        if(this.state.input["pref_nat"]) {
            jsonData.pref_nat = this.state.input["pref_nat"];
        }
        if(this.state.input["pref_sal"]) {
            jsonData.pref_sal=this.state.input["pref_sal"];
        }


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
    this.setState({'redirect':true});
    this.setState({signinopen: true});


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
            <body className="prev_body">
      <div className="content_reg_prev">
          <p className="seems-h1_reg"><b> Your Application Preview</b></p>
          <p style={{
              fontSize:18,
              marginBottom:-10,
              fontWeight:"bold"
          }}>Personal Information</p>
          <hr/>

         <div className="row" style={{
             marginBottom:5
         }}>
             <div className="col-sm-6">
          <div className="form-group">
            <b>Name:</b>  Adrita Hossain Nakshi
          </div>
             </div>
             <div className="col-sm-6">
                 <b>Age:</b>  23 Years

             </div>
         </div>
            <div className="row" style={{
             marginBottom:5
         }}>
            <div className="col-sm-6">
            <b>Contact No:</b>  01521226945

            </div>
            <div className="col-sm-6">
            <b>Email Address:</b>  queendristi27@gmail.com

            </div>
                </div>
            <div className="row" style={{
             marginBottom:5
         }}>
            <div className="col-sm-6">
            <b>District:</b>  Narayanganj

            </div>
            <div className="col-sm-6">
            <b>Division:</b>  Dhaka

            </div>
                </div>

            <p></p>
                <p style={{
              fontSize:18,
              fontWeight:"bold",
                    marginBottom:-8
          }}>Professional Information</p>
          <hr/>
            <div className="row" style={{
             marginBottom:5
         }}>
            <div className="col-sm-12">
            <b>Field of Work:</b>  Research and Development
            </div>

                </div>
            <div className="row" style={{
             marginBottom:5
         }}>
            <div className="col-sm-12">
            <b>Job Experiences:</b>
                <div className="tablediv_2">
             <TableContainer component={Paper} style={{boxShadow:"rgba(0, 0, 0, 0.25) 0px 2px 8px"}}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Designation</StyledTableCell>
            <StyledTableCell align="center">Employer</StyledTableCell>
              <StyledTableCell align="center">From Year</StyledTableCell>
              <StyledTableCell align="center">To Year</StyledTableCell>


          </TableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row" align="center">
                  baaal
              </StyledTableCell>
                <StyledTableCell align="center">Exp name</StyledTableCell>
                <StyledTableCell align="center">bal</StyledTableCell>
                <StyledTableCell align="center">bal</StyledTableCell>


          {/*<StyledTableCell align="right"><button className="btn btn-sm btn-success">Delete</button></StyledTableCell>*/}

            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row" align="center">
                  baaal
              </StyledTableCell>
                <StyledTableCell align="center">Exp name</StyledTableCell>
                <StyledTableCell align="center">bal</StyledTableCell>
                <StyledTableCell align="center">bal</StyledTableCell>


          {/*<StyledTableCell align="right"><button className="btn btn-sm btn-success">Delete</button></StyledTableCell>*/}

            </StyledTableRow>

        </TableBody>
      </Table>
    </TableContainer>
                    </div>
            </div>

                </div>
          <div className="row" style={{
             marginBottom:5
          }}>
              <b>Attachments:</b>
              <div>
                  <ul style={{
                      listStyle:"None"
                  }}>
                      <li><GrAttachment/> <a href="./temp.pdf" target="_blank">temp.pdf</a></li>
                      <li><GrAttachment/> <a href="./temp.pdf" target="_blank">temp.pdf</a></li>
                      <li><GrAttachment/> <a href="./temp.pdf" target="_blank">temp.pdf</a></li>
                  </ul>
              </div>
          </div>
          <div className="row" style={{
             marginBottom:5
          }}>
              <b>Verified Skills:</b>
              <div>
                  <ul style={{
                      listStyle:"None"
                  }}>
                      <li>< TiTick size={'1.5em'} color="green"/>  Python</li>
                      <li>< TiTick size={'1.5em'} color="green"/>  Python</li>
                      <li>< TiTick size={'1.5em'} color="green"/>  Python</li>

                  </ul>
              </div>
          </div>
          <div className="row" style={{
             marginBottom:5
          }}>
              <b>Highlighted Projects:</b>
              <ul className="hprojlist">
                  <li><b><HiExternalLink size={'1.5em'}/><a href="/"
                   style={{marginLeft: 2}}>Istishon</a></b>
                      <small><br/>Language and FrameWork</small>
                  <br/>Proj Desc
                  </li>
                  <li><b><HiExternalLink size={'1.5em'}/><a href="/"
                   style={{marginLeft: 2}}>CsRecruitZ</a></b>
                      <small><br/>Language and FrameWork</small>
                  <br/>Proj Desc
                  </li>

              </ul>
          </div>
          <div className="row" style={{
             marginBottom:5
          }}>
              <b>Highlighted Publications:</b>
              <div>
              <ul style={{
                  listStyle:"square"
              }}>
                  <li><b><a href="/"
                   style={{marginLeft: 2}}>SentiCR:An approach to  baal</a></b>  , IEEE Conference, 12/11/2018
                  </li>
                  <li><b><a href="/"
                   style={{marginLeft: 2}}>SentiCR:An approach to  baal</a></b>  , IEEE Conference, 12/11/2018
                  </li>

              </ul>
              </div>
          </div>
          <div className="row" style={{
             marginBottom:5
          }}>
              <b>Highlighted Licenses and Certificates:</b>

              <ul className="hliclist">
                  <li><b>IBM certi</b>
                    <a href="/" className="cred_tag_2" target="_blank">View Credential</a>
                    <small><br/>Coursera</small></li>
              </ul>

          </div>

            <div className="row" style={{
             marginBottom:5
         }}>
                <button className="btn btn-success edit_btn" >Edit Information</button>
            <button className="btn btn-success sub_btn" onClick={this.SubmitAppli} >Submit Application</button>
                </div>


      </div>
                 <div>
      <Modal
        open={this.state.signinopen}
        onClose={this.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{background:"rgba(0,0,0,0)"}}
      >
        <Box sx={style}>
            <div style={{display:"inline",position:'absolute',width:'49%'}}>
                <Typography id="modal-modal-title" variant="h5" component="h2" style={{color:"#410390",fontWeight:"bold",paddingTop:'3px'}}>

              </Typography>
            </div>


            <svg className="svg_class" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                <g stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round"
                   stroke-linejoin="round">
                    <path className="circle"
                          d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"/>
                    <path className="tick" d="M6.5 13.5L10 17 l8.808621-8.308621"/>
                </g>
            </svg>
            <div style={{marginLeft:60}}>
            <TypeAnimation
                cursor={true}
                sequence={['Your application has been submitted', 2000,'']}
                wrapper="h6"
                repeat={Infinity}

            />
                </div>

            <div style={{height:'auto',marginTop:"50px",background:"green",marginLeft:"-33px",marginRight:'-33px',marginBottom:'-43px',paddingLeft:'20px',paddingTop:'3px',paddingBottom:'12px',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>

                <button style={{marginTop:"30px",width:'80%',height:'40px',marginLeft:'8%',marginBottom:'30px',background:'#FFFFFF',border:0,borderRadius:5,color:'#410390',fontWeight:'bold'}} onClick={this.handleClickYes}>Back To Home</button>

            </div>

        </Box>
      </Modal>
    </div>
            </body>
            <Foot margin_value={0}/>
            </React.Fragment>
    );
  }

}
export default JobseekerPreview;
