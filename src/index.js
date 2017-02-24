import React from "react";
import ReactDom from "react-dom";
import {Router, Route, IndexRoute, NotFoundRoute, browserHistory} from "react-router";

require("./styles/main.less");
require("./styles/extra.less");
require("font-awesome-webpack");

/*import Index from "./pages/index"
import S0 from "./pages/s0";
import E404 from "./pages/404";
import About from "./pages/about"

ReactDom.render(
    <Router history={browserHistory}>
        <Route path="/" component={Index}>
            <IndexRoute component={S0}/>
            <Route path="/test" component={S0}/>
            <Route path="/about" component={About}/>
            <Route path="*" component={E404}/>
        </Route>
    </Router>
, document.getElementById("main"));*/

/*const IndexComponent = (location, cb) => {
  require.ensure([], require => {
      console.log(require("./pages/index").default);
    cb(null, require("./pages/index").default);
  })
};
const S0Component = (location, cb) => {
  require.ensure([], require => {
    cb(null, require("./pages/s0").default);
  })
};
const E404Component = (location, cb) => {
  require.ensure([], require => {
    cb(null, require("./pages/404").default);
  })
};
const AboutComponent = (location, cb) => {
  require.ensure([], require => {
    cb(null, require("./pages/about").default);
  })
};

ReactDom.render(
    <Router history={browserHistory}>
        <Route path="/" getComponent={IndexComponent}>
            <IndexRoute getComponent={S0Component}/>
            <Route path="/test" getComponent={S0Component}/>
            <Route path="/about" getComponent={E404Component}/>
            <Route path="*" getComponent={AboutComponent}/>
        </Route>
    </Router>
, document.getElementById("main"));*/

const makePageFn = (src) => (location, cb) => {
  require.ensure([], require => {
    cb(null, src.default);
  })
};

ReactDom.render(
    <Router history={browserHistory}>
        <Route path="/" getComponent={makePageFn(require("./pages/index"))}>
            <IndexRoute getComponent={makePageFn(require("./pages/s0"))}/>
            <Route path="/test" getComponent={makePageFn(require("./pages/s0"))}/>
            <Route path="/about" getComponent={makePageFn(require("./pages/about"))}/>
            <Route path="*" getComponent={makePageFn(require("./pages/404"))}/>
        </Route>
    </Router>
, document.getElementById("main"));