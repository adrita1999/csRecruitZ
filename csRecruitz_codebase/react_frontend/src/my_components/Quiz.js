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
      radioval:""

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
      this.state.radioval=event.target.value;
      // console.log(event.target.value)
      this.setState({radioval:event.target.value})
  }
  handleAnswer(event){
    this.state.answer =event.target.value; 
    this.state.current_q_id = this.state.questions[this.state.q_id].question_id;
    console.log(this.state.current_q_id);
    console.log(this.state.answer);
    this.state.pressed = false;

  }
  
  handleNext() {
    let inp = this.state.questions[this.state.q_id];
    this.setState({input:inp});
    this.state.q_id = this.state.q_id +1;
    this.state.percent = this.state.percent +10;

    // console.log(this.state.pressed);

    this.setState({pressed:false});
    this.state.radioval="";

  

    jsonData.question_id=this.state.current_q_id;
    jsonData.answer = this.state.answer;
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
        .then(response=>response.json())
        .then((data)=>console.log(data));
    

  }
  handleQuit() {
    window.location.href="/professional"
  }

  timerExpired()
  {
      console.log("timer expired");
      this.state.x=30;
  }    

  handleFinish() {
    window.location.href="/professional"
  }

  componentDidMount() {
    // let timeLeftVar = this.secondsToTime(this.state.seconds);
    // this.setState({ time: timeLeftVar });
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

  // secondsToTime(secs){
  //   let hours = Math.floor(secs / (60 * 60));
  //   let divisor_for_minutes = secs % (60 * 60);
  //   let minutes = Math.floor(divisor_for_minutes / 60);
  //   let divisor_for_seconds = divisor_for_minutes % 60;
  //   let seconds = Math.ceil(divisor_for_seconds);

  //   let obj = {
  //     "h": hours,
  //     "m": minutes,
  //     "s": seconds
  //   };
  //   return obj;
  // }
  

  // startTimer() {
  //   if (this.state.timer === 0 && this.state.seconds > 0) {
  //     this.state.timer = setInterval(this.countDown, 1000);
  //   }
  // }

  // countDown() {
  //   // Remove one second, set state so a re-render happens.
  //   let seconds = this.state.seconds - 1;
  //   this.setState({
  //     time: this.secondsToTime(seconds),
  //     seconds: seconds,
  //   });
    // Check if we're at zero.
  //   if (seconds === 0) { 
  //     clearInterval(this.state.timer);
  //   }
  //   // rerender(!this.startTimer);
  // }
  // render() {
  //   return(
  //     <div>
  //       <button onClick={this.startTimer}>Start</button>
  //       m: {this.state.time.m} s: {this.state.time.s}
  //     </div>
  //   );
  // }

  render() {
    const { DataisLoaded, items } = this.state;
    if (!this.state.DataisLoaded) return <Loader/>
    return (
        <React.Fragment>
       <Navb/>
       <div className='homebg' style={{backgroundColor:'#DEE7F4',}}>
            <div className='quiz' style={{ backgroundColor:'white'}}>
                
                <div className="row" style={{marginLeft:"0px",marginRight:"0px",borderRadius:"5px" }}>
                  <h5 className='title'style={{color:'white' }}>C++ Assesment<p style={{float:"right",paddingLeft:"15px"}}>{this.state.q_id+1}/10</p></h5>
                  
                </div>
                <div style={{padding:"20px"}}>
                      
                        <p className='question' >
                          {this.state.questions[this.state.q_id].question_text}
                        </p>
                         
                  
                  <hr/>
                  {/*<input type="radio" name="group1" value="1" id="rad1" checked={this.state.pressed} onChange={this.handleAnswer}  />*/}

                  {/*<label id='label' for="rad1">*/}
                  {/*<p className='question' >*/}
                  {/*  {this.state.questions[this.state.q_id].optionA}*/}
                  {/*</p>*/}
                  {/*</label>*/}
                  {/*<br/>*/}
                  {/*<hr/>*/}
                  {/*<input type="radio" name="group1" value="2" id="rad1" onChange={this.handleAnswer} autocomplete="off"/>*/}
                  {/*<label id='label' for="rad1">*/}
                  {/*/!* {this.state.input.map((list) =>{*/}
                  {/*        return ( *!/*/}
                  {/*        <p className='question' >*/}
                  {/*          {this.state.questions[this.state.q_id].optionB}*/}
                  {/*        </p>*/}
                  {/*         /!* )*/}
                  {/*      }*/}
                  {/*  )}  *!/*/}
                  {/*</label>*/}
                  {/*<br/>*/}
                  {/*<hr/>*/}
                  {/*<input type="radio" name="group1" value="3" id="rad1" onChange={this.handleAnswer} autocomplete="off"/>*/}
                  {/*<label id='label' for="rad1">*/}
                  {/*/!* {this.state.input.map((list) =>{*/}
                  {/*        return ( *!/*/}
                  {/*        <p className='question' >*/}
                  {/*          {this.state.questions[this.state.q_id].optionC}*/}
                  {/*        </p>*/}
                  {/*         /!* )*/}
                  {/*      }*/}
                  {/*  )}  *!/*/}
                  {/*</label>*/}
                  {/*<br/>*/}
                  {/*<hr/>*/}
                  {/*<input type="radio" name="group1" value="4" id="rad1" onChange={this.handleAnswer} autocomplete="off"/>*/}
                  {/*<label id='label' for="rad1">*/}
                  {/*/!* {this.state.input.map((list) =>{*/}
                  {/*        return ( *!/*/}
                  {/*        <p className='question' >*/}
                  {/*          {this.state.questions[this.state.q_id].optionD}*/}
                  {/*        </p>*/}
                  {/*         /!* )*/}
                  {/*      }*/}
                  {/*  )}  *!/*/}
                  {/*</label>*/}
                  {/*<br/>*/}
                  {/*<hr/>*/}

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
                    {this.state.q_id === 9 ?
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