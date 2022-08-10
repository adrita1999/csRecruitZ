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
import Select from "react-select";
import {Navigate} from "react-router-dom";
import {element} from "prop-types";
import {BallTriangle, Circles, ThreeDots} from 'react-loader-spinner'
import Loader from "./loader";
import Foot from "./Foot";
import {BsFilter} from "react-icons/bs";
import Radiobutton from "./radiobutton";
import Dropdown_my from "./dropdown";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const sortOptions = [
  { value: "Most Recent Post", label: "Most Recent Post" },
  { value: "Deadline", label: "Deadline" },
  { value: "Salary", label: "Salary" }
];

const dropDownStyle ={
    control: (base, state) => ({
    ...base,
    }),
    option: (provided, state) => ({
      ...provided,
        background: state.isSelected ? "#29A335" : "white",
        color: state.isSelected ? "white" : "black",
    "&:hover": {
        background: state.isSelected ? "#29A335" : "#C6F7C7",
        color: state.isSelected ? "white" : "black",
    }
    }),
    container: (provided, state) => ({
      ...provided,
      fontWeight: state.isSelected ? "bold" : "normal",
      width:220,
    }),
   dropdownIndicator: (base, state) => ({
    ...base,
    transition: "all .2s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
   })
};

const boxSX = {
  "&:hover": {
    border: "1px solid #00FF00",
    color: 'gray',
    backgroundColor: 'lightblue'
  },
};
var jsonData = {
    "category":"",
    "filtername":"",
    "redir_from_home":"false"
  }
class Joblist extends Component {
    pathaname;
    constructor(props) {
        super(props);
        this.pathaname=window.location.pathname;
        this.state = {
            asc: true,
            items: [],
            DataisLoaded: false,
            datas:[],
            redirect:false,
            navlink:"/jobdetails",
            filter_title_job_cat:"Job Category",
            default_job_cat:"DevOps",
            job_categories:[
                {value:"DevOps"},
                {value: "Teaching"},
                {value: "Security"},
                {value: "Research and Development"},
                {value: "Programming"}
            ],
            filter_title_loc:"Location",
            default_loc:"Rajshahi",
            locations:[
                {value:"Rajshahi"},
                {value: "Dhaka"},
                {value: "Sylhet"},
                {value: "Chittagong"},
                {value: "Khulna"},
                {value: "Barishal"},
                {value: "Rangpur"},
                {value: "Mymensingh"}
            ],
            filter_title_job_ntr:"Job Nature",
            default_job_ntr:"Full-time",
            job_natures:[
                {value:"Part-time"},
                {value: "Full-time"},
                {value: "Remote"},
                {value: "Freelancing"},
            ],
            filter_title_req:"Required Experience",
            default_req:"",
            req_exps:[
                {value:"1 year"},
                {value: "2-5 years"},
                {value: ">5 years"}
            ],
            filter_cat_val:"",

        };
        this.handleClick=this.handleClick.bind(this);
        // this.handleClickCat=this.handleClickCat.bind(this);
        this.handleChangeCat=this.handleChangeCat.bind(this);
      }

    toggleSort = () => {
        this.setState({
          asc: !this.state.asc
        });
    };

    componentDidMount() {
        fetch(
"http://127.0.0.1:8000/searchinput/",{
        method:"GET"
            })
            .then((res) => res.json())
            .then((json) => {
                this.setState({datas: json.data, DataisLoaded: true})
                console.log(json.data)

            })

    }
    handleClick(event) {
        console.log(event.target.id)
        const concatlink = "/jobdetails?" + event.target.id;
        this.setState({'navlink':concatlink})
        this.setState({'redirect':true})
  }

