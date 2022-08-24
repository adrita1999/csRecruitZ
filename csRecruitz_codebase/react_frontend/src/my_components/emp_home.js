
import React, {Component, useState} from 'react'
import Tag from "./Tag.js"

import {Animated} from "react-animated-css";
import './Home.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import vacancy from './images/vacancy.png'
import company from './images/company.png'
import newjob from './images/newjob.png'
import briefcaselogo from './images/briefcase.svg'
import InputLabel from '@mui/material/InputLabel';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import Select, { StylesConfig }  from 'react-select'

import {HiLocationMarker} from "react-icons/hi";
import {FaRegClock} from 'react-icons/fa';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {FaRegCalendarAlt} from 'react-icons/fa';

import Navb from "./Navb";
import Foot from "./Foot";
import {Navigate} from "react-router-dom";
import Button from "./Button";
import Ripple from "./Ripple";
import CountUp from "react-countup";
import AnimatedNumbers from "react-animated-numbers";
import Loader from "./loader";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3C1173",
    color: theme.palette.common.white,
      fontSize: 15,
      fontWeight: "bold",
      border:1
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#D5ECD1",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

var jsonData = {
  }



export class EmpHome extends Component {

    state={
        redirect:false,
        DetailsLoaded1:false,
        DetailsLoaded2:false,
        navlink:"/jobdetails",
    };

    constructor(props) {
    super(props);

    // this.handleClick=this.handleClick.bind(this);
    // this.handleClickNew=this.handleClickNew.bind(this);
    // this.handleClickReco=this.handleClickReco.bind(this);
  }



componentDidMount() {
        //console.log("mount hoise")
        //this.setState({DetailsLoaded1:true})
         fetch(
            "http://127.0.0.1:8000/first_module/employer/emp/")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    emps: json.data,
                    DetailsLoaded1:true
                });
            //console.log(json)
            //console.log(this.state)
            })

        fetch(
            "http://127.0.0.1:8000/empjobs")

            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    jobs: json.data,
                    DetailsLoaded2:true
                });
            console.log(json)
            //console.log(this.state)
            })
    }

  render() {
      if ( !this.state.DetailsLoaded1 ||!this.state.DetailsLoaded2) return <Loader/>
    return (
       <React.Fragment>
       <body>
       <Navb/>

       <div className='homebg'>
            <div className='container-fluid mb-5 wow fadeIn'></div>
           {/*<img className="briefcaselogo" src={briefcaselogo} alt="Logo" />*/}
           <img className="emplogo" src={vacancy} alt="Logo" />
           <div className='floatingdivemp'>
                <div className='row g-2'>
                    <h1>{this.state.emps[0].name}</h1>
                    <h6>{this.state.emps[0].division} | Established in {this.state.emps[0].establishment_year}</h6>
                </div>
            </div>

            <div className='nicherdiv2 mb-3'>
                <div className='listheading'>
                <h4>List of all job posts:</h4>
                </div>

             <div className="jobtabledivemp">
             <TableContainer component={Paper} style={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
      <Table sx={{ minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Job Title</StyledTableCell>
            <StyledTableCell align="right">Post Date</StyledTableCell>
            <StyledTableCell align="right">Deadline Date</StyledTableCell>
              <StyledTableCell align="right">Total Applicants</StyledTableCell>
              {/*<StyledTableCell align="right">View Details</StyledTableCell>*/}
              <StyledTableCell align="center">View Applicants</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.jobs.map((row) => (
            <StyledTableRow key={row.jobpost_id} name={row.jobpost_id}>
              <StyledTableCell component="th" scope="row">
                  <b>{row.title}</b>
              </StyledTableCell>
                <StyledTableCell align="right">{row.post_date}</StyledTableCell>
              <StyledTableCell align="right">{row.deadline_date}</StyledTableCell>
              <StyledTableCell align="right">{row.tot_applicants}</StyledTableCell>
                <StyledTableCell align="right"><button className="btn btn-sm btn-success" id={row.newjobpost_id}>View</button></StyledTableCell>
                {/*<StyledTableCell align="right"><button className="btn-success">Delete</button></StyledTableCell>*/}

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                    </div>

            </div>


       </div>
       <Foot margin_value={0}/>
       {this.state.redirect && <Navigate to='/joblist'/>}
       {this.state.redirectReco && <Navigate to={this.state.navlink}/>}
       </body>
       </React.Fragment>
    )

  }
}

export default EmpHome;
