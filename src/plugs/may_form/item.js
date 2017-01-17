import React from "react";
import "./styles/style.less";

import Input from "./input";
import CheckBox from "./checkbox";
import Radio from "./radio";
import Text from "./text";
import Select from "./select";
import Textarea from "./textarea";

import Valid from "./valid";
const validate = new Valid();

class Item extends React.Component{
    constructor(){
        super();
        this.makeRender = this.makeRender.bind(this);
        this.onChange = this.onChange.bind(this);

        this.validT = undefined;
    }

    render(){
        return <div className="may_form_item">
            <label className="may_form_item_title">
                {this.props.required ? <font className="may_form_item_title_required">*</font> : undefined}
                {this.props.title ? this.props.title + "：" : ""}
            </label>
            <span className={"may_form_input" + (this.props.validRes === true ? " valid" : (this.props.validRes ? " validating" : " unvalid"))}>
                {this.props.render && typeof this.props.render == "function" ? this.props.render() : this.makeRender(this.props.input)}
            </span>
            <label className="cb"/>
            <label className="may_form_item_validblank"></label>
            <label className={"may_form_validres" + (this.props.validRes === true ? " valid" : (this.props.validRes ? " validating" : " unvalid"))}>
                {this.props.validRes == "validating" ? "验证中" : this.props.validRes ? this.props.msg : this.props.validMsg}
            </label>
            <label className="cb"/>
        </div>;
    }

    componentDidMount(){
        if(this.validT) clearTimeout(this.validT);
    }
    

    makeRender(props){
        switch(this.props.type){
            case "checkbox": return <CheckBox {...props} fnClick={this.onChange}/>;
            case "radio": return <Radio {...props} fnClick={this.onChange}/>;
            case "select": return <Select {...props} fnChange={this.onChange}/>;
            case "textarea": return <Textarea {...props} fnChange={this.onChange}/>
            case "text":
            default: return <Text {...props} fnChange={this.onChange}/>;
        }
    }

    onChange(va){
        if(this.props.validation){
            if(this.validT){
                clearTimeout(this.validT);
            }
            this.validT = setTimeout(() => {
                this.onValid(va, this.props.validation);
            }, 700);
            va.res = {validRes: "validating"};
        }
        if(this.props.fnChange && typeof this.props.fnChange == "function") this.props.fnChange(va);
    }

    onValid(va, valid){
        if(this.props.fnValid && typeof this.props.fnValid == "function") this.props.fnValid(validate.valid(valid, va));
    }
}

Item.defaultProps = {
    type: "text",
    title: "",
    input: null,
    msg: "",
    validRes: true,
    validMsg: "",

    render: null,
    fnChange: null,
    fnValid: null
};

class T extends React.Component{
    render(){
        return <div className="may_form_item">
            <label className="may_form_item_title">{this.props.title ? this.props.title + "：" : ""}</label>
            <span className="may_form_input">{this.props.children}</span>
            <label className="cb"/>
            <label className="may_form_item_validblank"></label>
            <label className={"may_form_validres" + (this.props.validRes === true ? " valid" : (this.props.validRes ? " validating" : " unvalid"))}>
                {this.props.validRes == "validating" ? "验证中" : this.props.validRes ? this.props.msg : this.props.validMsg}
            </label>
            <label className="cb"/>
        </div>;
    }
}

T.defaultProps = {
    title: "",
    msg: "",
    validRes: true,
    validMsg: "",
};

Item.T = T;

export default Item;