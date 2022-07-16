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
import {useParams} from "react-router-dom";



class Jobdetails extends Component {
    state={
        items:[],
        DetailesLoaded:false,
        req_exp:"",
    }
    constructor(props) {
        super(props);
      }

    componentDidMount() {
        // const { id } = useParams()
        // console.log(id)
        console.log(window.location.href)
        const url=window.location.href
        const splitid = url.split("?")
        const id=splitid[1]
        console.log(id)
        fetch(
            "http://127.0.0.1:8000/"+id )

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
                console.log(json)
                const exp_text="At least "+json.required_experience.toString()+" year(s)"
                this.setState({'req_exp':exp_text})
            })

    }

    render() {
        return (
            <React.Fragment>
            <body>
            <Navb/>
            <div className="jobdetailsbgdiv">
                <div className="job_title_div">
                    <h3 className="job_title_h">{this.state.items.title}</h3>
                    <h6 className="job_emp_h">{this.state.items.emp_name}</h6>
                </div>

            <div className="jobdetailsdiv">
                <Jobdetailsitems title="Vacancies" text_val={this.state.items.vacancies}/>
                <Jobdetailsitems title="Job Context" text_val={this.state.items.job_context}/>

                <Jobdetailsitems title="Job Responsibilities" text_val={this.state.items.job_responsibilities}/>


                <Jobdetailsitems title="Job Nature" text_val={this.state.items.job_nature}/>
                <Jobdetailsitems title="Educational Requirements" text_val={this.state.items.edu_requirement}/>
                <Jobdetailsitems title="Experience Requirements" text_val={this.state.req_exp}/>

                <Jobdetailsitems title="Additional Requirements" text_val={this.state.items.additional_requirements}/>
                <Jobdetailsitems title="Apply Procedures" text_val={this.state.items.application_process}/>

            </div>
            <div className="jobsummarydiv">
                <div className="overviewheader"><h5 style={{color:"white"}}>Job Overview</h5></div>
                <div className="jobsummaryinsidediv">
                <p><b>Published on:</b> {this.state.items.post_date}</p>
                <p><b>Application deadline:</b> {this.state.items.deadline_date}</p>
                <p><b>Job nature:</b> {this.state.items.job_nature}</p>
                <p><b>Location:</b> {this.state.items.emp_division}</p>
                <p><b>Salary:</b> {this.state.items.salary} BDT</p>
                <p><b>Required Experience:</b> {this.state.req_exp}</p>
                <p><b>Vacancy:</b> {this.state.items.vacancies}</p>

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