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
        return <label className={"may_form_text" + (this.props.disabled ? " disabled" : "")}>
            <input 
                className={this.props.className}
                type={this.props.type}
                {...this.isControlled() ? {value: this.props.value} : {defaultValue: this.state.defaultValue}}
                disabled={this.props.disabled}
                onChange={this.onChange}
            />
            <font className={"fa fa-close " + (this.showClose() ? " db" : " dn")} onClick={this.onClose}/>
            <span className="cb"/>
        </label>;
    }

    isControlled(){
        return this.props.value !== null && this.props.value !== undefined;
    }

    showClose(){
        return this.props.disabled || !this.isControlled() ? false : this.props.value && this.props.value.length > 0;
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
    className: "",
    name: "",
    value: undefined,
    defaultValue: undefined,
    type: "text", //passworld text

    disabled: false,

    fnChange: null
}

export default Input;