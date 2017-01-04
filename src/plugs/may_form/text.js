import React from "react";
import "./styles/style.less";

class Input extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            defaultValue: this.props.defaultValue || ""
        }
        this.onChange = this.onChange.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    render(){
        console.log(this.isControlled(), this.showClose(), this.state.defaultValue, this.state.defaultValue && this.state.defaultValue.length > 0)
        return <label className={this.props.className + (this.props.disabled ? " disabled" : "")}>
            <input 
                type={this.props.type}
                {...this.isControlled() ? {value: this.props.value} : {defaultValue: this.state.defaultValue}}
                disabled={this.props.disabled}
                onChange={this.onChange}
            />
            <font className={"fa fa-close " + (this.showClose() ? " db" : " dn")} onClick={this.onClose}/>
        </label>;
    }

    isControlled(){
        return this.props.value !== null && this.props.value !== undefined;
    }

    showClose(){
        return this.props.disabled ? false : (this.isControlled() ? this.props.value && this.props.value.length > 0 : this.state.defaultValue && this.state.defaultValue.length > 0);
    }

    onChange(e){
        if(this.props.disabled) return;
        if(this.props.fnChange && typeof this.props.fnChange == "function"){
            this.props.fnChange({name: this.props.name, value: e.target.value});
        }
        if(!this.isControlled()) this.setState({defaultValue: e.target.value});
    }

    onClose(){
        this.onChange({target: {value: ""}});
    }
}

Input.defaultProps = {
    className: "may_form_text",
    name: "",
    value: undefined,
    defaultValue: undefined,
    type: "text", //passworld text

    disabled: false,

    fnChange: null
}

export default Input;