  handleChangeCat(event) {
        console.log("change")
          console.log(event.target.value)
          jsonData.category=event.target.value
          jsonData.filtername="cat"
          fetch('http://127.0.0.1:8000/searchinput/', {  // Enter your IP address here
             method: 'POST',
             headers:{
             'Content-Type': 'application/json',
             },
             mode: 'cors',
             body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
          })
          fetch(
    "http://127.0.0.1:8000/searchinput/",{
            method:"GET"
                })
                .then((res) => res.json())
                .then((json) => {
                    this.setState({datas: json.data, DataisLoaded: true})
                    console.log(json.data)

            })
      this.state.filter_cat_val=event.target.value;
  }

    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) return <Loader/>
        return (
            <React.Fragment>
            <body>
            <Navb/>




            <div className="filterbar">
                <h5 style={{marginLeft:12,marginTop:8,marginBottom:-12}}><BsFilter style={{
                            color:"blue",
                            paddingRight:5,
                            marginTop:-2,
                            fontSize:30
                        }}/>Filter Jobs</h5>
                <hr className="hr_style"/>
                <Animated animationIn="fadeIn"  animationInDuration={1800}  isVisible={true}>

                <div className="category_div">
                    <div>
                        <div className="filter_title_bg_div">
                            <h6>{this.state.filter_title_job_cat}</h6>
                        </div>

                        <FormControl >
                              <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                onChange={this.handleChangeCat}>
                                  {this.state.job_categories.map(category => (
                                      <FormControlLabel value={category.value} control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 18,},}} onClick={this.handleClickCat}/>} label={<span className="radio_btn_option">{category.value}</span>}/>
                                  ))}
                              </RadioGroup>
                            </FormControl>
                    </div>
                </div>

                <div className="category_div">
                    <Dropdown_my values={this.state.locations} title={this.state.filter_title_loc} default_val={this.state.default_loc} />
                </div>
                <div className="category_div">
                    <Radiobutton values={this.state.job_natures} title={this.state.filter_title_job_ntr} default_val={this.state.default_job_ntr} filtername="nat"/>
                </div>
                <div className="category_div">
                    <Radiobutton values={this.state.req_exps} title={this.state.filter_title_req} default_val={this.state.default_req} filtername="exp"/>
                </div>
                 </Animated>
            </div>







            <div className="joblistbgdiv">
                <div className="click_instruction_div">
                    <h5 >Click at the job title to view details</h5>
                    <div style={{float:"right",marginTop:-60}}>
                        <p className="sort_by_txt">Sort by</p>
                        <div className="select_sort_div">
                            <Select options={sortOptions} defaultValue="Salary" openMenuOnFocus styles={dropDownStyle} isClearable  placeholder='None...' />
                        </div>
                        <div className="asc_desc_btn_div">
                           <button className="asc_desc_btn" onClick={() => this.toggleSort()}>
                              {this.state.asc ? <HiSortAscending style={{color:"white"}}/> : <HiSortDescending style={{color:"white"}}/>}
                            </button>
                        </div>
                    </div>

                </div>




                <Animated animationIn="slideInLeft"  animationInDuration={1800}  isVisible={true}>

                {
                this.state.datas.map((item) => (

                    <div className="jobdiv">
                        <h4 style={{color:"#29A335"}}>{item.title}</h4>
                        <h6 style={{color:"black"}}>{item.emp_name}</h6>

                        <p style={{display:"inline"}}><HiLocationMarker style={{
                            color:"#29A335",
                            paddingRight:5,
                            marginTop:-2
                        }}/>{item.emp_district}, {item.emp_division}</p>

                        <p className="fulltime_p"><FaRegClock style={{
                            color:"#29A335",
                            paddingRight:5,
                            marginTop:-2
                        }}/>{item.job_nature}</p>

                        <p className="salary_p"><FaRegMoneyBillAlt style={{
                            color:"#29A335",
                            paddingRight:5,
                            marginTop:-2
                        }}/>{item.salary} BDT</p>

                        <p className="float_right_p"><FaRegCalendarAlt style={{
                            color:"#29A335",
                            paddingRight:5,
                            marginTop:-2
                        }}/>Deadline: {item.deadline_date}</p>

                        <button id={item.jobpost_id} className="float_right_btn" onClick={this.handleClick}>View Details</button>
                    </div>
                ))
                }




                </Animated>
            </div>
            <Foot margin_value={40}/>
            {this.state.redirect && <Navigate to={this.state.navlink}/>}
            </body>
                </React.Fragment>
        )
    }
}

export default Joblist;