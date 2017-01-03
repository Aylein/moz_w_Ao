import React from "react";

class Input extends React.Component{
    constructor(){
        super();
        this.makeInput = this.makeInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render(){
        return this.makeInput();
    }

    makeInput(){
        switch(this.props.type){
            case "radio":
                return <span>
                    {this.props.list && this.props.list.length > 0 ? this.props.list.map((va, i) => 
                        <label key={i}><input 
                            type={this.props.type}
                            name={this.props.field}
                            //defaultValue={va.defaultValue}
                            defaultChecked={this.props.value ? this.props.value == va.value : undefined}
                            //value={va.value}
                            //checked={this.props.value ? this.props.value == va.value : undefined}
                            //onChange={this.onChange}
                        />{va.text}</label>
                    ) : null}
                </span>;
            case "checkbox":
                return <span>
                    {this.props.list && this.props.list.length > 0 ? this.props.list.map((va, i) => 
                        <label key={i}><input 
                            type={this.props.type}
                            name={this.props.field}
                            defaultChecked={this.props.value && Array.isArray(this.props.value) ? this.props.value.indexOf(va.value) > -1 : undefined}
                            value={va.value}
                            //checked={this.props.value ? this.props.value == va.value : undefined}
                            //onChange={this.onChange}
                        />{va.text}</label>
                    ) : null}
                </span>;
            case "select": 
                return <select
                    className={this.props.className}
                    defaultValue={this.props.defaultValue}
                    value={this.props.value}
                    defaultValue={this.props.defaultValue}
                    onChange={this.onChange}
                >
                    <option value="">请选择</option>
                    {this.props.list && this.props.list.length > 0 ? this.props.list.map((va, i) => 
                        <option key={i} value={va.value}>{va.text}</option>
                    ) : null}
                </select>
                break;
            default: 
                return <input 
                    type={this.props.type}
                    className={this.props.className}
                    value={this.props.value}
                    defaultValue={this.props.defaultValue}
                    onChange={this.onChange}
                />
        }
    }

    onChange(event){
        if(this.props.fnChange && typeof this.props.fnChange == "function") this.props.fnChange(this.props.field, event.currentTarget.value);
    }
}

Input.defaultProps = {
    type: "text", // select radio checkbox password textare
    field: "",
    className: "",
    
    value: undefined,
    defaultValue: undefined,

    list: [], //[{text: "", value: ""}]

    fnChange: undefined
}

export default Input;