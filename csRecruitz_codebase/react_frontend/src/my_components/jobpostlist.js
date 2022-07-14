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

class Joblist extends Component {
    constructor(props) {
        super(props);
        this.state = {
          asc: true,
        };
      }

    toggleSort = () => {
        this.setState({
          asc: !this.state.asc
        });
    };

    render() {
        return (
            <React.Fragment>
            <body>
            <Navb/>
            <Filter_sidebar/>
            <div className="joblistbgdiv">
                <div className="click_instruction_div">
                    <h5 >Click at the job title to view details</h5>
                    <div style={{float:"right",marginTop:-60}}>
                        <p className="sort_by_txt">Sort by</p>
                        <div className="select_sort_div">
                            <Select options={sortOptions} openMenuOnFocus styles={dropDownStyle} isClearable  placeholder='None...' />
                        </div>
                        <div className="asc_desc_btn_div">
                           <button className="asc_desc_btn" onClick={() => this.toggleSort()}>
                              {this.state.asc ? <HiSortAscending style={{color:"white"}}/> : <HiSortDescending style={{color:"white"}}/>}
                            </button>
                        </div>
                    </div>

                </div>

                <Animated animationIn="slideInLeft"  animationInDuration={1800}  isVisible={true}>

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
                </Animated>
            </div>

            </body>
                </React.Fragment>
        )
    }
}

export default Joblist;