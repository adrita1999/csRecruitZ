import React, {Component} from "react";
import './nakshi.css';
//import './Personal.css';

class Filter_sidebar extends Component {
    pathaname;

    constructor(props) {
        super(props);
        this.pathaname=window.location.pathname;

    }
    render() {
        console.log(this.pathaname);
        return (

            <div className="filterbar">
                <h1>hi</h1>


            </div>
        )
    }
}
export default Filter_sidebar;