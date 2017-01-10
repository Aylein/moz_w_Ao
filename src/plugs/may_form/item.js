import React from "react";
import "./styles/style.less";

import Input from "./input";
import CheckBox from "./checkbox";
import Radio from "./radio";
import Text from "./text";
import Select from "./select";

class Item extends React.Component{
    constructor(){
        super();
        this.makeRender = this.makeRender.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render(){
        return <div className="may_form_item">
            <label className="may_form_item_title">{this.props.title}：</label>
            <label className="may_form_input">{this.makeRender(this.props.input)}</label>
            <label className="cb"/>
            <label className="may_form_item_validblank"></label>
            <label className={"may_form_validres " + (this.props.validRes ? "valid" : "unvalid")}>{this.props.validRes ? this.props.msg : this.props.validMsg}</label>
            <label className="cb"/>
        </div>;
    }

    makeRender(props){
        switch(this.props.type){
            case "checkbox": return <CheckBox {...props} fnClick={this.onChange}/>;
            case "radio": return <Radio {...props} fnClick={this.onChange}/>;
            case "select": return <Select {...props} fnChange={this.onChange}/>;
            case "text":
            default: return <Text {...props} fnChange={this.onChange}/>;
        }
    }

    onChange(va){
        if(this.props.fnChange && typeof this.props.fnChange == "function") this.props.fnChange(va);
    }
}

Item.defaultProps = {
    type: "text",
    title: "",
    input: null,
    msg: "",
    validRes: true,
    validMsg: ""
};

export default Item;