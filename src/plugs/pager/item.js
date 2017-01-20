import React from "react";
import {Link} from "react-router";

class Item extends React.Component{
    constructor(){
        super();

        this.onClick = this.onClick.bind(this);
    }

    render(){
        return <Link 
                className={"pager_item" + (this.props.className ? " " + this.props.className : "") + (this.props.disabled ? " disabled" : "")}
                onClick={this.onClick}
            >
                {this.props.icon ? <font className={"fa fa-" + this.props.icon}/> : null}
                {this.props.text}
            </Link>;
    }

    onClick(){
        if(this.props.fnClick && typeof this.props.fnClick == "function" && !this.disabled) this.props.fnClick(this.props.value);
    }
}

Item.defaultProps = {
    disabled: false,
    className: "",
    text: "",
    icon: "",
    value: "",

    fnClick: null
};

export default Item;