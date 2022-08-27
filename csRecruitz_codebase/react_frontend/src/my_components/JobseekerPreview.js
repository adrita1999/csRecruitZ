import React, {Component} from "react";
import Navb from "./Navb";
import './registration.css';
import {InputLabel, ToggleButton, ToggleButtonGroup} from "@mui/material";
import Select from "react-select";
import Foot from "./Foot";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TypeAnimation from 'react-type-animation';

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
import Loader from "./loader";
import {ImCross} from "react-icons/im";
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
const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p:4,
  backdrop:false,
  paddingTop:'10px',
  paddingBottom:'10px',
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
        items: [],
        projects:[],
        exps:[],
        pubs:[],
        lics:[],
        skills:[],
        resume:"",
        extras:"",
        extras_array:[],
        extras_name:[],
        DataisLoaded:false,
        DetailsLoaded4:false,
        input: {},
        errors: {},
        redirect:false,
        signinopen:false,
        editnopen:false,
        pdfpath:"",
    };



    this.handleChange = this.handleChange.bind(this);
    this.handleClose=this.handleClose.bind(this);
    this.handleClose2=this.handleClose2.bind(this);
    this.handleChangeDropGen=this.handleChangeDropGen.bind(this);
    this.handleChangeDropDiv=this.handleChangeDropDiv.bind(this);
    this.handleChangeDropNat=this.handleChangeDropNat.bind(this);
    this.handleChangeDropOrg=this.handleChangeDropOrg.bind(this);
    this.handleChangeDropField=this.handleChangeDropField.bind(this);
    this.SubmitAppli=this.SubmitAppli.bind(this);
    this.SubmitEdit=this.SubmitEdit.bind(this);
  }
