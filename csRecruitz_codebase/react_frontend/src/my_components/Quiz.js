import React, { Component } from 'react'
import './quiz.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Progress} from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import {FaRegClock} from 'react-icons/fa';

import Navb from "./Navb";
import Foot from "./Foot";

export class Quiz extends Component {
  render() {
    return (
        <React.Fragment>
       
       <Navb/>
       <div className='homebg' style={{
        backgroundColor:'#DEE7F4',
       }}>
            <div className='quiz' style={{
                backgroundColor:'white'
            }}>
                
                <h5 className='title'>C++ Assesment</h5>
                <p className='question' >What is the value of x after running this code? <br/> int x = 10, a = -3;
                x += a;</p>
                <hr/>
                <input type="radio" name="group1" value="" id="rad1"/>
                <label id='label' for="rad1">7</label>
                <br/>
                <hr/>
                <input type="radio" name="group1" value="" id="rad1"/>
                <label id='label' for="rad1">3</label>
                <br/>
                <hr/>
                <input type="radio" name="group1" value="" id="rad1"/>
                <label id='label' for="rad1">13</label>
                <br/>
                <hr/>
                <input type="radio" name="group1" value="" id="rad1"/>
                <label id='label' for="rad1">-3</label>
                <br/>
                <hr/>

                < Progress percent={10} status="success"></Progress>
                <br/>

                <div className='lastdiv' style={{backgroundColor:'white'}}>
                    <p className='countp'> question=1/10</p>
                    <p className='time'><FaRegClock className='clock'/>Full time</p>
                    <button className='btn btn-success'> Next</button>

                </div>
                
            </div>
       </div>
       
       </React.Fragment>
    )
  }
}

export default Quiz