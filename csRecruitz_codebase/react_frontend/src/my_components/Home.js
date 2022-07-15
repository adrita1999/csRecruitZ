
import React, {Component, useState} from 'react'
import Tag from "./Tag.js"

import {Animated} from "react-animated-css";
import './Home.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import vacancy from './images/vacancy.png'
import company from './images/company.png'
import newjob from './images/newjob.png'

import Select, { StylesConfig }  from 'react-select'

import {HiLocationMarker} from "react-icons/hi";
import {FaRegClock} from 'react-icons/fa';
import {FaRegMoneyBillAlt} from 'react-icons/fa';
import {FaRegCalendarAlt} from 'react-icons/fa';

import Navb from "./Navb";
import Foot from "./Foot";
import {Navigate} from "react-router-dom";


const options = [
    { value: 'devops', label: 'devops' },
    { value: 'react', label: 'react' },
    { value: 'software engineer', label: 'software engineer' }
  ]
const CatOptions = [
    { value: 'Teaching', label: 'Teaching' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Security', label: 'Security' },
    { value: 'Research and Development', label: 'Research and Development' },
    { value: 'Programming', label: 'Programming' },
  ]
const TitleOptions = [
    { value: 'Govt', label: 'Govt' },
    { value: 'Non-Govt', label: 'Non-Govt' },
    { value: 'NGO', label: 'NGO' }
  ]
  const OrgOptions = [
    { value: 'Government', label: 'Government' },
    { value: 'Semi Government', label: 'Semi Government' },
    { value: 'NGO', label: 'NGO' },
    { value: 'Private Firm', label: 'Private Firm' },
    { value: 'International Agencies', label: 'International Agencies' }
  ]
  const LocationOptions = [
    { value: 'Dhaka', label: 'Dhaka' },
    { value: 'Rajshahi', label: 'Rajshahi' },
    { value: 'Rangpur', label: 'Rangpur' },
    { value: 'Sylhet', label: 'Sylhet' },
    { value: 'Khulna', label: 'Khulna' },
    { value: 'Chittagong', label: 'Chittagong' },
    { value: 'Mymensingh ', label: 'Mymensingh ' },
    { value: 'Barishal', label: 'Barishal' }
  ]

var jsonData = {
    "category":"",
  }

var redirect=false

  function handleClick() {
    //const history = useNavigate();
    // Send data to the backend via POST
    fetch('http://127.0.0.1:8000/searchinput/', {  // Enter your IP address here

      method: 'POST',
        headers:{
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
    })
      redirect=true;
    console.log(redirect)
  }
  

export class Home extends Component {

    state={
        cat: { value: 'Category', label: 'Category' },

    };
    constructor(props) {
    super(props);

    }
  handler = (event) => {
      const value = event.value
      console.log(value)
      this.state.cat.value=value
      this.state.cat.label=value
      jsonData.category=value
    }
    
  render() {
        let dir=redirect;

    return (
       <React.Fragment>
       <body>
       <Navb/>
       <div className='homebg'>
            <div className='container-fluid mb-5 wow fadeIn'></div>
            <div className='floatingdiv'> 
                <div className='row g-2'>
                    <div className='col-md-12'>
                    
                        <Form >
                            <input style={{width:'1202px', padding:'7px'}} type="text" placeholder='Keyword'></input>
                        </Form>

                        {/* <Tag/> */}
                        
                    </div>


                    <div className='col-md-3'>
                        <Select options={CatOptions} value={this.state.cat}  onChange={this.handler} isClearable placeholder="Category" />
                    </div>


                    <div className='col-md-3'>

                        <Select closeMenuOnSelect={false}
                                isMulti
                                options={TitleOptions} openMenuOnFocus isClearable placeholder='Title' />

                        <Select

                                options={NatureOptions} value={this.state.nature}  onChange={this.handlernature} openMenuOnFocus isClearable placeholder='Job Nature' />
                    </div>
                    <div className='col-md-3'>
                        <Select options={OrgOptions} openMenuOnFocus isClearable  placeholder='Organization' />
                    </div>
                    <div className='col-md-2'>
                        <Select options={LocationOptions} openMenuOnFocus isClearable  placeholder='Location' />
                    </div>
                    <div className='col-md-1'>
                        <button className='btn btn-success' onClick={handleClick}>Search</button>
                    </div>



                </div>
            </div>
            <div className='nicherdiv mb-3'> 
                <div className=' vacancydiv' >
                    <a href='//'><img className='vacancy' src={vacancy}></img></a>
                    <h2 className='vacancytitle'>Vacancy</h2>
                </div> 
                
                <div className='companydiv'>
                    <a href='//'> <img className='company' src={company}></img></a>
                    <h2 className='companytitle'>Company</h2>
                </div>
                <div className='newjobdiv'>
                    <a href='//'>
                        <img className='newjob' src={newjob}></img>
                    </a>
                    <h2 className='newjobtitle'>New job</h2>
                </div>
         
                
            </div>

            <Animated animationIn="slideInLeft"  animationInDuration={1800}  isVisible={true}>

            <div className='recommendationdiv mb-3'> 
                <h3 style={{fontWeight:'bold',marginLeft:'2%',padding:'15px',textDecorationLine:'underline'

                }}>Recommendation for you</h3>
                <div className="jobdiv">
                    <h4 style={{color:"#29A335"}}>Software Engineer</h4>
                    <h6 style={{color:"black"}}>Optimizely</h6>

                    <p style={{display:"inline"}}><HiLocationMarker style={{
                        color:"#29A335",
                        paddingRight:5,
                        marginTop:-2
                    }}/>Banani, Dhaka</p>

                    <p className="fulltime_p"><FaRegClock style={{
                        color:"#29A335",
                        paddingRight:5,
                        marginTop:-2
                    }}/>Full-time</p>

                    <p className="salary_p"><FaRegMoneyBillAlt style={{
                        color:"#29A335",
                        paddingRight:5,
                        marginTop:-2
                    }}/>50,000 BDT</p>

                    <p className="float_right_p"><FaRegCalendarAlt style={{
                        color:"#29A335",
                        paddingRight:5,
                        marginTop:-2
                    }}/>Deadline: 31 July, 2022</p>

                    <button className="float_right_btn">View Details</button>
                </div>
                <div className="jobdiv">
                    <h4 style={{color:"#29A335"}}>Software Engineer</h4>
                    <h6 style={{color:"black"}}>Optimizely</h6>

                    <p style={{display:"inline"}}><HiLocationMarker style={{
                        color:"#29A335",
                        paddingRight:5,
                        marginTop:-2
                    }}/>Banani, Dhaka</p>

                    <p className="fulltime_p"><FaRegClock style={{
                        color:"#29A335",
                        paddingRight:5,
                        marginTop:-2
                    }}/>Full-time</p>

                    <p className="salary_p"><FaRegMoneyBillAlt style={{
                        color:"#29A335",
                        paddingRight:5,
                        marginTop:-2
                    }}/>50,000 BDT</p>

                    <p className="float_right_p"><FaRegCalendarAlt style={{
                        color:"#29A335",
                        paddingRight:5,
                        marginTop:-2
                    }}/>Deadline: 31 July, 2022</p>

                    <button className="float_right_btn">View Details</button>
                </div>
                <div className="jobdiv">
                    <h4 style={{color:"#29A335"}}>Software Engineer</h4>
                    <h6 style={{color:"black"}}>Optimizely</h6>

                    <p style={{display:"inline"}}><HiLocationMarker style={{
                        color:"#29A335",
                        paddingRight:5,
                        marginTop:-2
                    }}/>Banani, Dhaka</p>

                    <p className="fulltime_p"><FaRegClock style={{
                        color:"#29A335",
                        paddingRight:5,
                        marginTop:-2
                    }}/>Full-time</p>

                    <p className="salary_p"><FaRegMoneyBillAlt style={{
                        color:"#29A335",
                        paddingRight:5,
                        marginTop:-2
                    }}/>50,000 BDT</p>

                    <p className="float_right_p"><FaRegCalendarAlt style={{
                        color:"#29A335",
                        paddingRight:5,
                        marginTop:-2
                    }}/>Deadline: 31 July, 2022</p>

                    <button className="float_right_btn">View Details</button>
                </div>
            </div>
            </Animated>
             

       </div>
       <Foot margin_value={172}/>
       {dir && <Navigate to='/joblist' replace={true}/>}
       </body>
       </React.Fragment>
    )
  }
}

export default Home;
//export default withRouter(Home);

// export default function(props) {
//   const navigation = useNavigate();
//
//   return <Home {...props} navigation={navigation} />;
// }