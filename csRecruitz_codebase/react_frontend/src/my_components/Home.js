import React, { Component } from 'react'
import {Animated} from "react-animated-css";
import './Home.css';
import {AiFillEdit} from 'react-icons/ai'
import home_image from "./images/home.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';


import Navb from "./Navb";
import Foot from "./Foot";


export class Home extends Component {
  render() {
    return (
       <React.Fragment>
       <body>
       <Navb/>
       <div >
        <Container>
            <div>
                <figure className='position-relative'>
                    <img src={home_image} alt="" className='image'/>
                    <figcaption>
                        Find The Perfect Job That<br/>
                        You Deserved
                    </figcaption>
                </figure>
            </div>
            <div className='container-fluid mb-5 wow fadeIn'>
                <div className='container'>
                    <div className='row g-2'>
                        <div className='col-md-10'>
                            <div className='row g-2'>
                                <div className='col-md-4'>
                                    <input type='text' className='form-control border-0' placeholder='keyword'></input>
                                </div>
                                <div className='col-md-4'>
                                    <select className='form-select border-0'>
                                        <option value="1">category 1</option>
                                        <option value="2">category 1</option>
                                        <option value="3">category 1</option>
                                    </select>
                                </div>
                                <div className='col-md-4'>
                                    <select className='form-select border-0'>
                                        <option value="1">category 1</option>
                                        <option value="2">category 1</option>
                                        <option value="3">category 1</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <button className='btn btn-dark bordar-0 w-100'>Search</button>
                        </div>
                    </div>
                </div>
        
            
            </div>
            <div className='container-xxl py-5'>
                <div className='container'>
                    <h1 className='text-center mb-5 wow fadeInUp'>Recommendation for you</h1>
                    <div className='row g-4'>
                        <div className=' recom-1 col-lg-4 col-sm-6 wow fadeInUp' data-wow-delay='0.1s' >
                            <a className='cat-item rounded p-4' href=''>
                                <i className='fa fa-3x fa-headset text-primary mb-4'></i>
                                <h5 className='mb-3'>Devops</h5>
                                <p className='mb-0'>Full time</p>
                            </a>
                        </div>
                        <div className=' recom-1 col-lg-4 col-sm-6 wow fadeInUp' data-wow-delay='0.1s' >
                            <a className='cat-item rounded p-4 href'>
                                <i className='fa fa-3x fa-headset text-primary mb-4'></i>
                                <h5 className='mb-3'>Devops</h5>
                                <p className='mb-0'>Full time</p>
                            </a>
                        </div>
                        <div className=' recom-1 col-lg-4 col-sm-6 wow fadeInUp' data-wow-delay='0.1s' >
                            <a className='cat-item rounded p-4 href'>
                                <i className='fa fa-3x fa-headset text-primary mb-4'></i>
                                <h5 className='mb-3'>Devops</h5>
                                <p className='mb-0'>Full time</p>
                            </a>
                        </div>
                        <div className=' recom-1 col-lg-4 col-sm-6 wow fadeInUp' data-wow-delay='0.1s' >
                            <a className='cat-item rounded p-4 href'>
                                <i className='fa fa-3x fa-headset text-primary mb-4'></i>
                                <h5 className='mb-3'>Devops</h5>
                                <p className='mb-0'>Full time</p>
                            </a>
                        </div>
                        <div className=' recom-1 col-lg-4 col-sm-6 wow fadeInUp' data-wow-delay='0.1s' >
                            <a className='cat-item rounded p-4 href'>
                                <i className='fa fa-3x fa-headset text-primary mb-4'></i>
                                <h5 className='mb-3'>Devops</h5>
                                <p className='mb-0'>Full time</p>
                            </a>
                        </div>
                        <div className=' recom-1 col-lg-4 col-sm-6 wow fadeInUp' data-wow-delay='0.1s' >
                            <a className='cat-item rounded p-4 href'>
                                <i className='fa fa-3x fa-headset text-primary mb-4'></i>
                                <h5 className='mb-3'>Devops</h5>
                                <p className='mb-0'>Full time</p>
                            </a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </Container>
          
            
       </div>
       <Foot margin_value={172}/>
       </body>
       </React.Fragment>
    )
  }
}

export default Home