import React from "react";

class CheckBoxList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value || []
        }
        this.onClick = this.onClick.bind(this);
    }

    render(){
        return <label className={this.props.className}>
            {this.props.list.map((va, i) => 
                <CheckBox 
                    key={i} 
                    name={this.props.name} 
                    {...this.isConstrolled() ? {defaultChecked: this.isChecked(va.value)} : {checked: this.isChecked(va.value)}}
                    fnClick={this.onClick}
                    {...va}
                />
            )}
        </label>;
    }

    isChecked(value){
        return this.isConstrolled() ? this.props.defaultValue.indexOf(value) > -1 : this.state.value.indexOf(value) > -1;
    }

    isConstrolled(){
        return this.props.defaultValue !== null && this.props.defaultValue !== undefined;
    }

    onClick(e){
        if(this.props.fnClick && typeof this.props.fnClick == "function"){
            let controlled = this.isConstrolled(), res = controlled ? Object.assign([], this.props.defaultValue) : Object.assign([], this.state.value);
            if(e.checked) res.push(e.value);
            else res = res.filter(va => va !== e.value);
            this.props.fnClick({name: this.props.name, value: res});
            if(!controlled) this.setState({value: res});
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
            value: props.value,
            checked: props.checked || false
        }
        this.onClick = this.onClick.bind(this);
    }

    render(){
        let checked = this.isChecked();
        return <label className={this.props.className} onClick={this.onClick}>
            <font className={"fa " + (checked ? "fa-check-square" : "fa-square")}/>{this.props.text}
        </label>;
    }

    isConstrolled(){
        return this.props.defaultChecked !== null && this.props.defaultChecked !== undefined;
    }

    isChecked(){
        return this.isConstrolled() ? this.props.defaultChecked : this.state.checked;
    }

    onClick(){
        let controlled = this.isConstrolled();
        if(this.props.fnClick && typeof this.props.fnClick == "function") 
            this.props.fnClick({field: this.props.name, value: this.props.value, checked: controlled ? !this.props.defaultChecked : !this.state.checked});
        if(!controlled) this.setState({checked: !this.state.checked});
    }
}

CheckBox.defaultProps = {
    text: "",
    name: "",
    value: "",
    checked: undefined,
    defaultChecked: undefined,

    className: "cp",
    fnClick: null
};

CheckBoxList.Item = CheckBox;

export default CheckBoxList;