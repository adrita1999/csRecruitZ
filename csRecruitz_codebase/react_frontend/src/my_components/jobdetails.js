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



class Jobdetails extends Component {
    constructor(props) {
        super(props);
      }

    render() {
        return (
            <React.Fragment>
            <body>
            <Navb/>
            <div className="jobdetailsbgdiv">
                <div className="click_instruction_div">

                </div>
            </div>

            </body>
                </React.Fragment>
        )
    }
}

export default Jobdetails;