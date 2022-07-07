import React, {Component} from "react";
class Example extends Component {
    constructor() {
        super();
        this.state={
            job_lists:[],
        };
    }
    componentDidMount() {
        fetch("http://127.0.0.1:8000/")
            .then(response => response.json())
            .then(response=>console.log(response))
            .then(json => this.setState({ job_lists:json }));

    }

    render() {
        const { hits } = this.state;
        return (
            <div>
            <h1>class component</h1>
            <ul>{hits.map(hit =>(
          <li>
              {hit.title}
          </li>
        ))}
            </ul>
                </div>
        )
    }
}

export default Example;