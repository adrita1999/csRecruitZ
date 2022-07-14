import * as React from 'react';
import  {Component} from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "./nakshi.css";

const boxSX = {
  "&:hover": {
    border: "1px solid #00FF00",
    color: 'gray',
    backgroundColor: 'lightblue'
  },
};

export default class Radiobutton extends Component {
    state={
        categories:this.props.values,
        title:this.props.title,
        default_val:this.props.default_val,
    };
    render() {
        return (
            <div>
                <div className="filter_title_bg_div">
                    <h6>{this.props.title}</h6>
                </div>

                <FormControl >
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={this.state.default_val}
                        name="radio-buttons-group">
                          {this.state.categories.map(category => (
                              <FormControlLabel value={category.value} control={<Radio sx={{'& .MuiSvgIcon-root': {fontSize: 18,},}}/>} label={<span className="radio_btn_option">{category.value}</span>}/>
                          ))}
                      </RadioGroup>
                    </FormControl>
            </div>

    )
    }

}