componentDidMount() {
        console.log("mount hoise")

    // storage.ref("pdfs/temp.pdf").getDownloadURL().then(url=>{
    //       console.log(url);
    //       this.setState({pdfpath:url});
    //     })
    fetch(
            "http://127.0.0.1:8000/first_module/jobseeker/get_id/",{
            method:"GET"
                })
                .then((res) => res.json())
                .then((json) => {

                    this.setState({items: json.data,
                                    DataisLoaded: true
                                })
                    console.log(this.state)
                    // console.log(json.data);
                    console.log(json.response);

                })
          fetch(
            "http://127.0.0.1:8000/first_module/apply/get_app_info")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    projects: json.data,
                    pubs:json.data_1,
                    lics:json.data_2,
                    exps:json.data_3,
                    skills:json.data_4,
                    resume:json.resume,
                    extras:json.extras,
                    DetailsLoaded4:true
                });
                console.log(json)
                let temp=[]
                temp=json.extras.split(" ")
                temp.shift()
                console.log(temp)
                let name_arrray=[]
                for(let i=0;i<temp.length;i++) {
                    var file_name=storage.refFromURL(temp[i])
                    console.log(file_name.name)
                    name_arrray.push(file_name.name)
                }

                this.setState({extras_array:temp})
                this.setState({extras_name:name_arrray})

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
  SubmitEdit(event) {
        this.setState({editopen: true});
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


  handleClose() {
      this.setState({'signinopen':false})
      console.log(this.state.signinopen)
      }
      handleClose2() {
        this.setState({'editopen':false})
      }
      handleClickYes() {
        window.location.href="/"
      }




  render() {
         if (!this.state.DataisLoaded || !this.state.DetailsLoaded4) return <Loader/>
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
            <b>Name:</b>  {this.state.items.name}
          </div>
             </div>
             <div className="col-sm-6">
                 <b>Age:</b>  {this.state.items.age} years

             </div>
         </div>
            <div className="row" style={{
             marginBottom:5
         }}>
            <div className="col-sm-6">
            <b>Contact No:</b>  {this.state.items.contact_no}

            </div>
            <div className="col-sm-6">
            <b>Email Address:</b>  {this.state.items.email}

            </div>
                </div>
            <div className="row" style={{
             marginBottom:5
         }}>
            <div className="col-sm-6">
            <b>District:</b>  {this.state.items.district}

            </div>
            <div className="col-sm-6">
            <b>Division:</b>  {this.state.items.division}

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
            <b>Field of Work:</b>  {this.state.items.field}
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
            {this.state.exps.map((row) => (
            <StyledTableRow >
              <StyledTableCell component="th" scope="row" align="center">
                  {row.experience_name}
              </StyledTableCell>
                <StyledTableCell align="center">{row.organization_name}</StyledTableCell>
                <StyledTableCell align="center">{row.from_year}</StyledTableCell>
                <StyledTableCell align="center">{row.to_year}</StyledTableCell>


          {/*<StyledTableCell align="right"><button className="btn btn-sm btn-success">Delete</button></StyledTableCell>*/}

            </StyledTableRow>
                ))}


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
                      {
                          this.state.extras_array.map((links,i)=>(
                          <li><GrAttachment/> <a href={links} target="_blank">{this.state.extras_name[i]}</a></li>
                          ))
                      }
                  </ul>
              </div>
          </div>
          <div className="row" style={{
             marginBottom:5
          }}>
              <b>Submitted Resume:</b>
              {!this.state.resume === null &&
                  <div>
                      <ul style={{
                          listStyle: "None"
                      }}>
                          <li><GrAttachment/> <a href={this.state.resume} target="_blank">Resume.pdf</a></li>
                      </ul>
                  </div>
              }
          </div>
          <div className="row" style={{
             marginBottom:5
          }}>
              <b>Verified Skills:</b>
              <div>
                  <ul style={{
                      listStyle:"None"
                  }}>
                      {
                            this.state.skills.map((sk) => {
                                return(
                                <li>< TiTick size={'1.5em'} color="green"/>  {sk.skill_name}</li>
                                )})
                      }
                  </ul>
              </div>
          </div>
          <div className="row" style={{
             marginBottom:5
          }}>
              <b>Highlighted Projects:</b>
              <ul className="hprojlist">
                  {
                            this.state.projects.map((proj) => {
                                return(
                                <li><b><HiExternalLink size={'1.5em'}/><a href={proj.project_link}
                                                                 style={{marginLeft: 2}}>{proj.project_name}</a></b>
                          <small><br/>{proj.language}</small>
                          <br/>{proj.project_short_desc}
                      </li>
                                )})
                            }

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
                  {
                            this.state.pubs.map((pub) => {
                                return(
                                <li><b><a href={pub.publication_link}
                   style={{marginLeft: 2}}>{pub.publication_name}</a></b>  , {pub.venue}, {pub.publication_year}
                  </li>
                                )})
                            }



              </ul>
              </div>
          </div>
          <div className="row" style={{
             marginBottom:5
          }}>
              <b>Highlighted Licenses and Certificates:</b>

              <ul className="hliclist">
                         {
                            this.state.lics.map((lic) => {
                                return(
                                <li><b>{lic.certificate_name}</b>
                                <a href={lic.certificate_link} className="cred_tag_2" target="_blank">View Credential</a>
                                <small><br/>{lic.issuing_org}</small>
                                </li>
                                )})
                            }
              </ul>

          </div>

            <div className="row" style={{
             marginBottom:5
         }}>
                <button className="btn btn-success edit_btn" onClick={this.SubmitEdit} >Edit Information</button>
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
        <Modal
        open={this.state.editopen}
        onClose={this.handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{background:"rgba(0,0,0,0)"}}
      >
        <Box sx={style2}>
            {/* <p className="seems-h1_reg"><b> Change Your Information</b></p> */}
                <div className="row" style={{
                    marginBottom:15
                }}>
                    <p className="seems-h1_reg" style={{marginBottom:"5px" }}><b> Edit Application Requirements </b></p>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px", marginBottom:"10px" }}  for="name">Select Projects that you want to highlight:</InputLabel>
                            <Select name="proj" id="proj" styles={dropDownStyle} options={this.state.proj_options} onChange={this.handleChangeDropProj} placeholder="Enter Projects" isMulti openMenuOnFocus isClearable />
                        </div>
                    </div>

                </div>
               <div className="row" style={{
                    marginBottom:15
                }}>

                    <div className="col-sm-12">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px", marginBottom:"10px" }}  for="name">Select Publications that you want to highlight:</InputLabel>
                            <Select name="pub" id="pub" styles={dropDownStyle} options={this.state.pub_options} onChange={this.handleChangeDropPub} placeholder="Enter Publications"  isMulti openMenuOnFocus isClearable />
                        </div>
                    </div>

                </div>
            <div className="row" style={{
                    marginBottom:15
                }}>

                    <div className="col-sm-12">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px", marginBottom:"10px" }}  for="name">Select Credentials that you want to highlight:</InputLabel>
                            <Select name="lic" id="lic" styles={dropDownStyle} options={this.state.lic_options} onChange={this.handleChangeDropLic} placeholder="Enter Credentials" isMulti openMenuOnFocus isClearable />
                        </div>
                    </div>

                </div>
            <div className="row" style={{
                    marginBottom:15
                }}>

                    <div className="col-sm-12">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px", marginBottom:"10px" }}>Add necessary credentials for application (pdf only)</InputLabel>
                        <input
                            type="file"
                            name="extra_file"
                            onChange={this.handleChangeFile}
                            className="form-control"
                            placeholder="Upload Credentials"
                            id="extra_file"/>
                        </div>
                        {/*{this.state.file_array.map((files,index) => {*/}

                        {/*        { if(index===0) return(*/}
                        {/*        <div style={{marginTop:10}}><div><a href={files.link} target="_blank">{files.name}</a></div><button className="clear_btn" onClick={this.ClearAll}><ImCross className="cross"/>Clear All</button></div>*/}
                        {/*            )*/}
                        {/*        }*/}
                        {/*    { if(index!==0) return(*/}
                        {/*        <div style={{marginTop:10}}><a href={files.link} target="_blank">{files.name}</a></div>*/}
                        {/*            )*/}
                        {/*    }*/}

                        {/*})*/}

                        {/*}*/}
                    </div>

                </div>
             <div className="row" style={{
                    marginBottom:15
                }}>

                    <div className="col-sm-12">
                        <div className="form-group">
                            <InputLabel style={{color:"black" ,fontWeight:"Bold", fontSize:"15px", marginBottom:"10px" }}>Add Resume (pdf only)</InputLabel>
                        <input
                            type="file"
                            name="cv"
                            onChange={this.handleChangeResume}
                            className="form-control"
                            placeholder="Upload Resume"

                            id="cv"/>
                        </div>
                        {/*{this.state.res_array.map((files,index) => {*/}

                        {/*        { if(index===0) return(*/}
                        {/*            <div style={{marginTop:10}}><div><a href={files.link} target="_blank">{files.name}</a></div><button className="clear_btn" onClick={this.ClearResume}><ImCross className="cross"/>Clear</button></div>*/}
                        {/*            )*/}
                        {/*        }*/}
                        {/*    { if(index!==0) return(*/}
                        {/*        <div style={{marginTop:10}}><a href={files.link} target="_blank">{files.name}</a></div>*/}
                        {/*            )*/}
                        {/*    }*/}

                        {/*})*/}

                        {/*}*/}
                    </div>

                </div>

                <button className='btn btn-success' style={{marginTop:"5px",width:"20%",marginRight:"-2px", marginBottom:"10px"}} onClick={this.handleClickApply}>Submit</button>

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
