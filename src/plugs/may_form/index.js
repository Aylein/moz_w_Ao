import React from "react";
import Form from "./form";
import Input from "./input";
import Button from "./button";
import CheckBox from "./checkbox";
import Radio from "./radio";
import Text from "./text";
import Select from "./select";
import Item from "./item";
import Textarea from "./textarea";
import Valid from "./valid";

const validate = new Valid();

require("./styles/style.less");

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            columns: this.makeColumns(props.list || []),
            validRes: true,
            validMsg: "",
            submitDisabled: false
        }
        //if(Array.isArray(props.list)) this.state.columns = this.makeColumns(props);
        this.list = props.list;
        this.T = {};

        this.onChang = this.onChang.bind(this);
        this.onValid = this.onValid.bind(this);
        this.onValidRes = this.onValidRes.bind(this);
        this.onAsyncSubmit = this.onAsyncSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onReset = this.onReset.bind(this);
        this.makeRes = this.makeRes.bind(this);
    }

    render(){
        let comp = [], bts = [
            <Button.Info className="mr1" key={0} type="submit" text="ok" disabled={this.state.submitDisabled}/>,
            <Button.Alter className="mr1" key={1} type="reset" text="reset"/>
        ];
        for(let key in  this.state.columns){
            comp.push(<Form.Item key={key} {...this.state.columns[key]} fnChange={e => { 
                this.onChang(e, this.state.columns[key]); 
            }} fnValid={this.onValid}/>)
        }
        return <Form
                fnSubmit={this.onSubmit} 
                fnReset={this.onReset}
            >
                {comp}
                <Item.T validRes={this.state.validRes} validMsg={this.state.validMsg}>
                {this.props.buttons && this.props.buttons.length > 0 ? this.props.buttons.map((va, i) => 
                    <Button.Info className="mr1" key={i} {...va} {...va.type == "submit" ? {disabled: this.state.submitDisabled} : {}}/>
                ) : bts}
                </Item.T>
            </Form>;
    }

    componentWillUnmount() {
        Object.keys(this.T).forEach(va => { clearTimeout(va); });
    }

    onChang(value, column){
        if(this.validation_res) this.validation_res = null;
        if(column.fnChange && typeof column.fnChange == "function"){
            value = column.fnChange({value, column, columns: this.state.columns});
        }
        if(this.props.fnChange && typeof this.props.fnChange == "function"){
            value = this.props.fnChange({value, column, columns: this.state.columns});
        }
        value = Array.isArray(value) ? this.makeObj(value) : value;
        let arr = Object.keys(this.state.columns).map(key => {
            let co = this.state.columns[key];
            if(value[key] && key !== column.name && co.validation){
                value[key].res = {validMsg: "validating"};
                if(this.T[key]) clearTimeout(this.T[key]);
                this.T[key] = setTimeout(() => {
                    this.onValid({name: key, value: value[key].value, res: validate.valid(co.validation, value[key].value)});
                }, 10000);
            }
            return value[key] ? Object.assign(this.state.columns[key], {name: key, input: Object.assign(this.state.columns[key].input, {value: value[key].value})}, value[key].res) : this.state.columns[key];
        });
        this.setState({columns: this.makeObj(arr)});
    }

    onValid(va){
        let obj = {};
        obj[va.name] = Object.assign({}, this.state.columns[va.name], va.res);
        this.setState({columns: Object.assign({}, this.state.columns, obj)});
        if(this.validation_res && this.validation_res[va.name] && this.validation_res[va.name].validRes !== true && va.res.validRes == true)
            this.onAsyncSubmit(va);
    }

    onValidRes(res){
        this.onValid(res);
    }

    onFormValid(){
        this.validation_res = {};
        for(let field in this.state.columns){
            let o = this.state.columns[field];
            if(o.validation && !o.disabled){
                let res = validate.valid(o.validation, {name: field, value: o.input.value});
                this.validation_res[field] = res.res;
                this.state.columns[field] = Object.assign({}, o, res.res);
            }
        }
        this.setState({columns: this.state.columns});
    }

    getValidFormValue(){
        let res = {};
        for(let field in this.state.columns){
            let o = this.state.columns[field];
            res[field] = {name: o.input.name, value: o.input.value, validRes: o.validRes}
        }
        return res;
    }

    checkValid(type, obj = this.getValidFormValue()){
        let bo = type !== undefined && type !== null, res = bo ? false : true;
        for(let field in obj){
            let o = obj[field];
            if(bo){
                if(type === o.validRes){
                    res = true;
                    break;
                }
            }
            else{
                if(o.validRes === "validating") return o.validRes;
                res = !res ? res : (o.validRes === false ? o.validRes : true);
            }
        }
        return res;
    }

    onAsyncSubmit(va){
        if(this.validation_res && this.validation_res[va.name]) this.validation_res[va.name] = va.res;
        let _res = this.checkValid(false), res = this.checkValid();
        if(_res) this.setState({submitDisabled: false});
        else if(res === true) this.onSend();
    }

    onSubmit(){
        this.setState({validRes: true, validMsg: "", submitDisabled: true});
        this.onFormValid();
        let _res = this.checkValid(false), res = this.checkValid();
        if(_res) this.setState({submitDisabled: false});
        else if(res === true) this.onSend();
    }

    onSend(){
        if(this.props.fnSubmit && typeof this.props.fnSubmit == "function") this.props.fnSubmit(this.getValidFormValue(), this.makeRes);
        this.validation_res = null;
    }

    onReset(){
        this.setState({columns: this.makeColumns(this.list), validRes: true, validMsg: ""});
    }

    makeColumns(list){
        let columns = {};
        if(Array.isArray(list))
            list.forEach(va => {
                columns[va.input.name] = va;
            });
        else columns = list;
        for(let field in columns){
            let va = columns[field];
            va.name = field;
            if(va.validation){
                va.validation.callback = this.onValidRes.bind(this);
                va.validRes = true;
                va.validMsg = "";
            }
        }
        return columns;
    }

    makeObj(res_list){
        let obj = {};
        res_list.forEach(va => { obj[va.name] = va; });
        return obj;
    }

    makeRes(res){
        this.setState({validRes: res.validRes, validMsg: res.validMsg, submitDisabled: false});
    }
}

Index.defaultProps = {
    fnChange: null,
    fnSubmit: null,
    fnReset: null, 
    list: [],
    buttons: []
};

Form.miniForm = Index;
Form.Input = Input;
Form.Button = Button;
Form.CheckBox = CheckBox;
Form.Radio = Radio;
Form.Text = Text;
Form.Select = Select;
Form.Textarea = Textarea;
Form.Item = Item;
Form.Valid = Valid;

export default Form;