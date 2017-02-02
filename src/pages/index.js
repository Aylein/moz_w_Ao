import React from "react";

import Header from "./header";
import Footer from "./footer"

export default class Index extends React.Component{
    render(){
        return <div className="pager_main">
            <Header/>
            <div className="pager_main_section">{this.props.children}</div>
            <Footer/>
        </div>
    }
}