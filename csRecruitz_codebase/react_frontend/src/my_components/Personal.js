import React, {Component} from "react";
import {Animated} from "react-animated-css";
import './Personal.css';
import {AiFillEdit} from 'react-icons/ai'
class Personal extends Component {
    render() {
        return (
            <React.Fragment>
            <body>
            <div className="sidebar">
                <a className="active" href="/">Personal Information</a>
                <a href="/">Upload Resume</a>
                <a href="/">Professional Information</a>
                <a href="/">Applied Jobs</a>
                <a href="/">Shortlisted Jobs</a>



            </div>

            <div className="content">
                <div className="row"> <h1>About Me:</h1></div>
                <Animated animationIn="slideInUp"  animationInDuration={1800}  isVisible={true}>
                <div>
                <div className="row_custom ">
                    <div className="row">
                <div className="col-12">
                    <p>Sea et gubergren justo invidunt at amet clita. Justo sit justo tempor et invidunt voluptua, lorem
                        voluptua ipsum gubergren et est nonumy magna et vero, sit eos dolor sea sed et dolor erat et.
                        Accusam accusam magna aliquyam eirmod amet est kasd dolore sanctus. Lorem ea vero lorem eos eos
                        sanctus labore. Aliquyam vero ipsum dolor duo clita consetetur stet, aliquyam ipsum sea sed et
                        magna amet dolor.</p>
                </div>
                    </div>

                    <div className="row">
                        <h3>Personal Information:</h3></div>
                    </div>
                 <div className="row_custom ">
                <div className="row">
                        <div className="col-sm-6">
                            <p><b className= "seems-h1">First Name: </b>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <p><b className= "seems-h1">Last Name: </b>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <p><b className= "seems-h1">Father's Name: </b>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <p><b className= "seems-h1">Mother's Name: </b>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                           <p><b className= "seems-h1">Date of Birth: </b>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <p><b className= "seems-h1">Gender: </b>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <p><b className= "seems-h1">Nationality: </b>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <p><b className= "seems-h1">NID number: </b>the text right after....</p>
                        </div>
                    <div className="col-sm-6">
                            <p><b className= "seems-h1">Mobile number: </b>the text right after....</p>
                        </div>
                    <div className="col-sm-6">
                            <p><b className= "seems-h1">Email Address: </b>the text right after....</p>
                        </div>
                    </div>
                </div>
                <div className="row_custom ">
                <div className="row">
                    <h4>Address Information:</h4>
                </div>
                </div>
                <div className="row_custom ">
                <div className="row">
                        <div className="col-sm-6">
                            <p><b className= "seems-h1">Street/Road: </b>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <p><b className= "seems-h1">Thana: </b>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <p><b className= "seems-h1">District: </b>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <p><b className= "seems-h1">Division: </b>the text right after....</p>
                        </div>
                </div>
                </div>

            <div className="row_custom ">

                    <button className="custom_btn"><AiFillEdit/> Edit Information</button>

            </div>

            </div>
                </Animated>
            </div>

            </body>
                </React.Fragment>
        )
    }
}

export default Personal;