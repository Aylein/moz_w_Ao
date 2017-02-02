import React from "react";
import {Link} from "react-router";

export default class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            list: [
                {to: "/", text: "AyleinOter"},
                {to: "/about", text: "About"}
            ],
            select: "AyleinOter"
        };

        this.onClick = this.onClick.bind(this);
    }

    render(){
        return <div className="pager_main_header">
            <div className="pager_main_header_main">
                <Link to="/" onClick={() => { this.onClick("AyleinOter"); }}><img className="pager_main_header_master" src={require("../img/master.jpg")}/></Link>
                {this.state.list.map((va, i) => <Link
                    key={i} 
                    className={"pager_main_header_link" + (this.state.select == va.text ? " selected" : "")} 
                    to={va.to} 
                    onClick={() => { this.onClick(va.text); }}
                >{va.text}</Link>)}
            </div>
        </div>;
    }

    onClick(va){
        this.setState({select: va});
    }
}