import React from "react";
import ReactDom from "react-dom";
import {Router, Route, IndexRoute, NotFoundRoute, browserHistory} from "react-router";

import Index from "./pages/index"
import S0 from "./pages/s0";
import E404 from "./pages/404";

require("./styles/main.less");
require("./styles/extra.less");
require("font-awesome-webpack");

ReactDom.render(
    <Router history={browserHistory}>
        <Route path="/" component={Index}>
            <IndexRoute component={S0}/>
            <Route path="/test" component={S0}/>
            <Route path="*" component={E404}/>
        </Route>
    </Router>
, document.getElementById("main"));