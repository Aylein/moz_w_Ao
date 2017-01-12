import React from "react";
import "./styles/style.less";

class CheckBoxList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            defaultValue: this.props.defaultValue || []
        }
        this.onClick = this.onClick.bind(this);
    }

    render(){
        return <label className={"may_form_checkbox_list" + (this.props.className ? " " + this.props.className : "")}>
            {this.props.list.map((va, i) => 
                <CheckBox 
                    key={i} 
                    name={this.props.name} 
                    {...this.isConstrolled() ? {checked: this.isChecked(va.value)} : {defaultChecked: this.isChecked(va.value)}}
                    fnClick={this.onClick}
                    {...va}
                />
            )}
        </label>;
    }

    isChecked(value){
        return this.isConstrolled() ? this.props.value.indexOf(value) > -1 : this.state.defaultValue.indexOf(value) > -1;
    }

    isConstrolled(){
        return this.props.value !== null && this.props.value !== undefined;
    }

    onClick(e){
        if(this.props.fnClick && typeof this.props.fnClick == "function"){
            let controlled = this.isConstrolled(), res = controlled ? Object.assign([], this.props.value) : Object.assign([], this.state.defaultValue);
            if(e.checked) res.push(e.value);
            else res = res.filter(va => va !== e.value);
            this.props.fnClick({name: this.props.name, value: res});
            if(!controlled) this.setState({defaultValue: res});
        }
    }
}

CheckBoxList.defaultProps = {
    className: "",
    name: "",
    value: undefined,
    defaultValue: undefined,
    list: [],

    fnClick: null
};

class CheckBox extends React.Component{
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
        return <label className={"may_form_checkbox" + (this.props.disabled ? " disabled" : "")} onClick={this.onClick}>
            <font className={"fa" + (checked ? " fa-check-square" : " fa-square")}/>{this.props.text}
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

CheckBox.defaultProps = {
    text: "",
    name: "",
    value: "",
    checked: undefined,
    defaultChecked: undefined,

    disabled: false,

    //className: "",
    fnClick: null
};

CheckBoxList.Item = CheckBox;

export default CheckBoxList;