import React from "react";
import ReactDom from "react-dom";
import {Router, Route, hashHistory, browserHistory} from 'react-router';

import S0 from "./s0";
import S1 from "./s1";

import "font-awesome-webpack";

ReactDom.render(
    <div>
        <h1>Hello Word !</h1>
        <Router history={browserHistory}>
            <Route path="/" component={S0}/>
            <Route path="/s1" component={S1}/>
        </Router>
    </div>
, document.getElementById("main"));