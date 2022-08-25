import React, {Component} from "react";
import './Personal.css';
import Personal from "./Personal";
class Sidebar extends Component {
    pathaname;

    constructor(props) {
        super(props);
        this.pathaname=window.location.pathname;

    }
    render() {
        console.log(this.pathaname);
        return (

            <div className="sidebar">
                <a className={this.pathaname==='/dashboard'?"active":""} href="/dashboard" >Personal Information</a>
                <a  href="/">Upload Resume</a>
                <a className={this.pathaname==='/professional'?"active":""} href="/professional" >Professional Information</a>
                <a  href="/applied">Applied Jobs</a>
                <a  href="/shortlisted">Shortlisted Jobs</a>
            </div>
        )
    }
}
export default Sidebar;