import React from "react";
import "./styles/style.less";

class Select extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected: false,
            defaultValue: props.defaultValue || ""
        }
        this.onLabelClick = this.onLabelClick.bind(this);
        this.onOptionClick = this.onOptionClick.bind(this);
    }

    render(){
        return <label className="may_form_select" tabIndex="1" onBlur={() => { this.setState({selected: false}); }}>
            <span 
                className={this.props.className + (this.props.disabled ? " disabled" : "")} 
                onClick={this.onLabelClick}
            >{(this.getSelected() || {text: "请选择"}).text}</span>
            <font className={"fa fa-" + (!this.props.disabled && this.state.selected ? "chevron-up" : "chevron-down")} onClick={this.onLabelClick}/>
            <ul className={!this.props.disabled && this.state.selected ? "db" : "dn"}>
                <li value="" className={this.isSelected("") ? "selected" : ""} onClick={() => { this.onOptionClick("");} }>请选择</li>
                {this.props.list.map((va, i) => 
                    <li 
                        key={i} 
                        value={va.value} 
                        className={this.isSelected(va.value) ? "selected" : ""} 
                        onClick={() => { this.onOptionClick(va.value);} }
                    >{va.text}</li>
                )}
            </ul>
        </label>
    }

    isControlled(){
        return this.props.value !== null && this.props.value !== undefined;
    }

    isSelected(va){
        let controlled = this.isControlled();
        return controlled ? this.props.value === va : this.state.defaultValue === va;
    }

    getSelected(){
        let value = this.isControlled() ? this.props.value : this.state.defaultValue, va = this.props.list.filter(va => va.value === value);
        return va.length > 0 ? va[0] : undefined;
    }

    onLabelClick(){
        if(!this.props.disabled) this.setState({selected: !this.state.selected});
    }

    onOptionClick(va){
        let controlled = this.isControlled();
        if(this.props.fnChange && typeof this.props.fnChange == "function"){
            this.props.fnChange({name: this.props.name, value: va});
        }
        this.setState({defaultValue: va, selected: false});
    }
}

Select.defaultProps = {
    disabled: false,
    value: undefined,
    defaultValue: undefined,

    list: [],

    fnChange: undefined
};

export default Select;