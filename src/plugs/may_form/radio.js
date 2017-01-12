import React from "react";
import "./styles/style.less";

class RadioList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            defaultValue: this.props.value || undefined
        }
        this.onClick = this.onClick.bind(this);
    }

    render(){
        return <label className={"may_form_radio_list" + (this.props.className ? " " + this.props.className : "")}>
            {this.props.list.map((va, i) => 
                <Radio 
                    key={i} 
                    name={this.props.name} 
                    fnClick={this.onClick}
                    {...va}
                    //{...this.isConstrolled() ? {defaultChecked: this.isChecked(va.value)} : {checked: this.isChecked(va.value)}}
                    checked={this.isChecked(va.value)}
                />
            )}
        </label>;
    }

    isChecked(value){
        return this.isConstrolled() ? this.props.value === value : this.state.defaultValue === value;
    }

    isConstrolled(){
        return this.props.value !== null && this.props.value !== undefined;
    }

    getDisabled(){
        return this.props.list.filter(va => va.disabled == true);
    }

    onClick(e){
        if(this.props.fnClick && typeof this.props.fnClick == "function"){
            let controlled = this.isConstrolled(), disabled = this.getDisabled(), res = controlled ? this.props.value : this.state.defaultValue;
            if(disabled.length > 0 && disabled.map(va => va.value).indexOf(res) > -1) return;
            this.props.fnClick({name: this.props.name, value: e.value});
            if(!controlled) this.setState({defaultValue: e.defaultValue});
        }
    }
}

RadioList.defaultProps = {
    className: "",
    name: "",
    value: undefined,
    defaultValue: undefined,
    list: [],

    fnClick: null
};

class Radio extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            defaultValue: props.defaultValue,
            defaultChecked: props.defaultChecked || false
        }
        this.onClick = this.onClick.bind(this);
    }

    render(){
        let checked = this.isChecked();
        return <label className={"may_form_radio" + (this.props.disabled ? " disabled" : "")} onClick={this.onClick}>
            <font className={"fa" + (checked ? " fa-dot-circle-o" : " fa-circle")}/>{this.props.text}
        </label>;
    }

    isConstrolled(){
        return this.props.checked !== null && this.props.checked !== undefined;
    }

    isChecked(){
        return this.isConstrolled() ? this.props.checked : this.state.defaultChecked;
    }

    onClick(){
        if(this.props.disabled) return;
        let controlled = this.isConstrolled();
        if(this.props.fnClick && typeof this.props.fnClick == "function") 
            this.props.fnClick({field: this.props.name, value: this.props.value, checked: controlled ? !this.props.checked : !this.state.defaultChecked});
        if(!controlled) this.setState({defaultChecked: !this.state.defaultChecked});
    }
}

Radio.defaultProps = {
    text: "",
    name: "",
    value: "",
    checked: undefined,
    defaultChecked: undefined,

    disabled: false,

    //className: "",
    fnClick: null
};

RadioList.Item = Radio;

export default RadioList;