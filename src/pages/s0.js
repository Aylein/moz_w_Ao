import React from "react";
import {Form} from "../plugs";

import "../styles/index.less";

class Index extends React.Component{
    constructor(){
        super();
        this.state = {
            values: [
                {type: "text", value: "123", field: "va0"},
                {type: "select", value: 0, field: "va1", list: [
                    {value: 1, text: "1"},
                    {value: 2, text: "2"},
                    {value: 3, text: "3"}
                ]},
                {type: "radio", value: 2, field: "va2", list: [
                    {value: 1, text: "1"},
                    {value: 2, text: "2"},
                    {value: 3, text: "3"}
                ]},
                {type: "checkbox", value: [1, 2], field: "va2", list: [
                    {value: 1, text: "1"},
                    {value: 2, text: "2"},
                    {value: 3, text: "3"}
                ]}
            ],
            checkbox: {name: "va3", text: "va3", value: 1, checked: true},
            checkboxList: {name: "va4", defaultValue: [1, 2], list: [
                    {value: 1, text: "1"},
                    {value: 2, text: "2", disabled: true},
                    {value: 3, text: "3"}
            ]},
            radio: {name: "va5", text: "va5", value: 1, checked: true},
            radioList: {name: "va6", value: 2, list: [
                    {value: 1, text: "1"},
                    {value: 2, text: "2", disabled: true},
                    {value: 3, text: "3"}
            ]},
            text: {name: "va7", type: "text", value: "dsfsdf"},
            select: {name: "va8", defaultValue: 2, list: [
                    {value: 1, text: "1"},
                    {value: 2, text: "222222222222222222222222222"},
                    {value: 3, text: "3"}
            ]}
        }
        this.onFormChange = this.onFormChange.bind(this);
        this.p = Object.assign(this.state);
    }

    render(){
        return <div>
            <img src={require("../img/master.jpg")}/>
            <h1><font className="fa fa-times"/>this is Index</h1>
            <Form.CheckBox.Item {...this.state.checkbox}/>
            <Form.CheckBox fnClick={e => {
                //this.setState({checkboxList: Object.assign({}, this.state.checkboxList, {defaultValue: e.value})});
            }} {...this.state.checkboxList}/>
            <Form.Radio.Item {...this.state.radio}/>
            <Form.Radio fnClick={e => {
                this.setState({radioList: Object.assign({}, this.state.radioList, {value: e.value})});
            }} {...this.state.radioList}/>
            <Form.Text disabled={true} className="w10" {...this.state.text} fnChange={e => {
                this.setState({text: Object.assign({}, this.state.text, {value: e.value})});
            }}/>
            <Form.Select className="w15" {...this.state.select} fnChange={e => {
                //this.setState({select: Object.assign({}, this.state.select, {value: e.value})});
            }}/>
            <Form.Button.Info type="button" text="Info" icon="plus"/>
            <Form.Button.Warning type="button" text="Warning" icon="plus"/>
            <Form.Button.Error type="button" text="Error" icon="plus"/>
            <Form.Button.Alter type="button" text="Alter" icon="plus"/>
            <Form/>
            <Form.Form fnSubmit={() => { alert(2); }}>
                {this.state.values && this.state.values.length > 0 ? this.state.values.map((va, i) =>
                    <Form.Input key={i} fnChange={this.onFormChange} {...va}/>
                ) : null}
                <Form.Button type="submit" text="OK" fnClick={() => { alert(1); }}/>
            </Form.Form>
        </div>;
    }

    onFormChange(field, value){
        console.log(field, value);
        this.setState({values: this.state.values.map(va => {
            if(va.field == field) va.value = value;
            return va;
        })});
    }
}

export default Index;