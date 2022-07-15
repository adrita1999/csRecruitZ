import React, {Component} from "react";
import {Animated} from "react-animated-css";
import './Personal.css';
import {AiFillEdit} from 'react-icons/ai'
import pic from './images/pp.JPG'
import TypeAnimation from 'react-type-animation';



import Sidebar from "./Sidebar";
import Navb from "./Navb";
import Foot from "./Foot";
class Personal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false
        };
    }
    componentDidMount() {
        fetch(
            "http://127.0.0.1:8000/jobseeker/")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })
    }
    render() {
        const { DataisLoaded, items } = this.state;
        // if (!DataisLoaded) return <div>
        //     <h1> Pleses wait some time.... </h1> </div> ;
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
                        <img  src={item.pro_pic} alt="Profile Pic" style={{
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
                    <p>Sea et gubergren justo invidunt at amet clita. Justo sit justo tempor et invidunt voluptua, lorem
                        voluptua ipsum gubergren et est nonumy magna et vero, sit eos dolor sea sed et dolor erat et.
                        Accusam accusam magna aliquyam eirmod amet est kasd dolore sanctus. Lorem ea vero lorem eos eos
                        sanctus labore. Aliquyam vero ipsum dolor duo clita consetetur stet, aliquyam ipsum sea sed et
                        magna amet dolor.</p>
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
                                    <p>{item.age}</p>
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
                                    <p>{item.gender}</p>
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
                            <b className= "seems-h1">Mobile number</b>{
                                items.map((item) => {
                                return(
                                    <p>{item.mobile}</p>
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
                                    <p>{item.street}</p>
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
                <button className="custom_btn"><AiFillEdit/> Edit Information</button>
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