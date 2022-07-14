import React, {Component} from "react";
import {Animated} from "react-animated-css";
import './nakshi.css';
import {HiLocationMarker} from "react-icons/hi";
import {HiSortAscending} from "react-icons/hi";
import {HiSortDescending} from "react-icons/hi";
import {FaRegClock} from 'react-icons/fa';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {FaRegCalendarAlt} from 'react-icons/fa';
import Filter_sidebar from "./Filter_sidebar";
import Navb from "./Navb";
import Select from "react-select"
import Jobdetailsitems from "./jobdetailsitems";



class Jobdetails extends Component {
    constructor(props) {
        super(props);
      }

    render() {
        return (
            <React.Fragment>
            <body>
            <Navb/>
            <div className="jobdetailsbgdiv">
                <div className="job_title_div">
                    <h3 className="job_title_h">Software Engineer</h3>
                    <h6 className="job_emp_h">Optimizely</h6>
                </div>

            <div className="jobdetailsdiv">
                <Jobdetailsitems title="Vacancies" text_val="02"/>
                <Jobdetailsitems title="Job Context" text_val="We are looking for a skilled software engineer to join our software development team. To apply, the candidate should have intimate knowledge of .Net core coding and development, excellent software troubleshooting skills. Ultimately, a top-notch .Net software engineer can work together with the development team to create high-quality software applications that meet the needs of the user."/>


                <Jobdetailsitems title="Job Responsibilities" text_val="Planning, Designing and developing, application converting into modern technology, and Restful web services by writing production-quality code using .Net technology and their various tools/frameworks like MVC 4, .Net Core API, Azure blob storage, exponential backoff with polly, Subsonic, Dapper, Swashbuckle, NLog, xampp etc.
Ensured the applications and services run as per requirement by writing proper unit test, integration tests, and performance tests during the development.
Analyzed the requirements and transformed them into database schema, stored procedure and functions using SQL and RDBMS tool MySQL and MSSQL.
Designed and maintained modern user interface components for web and mobile using kendo UI, xVal, JavaScript, HTML, CSS, and Bootstrap
Followed the agile development methodologies and managed the source code using Git and subversion."/>


                <Jobdetailsitems title="Job Nature" text_val="Full-time"/>
                <Jobdetailsitems title="Educational Requirements" text_val="Bachelor of Science (BSc) in CSE"/>
                <Jobdetailsitems title="Experience Requirements" text_val="At least 2 year(s)"/>

                <Jobdetailsitems title="Additional Requirements" text_val="Both males and females are allowed to apply
At least 2 years professional work experience in design, development and deployment of applications using C# and ASP.NET.
Fluency in written and spoken English is required
Must be proactive, energetic and determined to meet the deadline
Open to learning new technologies.
"/>
                <Jobdetailsitems title="Apply Procedures" text_val="Photograph must be enclosed."/>

            </div>
            <div className="jobsummarydiv">
                <div style={{background:"#37474f",margin:0,paddingLeft:8,paddingTop:5,paddingBottom:1,position:"relative"}}><h5 style={{color:"white"}}>Job Overview</h5></div>
                <div className="jobsummaryinsidediv">
                <p >published on: 13 july, 2022</p>
                <p > application deadline: 31 july, 2022</p>
                <p> job nature: full-time</p>
                <p>location: dhaka</p>
                <p>salary: 20000 bdt</p>
                <p>required experience: 20000 bdt</p>
                <p>vacancy: 20000 bdt</p>

                <span style={{textAlign:"center"}}>
                    <button className="job_details_btn">Apply Now</button>
                    <button className="job_details_btn">Shortlist Job</button>
                    <button className="job_details_btn">Follow Employer</button>
                </span>




                </div>

            </div>
            </div>
            </body>
                </React.Fragment>
        )
    }
}

export default Jobdetails;