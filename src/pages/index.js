import React from "react";
import ReactDom from "react-dom";
import {Link} from "react-router";

import "font-awesome-webpack";

export default class Index extends React.Component{
    render(){
        return <div>
            <h1>Hello Word !</h1>
            <div>
                <Link to="/">index - s0</Link> &nbsp;
                <Link to="/s1">s1</Link>
            </div>
            <div>{this.props.children}</div>
        </div>
    }
}