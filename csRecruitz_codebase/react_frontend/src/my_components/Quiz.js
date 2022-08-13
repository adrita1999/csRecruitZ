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

const randomID = () => Math.random().toString(36).substring(7);

var jsonData = {
  "question_id":"",
  "answer":"",
    "type":""
}


export class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      DataisLoaded:false,
      q_id:0,
      input:{},
      percent:0,
      x:13,
      answer:"",
      questions:[],
      current_q_id:0,
      radioval:"none"
    };


    // this.startTimer = this.startTimer.bind(this);
    // this.countDown = this.countDown.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleQuit = this.handleQuit.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleChangeAns=this.handleChangeAns.bind(this);
  }


  handleChangeAns(event)
  {
      // console.log(event.target.value)
      if(event.target.value!=="")
      {
          this.state.radioval=event.target.value;
      }
      else
      {
          this.state.radioval="none"
      }
      if(event.target.value!=="")
      {
          this.setState({radioval:event.target.value})
      }
      else
      {
          this.setState({radioval:"none"})
      }

      this.state.current_q_id = this.state.questions[this.state.q_id].question_id;
      this.setState({current_q_id:this.state.questions[this.state.q_id].question_id})
  }
  handleAnswer(event){
    this.state.answer =event.target.value;
    this.state.current_q_id = this.state.questions[this.state.q_id].question_id;
    console.log(this.state.current_q_id);
    console.log(this.state.answer);
    this.state.pressed = false;

  }

  handleNext() {
    this.state.current_q_id = this.state.questions[this.state.q_id].question_id;
    this.setState({current_q_id:this.state.questions[this.state.q_id].question_id})
    let inp = this.state.questions[this.state.q_id];
    this.setState({input:inp});
    this.state.q_id = this.state.q_id +1;


    // console.log(this.state.pressed);

    this.setState({pressed:false});
    jsonData.question_id=this.state.current_q_id;
    console.log(this.state.current_q_id)
    // jsonData.answer = this.state.answer;
    jsonData.answer = this.state.radioval;
    this.state.radioval="none";
    jsonData.type = "next";

    console.log(jsonData.question_id)
    console.log(jsonData.answer)
    fetch('http://127.0.0.1:8000/first_module/question/answer/', {  // Enter your IP address here
        method: 'POST',
        headers:{
        'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
        })
      // this.state.percent = this.state.percent +12.5;
      this.setState({percent:this.state.percent+12.5})
  }
  handleQuit() {
    window.location.href="/professional"
  }

  timerExpired()
  {
      console.log("timer expired")
  }

  handleFinish() {
    this.state.current_q_id = this.state.questions[this.state.q_id].question_id;
    this.setState({current_q_id:this.state.questions[this.state.q_id].question_id})


    jsonData.question_id=this.state.current_q_id;
    jsonData.answer = this.state.radioval;
    this.state.radioval="none";
    jsonData.type = "finish";

    fetch('http://127.0.0.1:8000/first_module/question/answer/', {  // Enter your IP address here
        method: 'POST',
        headers:{
        'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
        })
        .then(response=>response.json())
        .then((data)=>console.log(data));
    // this.state.percent = this.state.percent+12.5
      this.setState({percent:this.state.percent+12.5})
    window.location.href="/professional"
  }

  componentDidMount() {
    const mountId = randomID();
    setInterval(() => {
          // console.log(`${mountId} | updating state`);
          const state = this.state;
          if (state.x !== 0)
          {
              this.setState({ x: state.x - 1 });
          }
          else
          {
              this.timerExpired();
          }
        }, 1000);
    fetch(
      "http://127.0.0.1:8000/first_module/question/")

      .then((res) => res.json())
      .then((json) => {
          this.setState({
              questions: json,
              DataisLoaded:true,
              pressed:true
          });
      // console.log(input.question_text)
      // console.log(this.state.questions)
      })
  }

  render() {
    const { DataisLoaded, items } = this.state;
    if (!this.state.DataisLoaded) return <Loader/>
    return (
        <React.Fragment>
       <Navb/>
       <div className='homebg' style={{backgroundColor:'#DEE7F4',}}>
            <div className='quiz' style={{ backgroundColor:'white'}}>
                
                <div className="row" style={{marginLeft:"0px",marginRight:"0px",borderRadius:"5px" }}>
                  <h5 className='title'style={{color:'white' }}>C++ Assesment<p style={{float:"right",paddingLeft:"15px"}}>{this.state.q_id+1}/8</p></h5>
                  
                </div>
                <div style={{padding:"20px"}}>
                      
                        <p className='question' >
                          {this.state.questions[this.state.q_id].question_text}
                        </p>
                         
                  
                  <hr/>
            

                 <FormControl >
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        defaultValue={this.state.radioval}
                        value={this.state.radioval}
                        onChange={this.handleChangeAns}>
                          <FormControlLabel value="1" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 18,},}} />} label={<span className="radio_btn_option">{this.state.questions[this.state.q_id].optionA}</span>}/>
                          <FormControlLabel value="2" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 18,},}} />} label={<span className="radio_btn_option">{this.state.questions[this.state.q_id].optionB}</span>}/>
                          <FormControlLabel value="3" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 18,},}} />} label={<span className="radio_btn_option">{this.state.questions[this.state.q_id].optionC}</span>}/>
                          <FormControlLabel value="4" control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 18,},}} />} label={<span className="radio_btn_option">{this.state.questions[this.state.q_id].optionD}</span>}/>
                      </RadioGroup>
                  </FormControl>

                  < Progress percent={this.state.percent} ></Progress>
                  <br/>
                </div>
                <div className='lastdiv' style={{backgroundColor:'white',paddingBottom:"50px"}}>
                    {/* <p className='countp'> question=1/10</p> */}
                    <p className='time' ><FaRegClock className='clock'/>
                     </p>{this.state.x}
                     {/* { this.state.time.m === 0 && this.state.time.s === 0
                          ? null
                          : <p style={{paddingBottom:"30px"}}
                              open={this.state.DataisLoaded}
                              onLoadStart={this.startTimer}
                              onClose={this.handleClose}>
                              Time: {this.state.time.m}:{this.state.time.s}
                              </p> 
                      } */}
                    {this.state.q_id === 7 ?
                        <button className='btn btn-success' onClick={this.handleFinish} style={{width:"100px", marginRight: "150px",marginLeft: "400px", marginTop:"0px"}}> Finish</button>
                        :
                        <button className='btn btn-success' onClick={this.handleNext} style={{width:"100px", marginRight: "150px",marginLeft: "400px", marginTop:"0px"}}> Next</button>
                    }
                    <button className='btn btn-danger'style={{width:"100px",marginLeft: "500px",marginTop: "-37px"}} onClick={this.handleQuit}> Quit</button>

                </div>
                
            </div>
       </div>
       
       </React.Fragment>
    )
  }
}

export default Quiz