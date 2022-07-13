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
class Professional extends Component {
    render() {
        return (
            <React.Fragment>
                <body>
                <Navb/>

                <Sidebar/>
                <div className="content">

                <div className="row"> <h1>Professional Information:</h1></div>
                    <Animated animationIn="slideInUp"  animationInDuration={1800}  isVisible={true}>
                    <div>
               <div className="row_custom">
                    <div className="align">
                    <p><b className="seems-h1">Field of Work: </b>Research and Development</p>
                        <button className="icon_btn"><FiEdit2 size={'1.5em'} className="icon_edit"/></button></div>
                   </div>

                <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Job Experience:</h4>
                            <button className="icon_btn"><FiEdit2 size={'1.5em'} className="icon_edit"/></button></div>
                        <div className="container ">

                            <div className="row px-3" style={{
                                marginTop:-20
                            }}>

                                    <div className="border-left pt-2 pl-4 ml-2">
                                        <div className="position-relative mb-4">
                                            <FaArrowRight size={'1.5em'} style={{
                                                color:'#29A335',
                                                marginLeft:-16,
                                                display:"inline"


                                            }}/>

                                            <b className="seems-h1" style={{
                                                marginLeft:20,
                                                display:"inline"
                                            }}>Web Designer</b>
                                            <p className="mb-2" style={{
                                                marginLeft:30,

                                            }}>Soft Company | <small>2000 - 2050</small></p>
                                            <p style={{
                                                marginLeft:30,

                                            }}>Tempor eos dolore amet tempor dolor tempor. Dolore ea magna sit amet
                                                dolor eirmod. Eos ipsum est tempor dolor. Clita lorem kasd sed ea lorem
                                                diam ea lorem eirmod duo sit ipsum stet lorem diam</p>

                                        </div>
                                        <div className="position-relative mb-4">
                                           <FaArrowRight size={'1.5em'} style={{
                                                color:'#29A335',
                                                marginLeft:-16

                                            }}/>
                                            <b className="seems-h1" style={{
                                                marginLeft:20,
                                                display:"inline"
                                            }}>Web Designer</b>
                                            <p className="mb-2" style={{
                                                marginLeft:30,

                                            }}>Soft Company | <small>2000 - 2050</small></p>
                                            <p style={{
                                                marginLeft:30,

                                            }}>Tempor eos dolore amet tempor dolor tempor. Dolore ea magna sit amet
                                                dolor eirmod. Eos ipsum est tempor dolor. Clita lorem kasd sed ea lorem
                                                diam ea lorem eirmod duo sit ipsum stet lorem diam</p>
                                        </div>
                                        <div className="position-relative mb-4">
                                            <FaArrowRight size={'1.5em'} style={{
                                                color:'#29A335',
                                                marginLeft:-16

                                            }}/>
                                            <b className="seems-h1" style={{
                                                marginLeft:20,
                                                display:"inline"
                                            }}>Web Designer</b>
                                            <p className="mb-2" style={{
                                                marginLeft:30,

                                            }}>Soft Company | <small>2000 - 2050</small></p>
                                            <p style={{
                                                marginLeft:30,

                                            }}>Tempor eos dolore amet tempor dolor tempor. Dolore ea magna sit amet
                                                dolor eirmod. Eos ipsum est tempor dolor. Clita lorem kasd sed ea lorem
                                                diam ea lorem eirmod duo sit ipsum stet lorem diam</p>
                                        </div>
                                    </div>

                            </div>
                        </div>
                    </div>
                </div>
                    <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Skills:</h4>
                            <button className="icon_btn"><FiEdit2 size={'1.5em'} className="icon_edit"/></button></div>
                        <ol className="gradient-list" >
                            <li><b className="seems-h1">Python</b><MdFileDownloadDone size={'2em'} style={{
                                                color:'#29A335',

                                                float:"right"
                                            }}/> </li>
                            <li><b style={{
                                fontSize:"large",
                                color:"orangered"
                            }}>C++</b><MdFileDownloadDone size={'2em'} style={{
                                                color:'#29A335',

                                                float:"right"
                                            }}/></li>
                            <li><b style={{
                                fontSize:"large",
                                color:"blueviolet"
                            }}>ReactJS</b><button className="custom_btn2">Take Skill Quiz</button></li>
                            <li><b style={{
                                fontSize:"large",
                                color:"purple"
                            }}>Django</b><MdFileDownloadDone size={'2em'} style={{
                                                color:'#29A335',

                                                float:"right"
                                            }}/></li>
                            <li><b style={{
                                fontSize:"large",
                                color:"darkorange"
                            }}>Java</b><MdFileDownloadDone size={'2em'} style={{
                                                color:'#29A335',

                                                float:"right"
                                            }}/></li>


                        </ol>
                    </div>
                    </div>
                    <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Projects:</h4>
                            <button className="icon_btn"><FiEdit2 size={'1.5em'} className="icon_edit"/></button></div>
                    </div>
                    </div>
                    <AnimationOnScroll animateIn="bounceInRight" duration={4} delay={100} animateOnce={false}>
                    <ul className="projectlist">
                        <li><b className="seems-h1"> Gesture Based Mini Piano</b>
                        <p>Tempor eos dolore amet tempor dolor tempor. Dolore ea magna sit amet
                                                dolor eirmod. Eos ipsum est tempor dolor. Clita lorem kasd sed ea lorem
                                                diam ea lorem eirmod duo sit ipsum stet lorem diam</p>

                            <HiExternalLink size={'1.5em'}/><a href="https://github.com/Dristi123/ishtishon" style={{
                                marginLeft:2
                            }}>Visit Project Repository</a>
                        </li>
                        <li><b className="seems-h1">Istishon</b>
                        <p>Tempor eos dolore amet tempor dolor tempor. Dolore ea magna sit amet
                                                dolor eirmod. Eos ipsum est tempor dolor. Clita lorem kasd sed ea lorem
                                                diam ea lorem eirmod duo sit ipsum stet lorem diam</p>

                            <HiExternalLink size={'1.5em'}/><a href="https://github.com/Dristi123/ishtishon" style={{
                                marginLeft:2
                            }}>Visit Project Repository</a></li>

                    </ul>
                    </AnimationOnScroll>
                    <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Publications:</h4>
                            <button className="icon_btn"><FiEdit2 size={'1.5em'} className="icon_edit"/></button></div>
                    </div>
                    </div>
                    <AnimationOnScroll animateIn="bounceInRight" duration={4} delay={100} animateOnce={false}>
                    <ul className="publist">
                        <li>

                            <HiExternalLink size={'1.5em'}/><a href="https://github.com/Dristi123/ishtishon" style={{
                                marginLeft:2
                            }}>Tempor eos dolore amet tempor dolor tempor. Dolore ea magna sit amet
                                                dolor eirmod. Eos ipsum est tempor dolor. Clita lorem kasd sed ea lorem
                                                diam ea lorem eirmod duo sit ipsum stet lorem diam</a>
                        </li>
                        <li>

                            <HiExternalLink size={'1.5em'}/><a href="https://github.com/Dristi123/ishtishon" style={{
                                marginLeft:2
                            }}>Tempor eos dolore amet tempor dolor tempor. Dolore ea magna sit amet
                                                dolor eirmod. Eos ipsum est tempor dolor. Clita lorem kasd sed ea lorem
                                                diam ea lorem eirmod duo sit ipsum stet lorem diam</a>
                        </li>

                    </ul>
                    </AnimationOnScroll>
                    <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Licenses and Certificates:</h4>
                            <button className="icon_btn"><FiEdit2 size={'1.5em'} className="icon_edit"/></button></div>
                    </div>
                    </div>
                    <AnimationOnScroll animateIn="bounceInRight" duration={4} delay={50} animateOnce={false}>
                    <ul className="publist">
                        <li><b className="seems-h1">Neural Network and Deep Learning</b>
                            <button className="custom_btn2">View Credential</button>
                        <p><small>Coursera</small></p></li>
                        <li><b className="seems-h1">Neural Network and Deep Learning</b>
                            <button className="custom_btn2">View Credential</button>
                        <p><small>Coursera</small></p></li>
                    </ul>
                     </AnimationOnScroll>
                        <div className="row_custom">
                    <div className="row">
                        <div className="align">
                        <h4>Personal Preferences:</h4>
                            <button className="icon_btn"><FiEdit2 size={'1.5em'} className="icon_edit"/></button></div>
                            <p>Private to you <BiLockAlt size={'1.2em'} style={{
                                marginTop:-3
                            }}/></p>
                    </div>
                    </div>
                        <div className="row_custom">

                        <div className="prof_div_bg ">
                            <div className="row">
                                <div className="col-sm-12">
                            <b className= "seems-h1">Currently Open To</b><p>
                                    <div className="round1"><b>C++</b></div>
                                    <div className="round2"><b>ReactJS</b></div>
                                    <div className="round3"><b>Django</b></div>
                                </p>
                        </div>
                                <div className="col-sm-12">
                                    <b className= "seems-h1">Preferred Salary</b><p>
                                    BDT 50000
                                    </p>
                                </div>
                                <div className="col-sm-12">
                                    <b className= "seems-h1">Preferred Job Nature</b><p>
                                    Full-time
                                    </p>
                                </div>
                                <div className="col-sm-12">
                                    <b className= "seems-h1">Preferred Organization Type</b><p>
                                    Government Org
                                    </p>
                                </div>
                            </div>
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
export default Professional;