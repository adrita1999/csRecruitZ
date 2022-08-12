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
import {Navigate, useParams} from "react-router-dom";
import Loader from "./loader";
import Foot from "./Foot";

var jsonData = {
    "job_id":"",
    "mount":"",
    "type":"",
    "ifshortlist":""
  }

class Jobdetails extends Component {
    state={
        items:[],
        DetailsLoaded1:false,
        DetailsLoaded2:false,
        req_exp:"",
        ifapplied:"",
        ifshortlisted:"",
    }
    constructor(props) {
        super(props);
        this.handleClickApply=this.handleClickApply.bind(this);
        this.handleClickShortlist=this.handleClickShortlist.bind(this);
      }

    componentDidMount() {
        // const { id } = useParams()
        // console.log(id)
        console.log(window.location.href)
        const url=window.location.href
        const splitid = url.split("?")
        const id=splitid[1]
        console.log(id)
        jsonData.job_id=id
        jsonData.mount="true"
        fetch(
            "http://127.0.0.1:8000/"+id )

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DetailsLoaded1: true
                });
                console.log(json)
                const exp_text="At least "+json.required_experience.toString()+" year(s)"
                this.setState({'req_exp':exp_text})
                const jid = json.jobpost_id
                this.setState({'job_id': jid})
            })


            fetch('http://127.0.0.1:8000/first_module/apply/getapplication/', {  // Enter your IP address here
              method: 'POST',
                headers:{
                'Content-Type': 'application/json',
              },
              mode: 'cors',
              body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
            })

            fetch(
        "http://127.0.0.1:8000/first_module/apply/getapplication/",{
            method:"GET"
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    DetailsLoaded2: true
                });
                console.log(json.response)
                if (json.response==="applied") {
                         this.state.ifapplied=true
                    }
                    else {
                       this.state.ifapplied=false
                    }
                if (json.short==="shortlisted") {
                    this.state.ifshortlisted=true
                }
                else {
                   this.state.ifshortlisted=false
                }
            })

    }

    handleClickApply() {
    jsonData.job_id=this.state.job_id
    jsonData.mount="false"
    jsonData.type="apply"
    fetch('http://127.0.0.1:8000/first_module/apply/getapplication/', {  // Enter your IP address here
      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
    this.setState({'redirect':true})
  }

  handleClickShortlist() {
    jsonData.job_id=this.state.job_id
    jsonData.mount="false"
    jsonData.type="shortlist"
    this.state.ifshortlisted=!this.state.ifshortlisted
      if(this.state.ifshortlisted==true)
      {
          jsonData.ifshortlist="true"
      }
      else
      {
          jsonData.ifshortlist="false"
      }
    console.log(this.state.ifshortlisted)
    fetch('http://127.0.0.1:8000/first_module/apply/getapplication/', {  // Enter your IP address here
      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
    this.setState({'redirect':true})
  }

    render() {
        if (!this.state.DetailsLoaded1 || !this.state.DetailsLoaded2) return <Loader/>
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
                    {this.state.ifapplied && <button className="job_details_btn_disabled" disabled={true}>Applied</button>}
                    {!this.state.ifapplied && <button className="job_details_btn" onClick={this.handleClickApply}>Apply Now</button>}
                    {this.state.ifshortlisted && <button className="job_details_btn" onClick={this.handleClickShortlist}>Shortlisted</button>}
                    {!this.state.ifshortlisted && <button className="job_details_btn" onClick={this.handleClickShortlist}>Shortlist Job</button>}
                    <button className="job_details_btn">Follow Employer</button>
                </span>




                </div>

            </div>
            </div>
            <Foot margin_value={40}/>
            </body>
                </React.Fragment>
        )
    }
}

export default Jobdetails;