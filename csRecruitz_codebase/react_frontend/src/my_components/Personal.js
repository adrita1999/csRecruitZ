import React, {Component} from "react";
import {Animated} from "react-animated-css";
import './Personal.css';
import {AiFillEdit} from 'react-icons/ai'




import Sidebar from "./Sidebar";
import Navb from "./Navb";
import Foot from "./Foot";
class Personal extends Component {
    render() {
        return (
            <React.Fragment>
            <body>
           <Navb/>

            <Sidebar/>
            <div className="content">

                <div className="row"> <h1>About Me:</h1></div>

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
                            <b className= "seems-h1">First Name</b><p>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">Last Name</b><p>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">Father's Name</b><p>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">Mother's Name: </b><p>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                           <b className= "seems-h1">Date of Birth: </b><p>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">Gender</b><p>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">Nationality</b><p>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">NID number</b><p>the text right after....</p>
                        </div>
                    <div className="col-sm-6">
                            <b className= "seems-h1">Mobile number</b><p>the text right after....</p>
                        </div>
                    <div className="col-sm-6">
                            <b className= "seems-h1">Email Address</b><p>the text right after....</p>
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
                            <b className= "seems-h1">Street/Road</b><p>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">Thana</b><p>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">District</b><p>the text right after....</p>
                        </div>
                        <div className="col-sm-6">
                            <b className= "seems-h1">Division</b><p>the text right after....</p>
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