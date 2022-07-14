import * as React from 'react';
import  {Component} from "react";

import "./nakshi.css";



export default class Jobdetailsitems extends Component {
    state={
        title:this.props.title,
        text_val:this.props.text_val,
    };
    render() {
        return (
            <div>
                <h6>{this.state.title}</h6>
                <p>{this.state.text_val}</p>

            </div>

    )
    }

}
