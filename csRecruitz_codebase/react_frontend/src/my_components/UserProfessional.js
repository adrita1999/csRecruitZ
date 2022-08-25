import React, {Component} from "react";
import {Animated} from "react-animated-css";
import Sidebar from "./Sidebar";
import './Personal.css';
import {FiEdit2} from 'react-icons/fi';
import {FaArrowRight} from 'react-icons/fa';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import {MdFileDownloadDone} from 'react-icons/md';
import {HiExternalLink} from 'react-icons/hi';
import {BiLockAlt} from 'react-icons/bi';

import Navb from "./Navb";
import Foot from "./Foot";
import Loader from "./loader";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Select, { StylesConfig }  from 'react-select';
import {Button, Collapse} from 'react-bootstrap'

const dropDownStyle ={
    control: (base, state) => ({
    ...base,
        borderColor:'#000000',
        borderWidth:1,
        
        // position:'absolute',
        // This line disable the blue border
        boxShadow: state.isFocused ? 0 : 0,
        '&:hover': {
        borderColor: state.isFocused ? '#000000' : '#000000'}
    }),
   dropdownIndicator: (base, state) => ({
    ...base,
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
   })
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p:4,
    backdrop:false,
    paddingTop:'10px',
    paddingBottom:'10px',
    show:true,
      borderRadius:5,
      border:0,
      overflow: 'visible'
  };
  const CatOptions = [
    { value: 'Teaching', label: 'Teaching' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Security', label: 'Security' },
    { value: 'Research and Development', label: 'Research and Development' },
    { value: 'Programming', label: 'Programming' },
  ]
  const SkillOptions = [
    { value: 'Python', label: 'Python' },
    { value: 'C++', label: 'C++' },
    { value: 'Angular', label: 'Angular' },
    { value: 'Django', label: 'Django' },
    { value: 'Java', label: 'Java' }
    ]
var jsonData = {
    "field":"",
}
var jsonDataSkill = {
    "user_id":"",
    "jobseeker_skill_id":"",
    "skill_id":"",
    "skill_name":"",

}
class UserProfessional extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            skills:[],
            logged_in_id:0,
            DetailsLoaded1:false,
            DetailsLoaded2:false,
            DetailsLoaded3:false,
            DetailsLoaded4:false,
            DetailsLoaded5:false,
            DetailsLoaded6:false,
            field_of_work:false,
            experience:false,
            skill:false,
            project:false,
            cat: { value: '',label:'' },
            selectedOption: { value: '',label:'' },
            selectedOptions:[],

        };
       

    }
    handler = (event) => {
        const value = event.value
        console.log(value)
        this.state.cat.value=value
        this.state.cat.label=value
        jsonData.field=value
    }
    componentDidMount() {
        const id=1
        fetch(
            "http://127.0.0.1:8000/first_module/jobseeker/get_id/")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json.data,
                    DetailsLoaded1:true
                });
            console.log(json)
            // console.log(this.state)
            })
        fetch(
            "http://127.0.0.1:8000/first_module/jobexp/addexp/")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    exps: json.data,
                    DetailsLoaded2:true
                });
            // console.log(json)
            // console.log(this.state)
            })
        fetch(
            "http://127.0.0.1:8000/first_module/uskill/addskill")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    skills: json.data,
                    DetailsLoaded3:true
                });
             console.log(json)
            // console.log(this.state)
            })

        fetch(
            "http://127.0.0.1:8000/first_module/proj/get_proj")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    projects: json.data,
                    DetailsLoaded4:true
                });
            // console.log(json)
            // console.log(this.state)
            })
         fetch(
            "http://127.0.0.1:8000/first_module/pub/get_pub")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    pubs: json.data,
                    DetailsLoaded5:true
                });
            // console.log(json)
            // console.log(this.state)
            })
        fetch(
            "http://127.0.0.1:8000/first_module/lic/get_lic")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    lics: json.data,
                    DetailsLoaded6:true
                });
            // console.log(json)
            console.log(this.state)
            //  this.setState({logged_in_id:this.items.user_id})
            console.log(this.state.items.user_id)

            })
           
    }
    To_Quiz() {
        window.location.href="/quiz"
    }
    render() {
        if (!this.state.DetailsLoaded1 || !this.state.DetailsLoaded2 || !this.state.DetailsLoaded3 || !this.state.DetailsLoaded4 || !this.state.DetailsLoaded5 || !this.state.DetailsLoaded6) return <Loader/>
        return (
            <React.Fragment>
                <body>
                <Navb/>

                <div className="sidebar">
                    <a className={this.pathaname==='/userprofile'?"active":""} href="/userprofile" >Personal Information</a>
                    <a className={this.pathaname==='/userprofessional'?"active":""} href="/userprofessional" >Professional Information</a>
            </div>
                <div className="content">

                <div className="row" style={{
                    marginLeft:"-13.5%"
                }}> <h1>Professional Information:</h1></div>
                    <Animated animationIn="slideInUp"  animationInDuration={1800}  isVisible={true}>
                    <div>
               <div className="row_custom">
                    <div className="align">
                        <p><b className="seems-h1">Field of Work: </b>{this.state.items.field}</p>
                    </div>
                   </div>

                <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Job Experience:</h4>
                        </div>
                        <div className="container ">

                            <div className="row px-3" style={{
                                marginTop:-20
                            }}>

                                    <div className="border-left pt-2 pl-4 ml-2">
                                        {
                                            this.state.exps.map((exp) => {
                                            return(
                                                <div className="position-relative mb-4">
                                            <FaArrowRight size={'1.5em'} style={{color:'#29A335', marginLeft:-16, display:"inline"}}/>
                                            <b className="seems-h1" style={{marginLeft:20, display:"inline"}}>{exp.experience_name}</b>
                                            <p className="mb-2" style={{marginLeft:30,}}>{exp.organization_name} | <small>{exp.from_year} - {exp.to_year}</small></p>
                                            <p style={{marginLeft:30,}}>{exp.description}</p>

                                        </div>
                                            )})
                                         }

                                    </div>

                            </div>
                        </div>
                    </div>
                </div>
                    <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Skills:</h4>
                            </div>
                        <ol className="gradient-list" >
                            {
                                            this.state.skills.map((skill) => {
                                            return(
                                                <li><b style={{
                                                    fontSize:"large",
                                                    color:"darkorange"
                                                }}>{skill.skill_name}</b> </li>
                                            )})
                             }



                        </ol>
                    </div>
                    </div>
                    <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Projects:</h4>
                            </div>
                    </div>
                    </div>
                    <AnimationOnScroll animateIn="bounceInRight" duration={2} delay={50} animateOnce={true}>
                    <ul className="projectlist">
                        {
                            this.state.projects.map((proj) => {
                                return(
                                <li><b className="seems-h1"> {proj.project_name}</b>
                                    <p>{proj.project_short_desc}</p>

                                    <HiExternalLink size={'1.5em'}/><a href={proj.project_link}
                                                                       style={{
                                                                           marginLeft: 2
                                                                       }}>Visit Project Repository</a>
                                </li>
                                )})
                            }

                    </ul>
                    </AnimationOnScroll>
                    <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Publications:</h4>
                            </div>
                    </div>
                    </div>
                    <AnimationOnScroll animateIn="bounceInRight" duration={2} delay={50} animateOnce={true}>
                    <ul className="publist">
                        {
                             this.state.pubs.map((pub) => {
                                return(
                            <li>
                                <HiExternalLink size={'1.5em'}/><a href={pub.publication_link}
                                                                   style={{
                                                                       marginLeft: 2
                                                                   }}>{pub.publication_name}</a>
                            </li>
                                    )})
                        }


                    </ul>
                    </AnimationOnScroll>
                    <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Licenses and Certificates:</h4>
                            </div>
                    </div>
                    </div>
                    <AnimationOnScroll animateIn="bounceInRight" duration={2} delay={50} animateOnce={true}>
                    <ul className="publist">
                        {
                            this.state.lics.map((lic) => {
                                return(
                            <li><b className="seems-h1">{lic.lic_name}</b>
                                <button className="custom_btn2">View Credential</button>
                                <p><small>{lic.lic_org}</small></p></li>
                                    )})
                        }

                    </ul>
                     </AnimationOnScroll>
                        
                    
        </div>
        </Animated>
        </div>

        
        <Foot margin_value={172}/>

        </body>
        </React.Fragment>
        )
    }
}
export default UserProfessional;
// <li><b style={{
//                                 fontSize:"large",
//                                 color:"orangered"
//                             }}>C++</b><button className="custom_btn2">Take Skill Quiz</button></li>
//                             <li><b style={{fontSize:"large", color:"blueviolet"}}>ReactJS</b><MdFileDownloadDone size={'2em'} style={{color:'#29A335', float:"right"}}/></li>
//                             <li><b style={{fontSize:"large", color:"purple"}}>Django</b><MdFileDownloadDone size={'2em'} style={{color:'#29A335', float:"right"}}/></li>
//                             <li><b style={{fontSize:"large", color:"darkorange"}}>Java</b><MdFileDownloadDone size={'2em'} style={{color:'#29A335', float:"right"}}/></li>
