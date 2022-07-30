import React, {Component} from "react";
import {Animated} from "react-animated-css";
import './Personal.css';
import {AiFillEdit} from 'react-icons/ai'
import pic from './images/pp.JPG'
import TypeAnimation from 'react-type-animation';


import Sidebar from "./Sidebar";
import Navb from "./Navb";
import Foot from "./Foot";
import Loader from "./loader";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import Form from "react-bootstrap/Form";
import InputLabel from "@mui/material/InputLabel";

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

class Personal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded:false,
            editopen:false,
        };
        this.handleClose=this.handleClose.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }
    componentDidMount() {
        fetch(
            "http://127.0.0.1:8000/first_module/jobseeker/")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
                console.log(this.state)
            })
    
    }

    handleClose() {
      //this.setState({editopen:false})
      }

    handleClick() {
        //this.setState({editopen: true})
   }
    handleSubmitEdit() {
       // console.log("edited")
   }
      
    render() {
        const { DataisLoaded, items } = this.state;
        if (!this.state.DataisLoaded) return <Loader/>
        return (
            <React.Fragment>
            <body>
           <Navb/>

            <Sidebar/>
            <div className="content">
                <div className="row_custom">
                    <div className="personal_div_bg2">
                <div className="row" style={{
                    display:"flex",
                    flexFlow:"row"
                }}>
                {
                    items.map((item) => {
                    return(
                        <img  src="/nakshi.jpg" alt="Profile Pic" style={{
                            height:120,
                            width:140,
                            borderRadius:"50%"
                        }}/>
                    )})
                 }

                    <div style ={{
                    display:"inline-block",
                        marginTop:30
                    }}>
                    {
                        items.map((item) => {
                    return(
                        <p style={{
                            fontSize:24
                        }}><b>{item.name}</b></p>
                        )})
                    }
                <TypeAnimation
                cursor={true}
                sequence={['Research and Development Engineer', 2000, 'Skilled in Cpp, Java and more ',2000,'10 years of work experience',2000,'']}
                wrapper="h6"
                repeat={Infinity}/>
                </div>
                </div>
                    </div>
                    </div>
                <div className="row_custom"> <h3>About Me:</h3></div>

                <Animated animationIn="slideInUp"  animationInDuration={1800}  isVisible={true}>
                <div>
                <div className="row_custom ">

                <div className="personal_div_bg ">
                    {
                        items.map((item) => {
                    return(
                    <p>{item.self_desc}</p>
                        )})
                    }
                </div>


                    <div className="row" style={{
                        marginTop:20
                    }}>
                        <h3>Personal Information:</h3></div>

                    </div>
                 <div className="row_custom ">
                     <div className="personal_div_bg ">
                  <div className="row">
                        <div className="col-sm-6">
                            <b className= "seems-h1">Name</b>
                            {
                                items.map((item) => {
                                return(
                                    <p>{item.name}</p>
                                )})
                            }
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">Age</b>
                            {
                                items.map((item) => {
                                return(
                                    <p>{item.age} years</p>
                                )})
                            }
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">Father's Name</b>
                            {
                                items.map((item) => {
                                return(
                                    <p>{item.father_name}</p>
                                )})
                            }
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">Mother's Name: </b>
                            {
                                items.map((item) => {
                                return(
                                    <p>{item.mother_name}</p>
                                )})
                            }
                        </div>
                        <div className="col-sm-6">
                           <b className= "seems-h1">Date of Birth: </b>
                           {
                                items.map((item) => {
                                return(
                                    <p>{item.date_of_birth}</p>
                                )})
                            }
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">Gender</b>
                            {
                                items.map((item) => {
                                return(
                                    <p>Female</p>
                                )})
                            }
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">Nationality</b>
                            {
                                items.map((item) => {
                                return(
                                    <p>{item.nationality}</p>
                                )})
                            }
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">NID number</b>
                            {
                                items.map((item) => {
                                return(
                                    <p>{item.nid_number}</p>
                                )})
                            }
                        </div>
                    <div className="col-sm-6">
                            <b className= "seems-h1">Mobile number</b>
                            {
                                items.map((item) => {
                                return(
                                    <p>01878046439</p>
                                )})
                            }

                        </div>
                    <div className="col-sm-6">
                            <b className= "seems-h1">Email Address</b>
                            {
                                items.map((item) => {
                                return(
                                    <p>{item.email}</p>
                                )})
                            }
                        </div>
                    </div>
                </div>
                     </div>
                <div className="row_custom ">
                <div className="row">
                    <h4>Address Information:</h4>
                </div>
                </div>
                <div className="row_custom ">
                    <div className="personal_div_bg ">
                <div className="row">
                        <div className="col-sm-6">
                            <b className= "seems-h1">Street/Road</b>
                            {
                                items.map((item) => {
                                return(
                                    <p>Kadirganj Rd</p>
                                )})
                            }
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">Thana</b>
                            {
                                items.map((item) => {
                                return(
                                    <p>{item.thana}</p>
                                )})
                            }
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">District</b>
                            {
                                items.map((item) => {
                                return(
                                    <p>{item.district}</p>
                                )})
                            }
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">Division</b>
                            {
                                items.map((item) => {
                                return(
                                    <p>{item.division}</p>
                                )})
                            }
                        </div>
                </div>
                </div>
                </div>


                <div className="row">
                    <div className="row_custom">
                <button className="custom_btn" onClick={this.handleClick}><AiFillEdit/> Edit Information</button>
                    </div>

            </div>

            </div>
                </Animated>
            </div>



            <Foot margin_value={172}/>

            </body>
                </React.Fragment>
        )
    }
}

export default Personal;

// <div>
//       <Modal
//         open={this.state.editopen}
//         onClose={this.handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         style={{background:"rgba(0,0,0,0)"}}
//       >
//         <Box sx={style}>
//             <div style={{display:"inline",position:'absolute',width:'49%'}}>
//                 <Typography id="modal-modal-title" variant="h5" component="h2" style={{color:"#410390",fontWeight:"bold",paddingTop:'3px'}}>
//                 Edit Information
//               </Typography>
//             </div>
//             <div style={{display:"inline",position:'absolute',width:'49%',left:'54%'}}>
//             </div>
//
//
//             <Form style={{marginTop:'80px',marginBottom:'20px'}}>
//                 <InputLabel id="demo-simple-select-label" style={{fontSize:'14px'}}>Name</InputLabel>
//                 <input required={true} style={{width:'98%', padding:'7px',marginBottom:14,borderRadius:'5px',borderWidth:1}} type="text"  onChange={this.handleremail}></input>
//             </Form>
//
//             <div style={{display:"inline",position:'absolute',width:'49%'}}>
//             </div>
//             <div style={{display:"inline",position:'absolute',width:'49%',left:'47%'}}>
//                 <button className='btn btn-success' style={{marginTop:"6px",width:'45%'}} onClick={this.handleSubmitEdit}>Submit</button>
//             </div>
//             <div style={{height:"50px"}}>
//
//             </div>
//
//         </Box>
//       </Modal>
//     </div>