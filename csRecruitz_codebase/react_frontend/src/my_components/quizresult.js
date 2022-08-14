import React, { Component } from 'react'
import './quiz.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Progress} from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import {FaRegClock} from 'react-icons/fa';
import {FiEdit2} from 'react-icons/fi';
import Loader from "./loader";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

import Navb from "./Navb";
import Foot from "./Foot";
import FormControl from "@mui/material/FormControl";
import {CgFileDocument} from 'react-icons/cg';
import {MdOutlineAssessment} from 'react-icons/md';




var jsonData = {
  "question_id":"",
  "answer":"",
    "type":""
}


export class Quizresult extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      DataisLoaded:false,
    };
    // this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {

    // fetch(
    //   "http://127.0.0.1:8000/first_module/question/")
    //
    //   .then((res) => res.json())
    //   .then((json) => {
    //       this.setState({
    //           questions: json,
    //           DataisLoaded:true,
    //           pressed:true
    //       });
    //
    //   console.log(json[this.state.q_id].time_limit)
    //     const questime=json[this.state.q_id].time_limit
    //     const splittime = questime.split(":")
    //     const min=splittime[0]
    //       const sec=splittime[1]
    //   console.log(min)
    //     console.log(sec)
    //       this.setState({min:parseInt(min)})
    //       this.setState({sec:parseInt(sec)})
    //       // if(parseInt(sec)===0)
    //       // {
    //       //     this.setState({if1digit:true})
    //       // }
    //       this.setState({mark:json[this.state.q_id].mark})
    //   })
  }

  render() {

    // if (!this.state.DataisLoaded) return <Loader/>
    return (
        <React.Fragment>
       <Navb/>
       <div className='homebg' style={{backgroundColor:'#DEE7F4',}}>
            <div className='quiz2' style={{ backgroundColor:'white',marginTop:"10px",boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>

                <div className="row" style={{marginLeft:"0px",marginRight:"0px",borderRadius:"5px" }}>
                  <h5 className='title2'style={{color:'white'}}>Assessment Result</h5>
                </div>
                <div><CgFileDocument className='markicon' style={{fontSize:"120",color:"#226119",marginLeft:"37%"}}/></div>
                <div>Total Marks:</div>
                <div>Marks Percentage:</div>
                <div><h6>You haved successfully passed the assessment. Your skill is now verified.</h6></div>
                <div><h6>You haved failed the assessment. Try again later.</h6></div>

                <button className='btn btn-primary' onClick={this.handleProf} style={{width:"300px", marginRight: "150px",marginLeft: "400px"}}>Go To Professional Dashboard</button>


                </div>

            </div>

            <Foot margin_value={-80}/>

       </React.Fragment>
    )
  }
}

export default Quizresult