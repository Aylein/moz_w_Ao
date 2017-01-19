import React from "react";

class Textarea extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            defaultValue: this.props.defaultValue || ""
        }
        this.onChange = this.onChange.bind(this);
    }

    render(){
        return <label className={"may_form_textarea" + (this.props.disabled ? " disabled" : "")}>
            <textarea 
                className={this.props.className}
                type={this.props.type}
                {...this.isControlled() ? {value: this.props.value} : {defaultValue: this.state.defaultValue}}
                disabled={this.props.disabled}
                onChange={this.onChange}
                rows={this.props.rows}
            />
        </label>;
    }

    isControlled(){
        return this.props.value !== null && this.props.value !== undefined;
    }

    onChange(e){
        if(this.props.disabled) return;
        if(this.props.fnChange && typeof this.props.fnChange == "function"){
            this.props.fnChange({name: this.props.name, value: e.target.value});
        }
        if(!this.isControlled()) this.setState({defaultValue: e.target.value});
    }
}

Textarea.defaultProps = {
    className: "",
    name: "",
    value: undefined,
    defaultValue: undefined,
    rows: 5,

    disabled: false,

    fnChange: null
}

export default Textarea;