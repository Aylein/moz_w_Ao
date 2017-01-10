import React from "react";
import {Form} from "../plugs";

import "../styles/index.less";

class Index extends React.Component{
    constructor(){
        super();
        this.state = {
            columns: {
                va0: {type: "text", title: "va0000", input: {className: "w18", value: "123", name: "va0"}, msg: "va0"},
                va1: {type: "select", title: "va111", input: {className: "w18", value: 0, name: "va1", list: [
                    {value: 1, text: "1"},
                    {value: 2, text: "2"},
                    {value: 3, text: "3"}
                ]}, msg: "va1"},
                va2: {type: "radio", title: "va22", input: {value: 2, name: "va2", list: [
                    {value: 1, text: "1"},
                    {value: 2, text: "2"},
                    {value: 3, text: "3"}
                ]}, msg: "va2"},
                va3: {type: "checkbox", title: "va3", input: {value: [1, 2], name: "va3", list: [
                    {value: 1, text: "1"},
                    {value: 2, text: "2"},
                    {value: 3, text: "3"}
                ]}, msg: "va3"}
            }
        }

        this.onChang = this.onChang.bind(this);
    }

    render(){
        let comp = [];
        for(let key in  this.state.columns){
            comp.push(<Form.Item key={key} {...this.state.columns[key]} fnChange={this.onChang}/>)
        }
        return <div>
            <Form>{comp}</Form>
        </div>;
    }

    onChang(va){
        let obj = {}, input = Object.assign({}, this.state.columns[va.name].input, {value: va.value});
        obj[va.name] = Object.assign({}, this.state.columns[va.name], {input: input});
        this.setState({columns: Object.assign({}, this.state.columns, obj)});
    }
}

export default Index;