import React from "react";
import {Form} from "../plugs";

import "../styles/index.less";

class Index extends React.Component{
    constructor(){
        super();
        this.state = {
            columns: {
                va0: {type: "text", title: "va0", input: {className: "w18", value: "", name: "va0"}, msg: "va0"},
                va1: {type: "select", title: "va1", input: {className: "w18", value: "", name: "va1", list: [
                    {value: 1, text: "1"},
                    {value: 2, text: "2"},
                    {value: 3, text: "3"}
                ]}, msg: "va1"},
                va2: {type: "radio", title: "va2", input: {value: "", name: "va2", list: [
                    {value: 1, text: "1"},
                    {value: 2, text: "2"},
                    {value: 3, text: "3"}
                ]}, msg: "va2"},
                va3: {type: "checkbox", title: "va3", input: {value: [], name: "va3", list: [
                    {value: 1, text: "1"},
                    {value: 2, text: "2"},
                    {value: 3, text: "3"}
                ]}, msg: "va3"},
                va4: {type: "textarea", title: "va4", input: {className: "w25", value: "", name: "va4"}, msg: "va4"}
            },
            selectedId: ""
        }

        this.data = [
            {id: 1, va0: "11111111", va1: 1, va2: 1, va3: [], va4: "11111111111\n1111111111111"},
            {id: 2, va0: "2222222222", va1: 2, va2: 2, va3: [1], va4: "22222222222\n22222222222222"},
            {id: 3, va0: "333333333333", va1: 3, va2: 3, va3: [1, 2], va4: "33333333333\n3333333333333"},
            {id: 4, va0: "4444444444", va1: "", va2: 2, va3: [1, 3], va4: "44444444444\n444444444444"},
            {id: 5, va0: "555555555", va1: 2, va2: 1, va3: [2, 3], va4: "555555555555\n555555555555"},
        ];

        this.onChang = this.onChang.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.makeForm = this.makeForm.bind(this);
    }

    render(){
        let comp = [];
        for(let key in  this.state.columns){
            comp.push(<Form.Item key={key} {...this.state.columns[key]} fnChange={this.onChang}/>)
        }
        return <div>
            <Form 
                fnSubmit={() => { 
                    let obj = {};
                    for(let field in this.state.columns){
                        obj[field] = this.state.columns[field].input.value;
                    }
                    console.log(obj);
                }} 
                fnReset={() => { this.onUpdate(this.state.selectedId); }}
            >
                {comp}
                <Form.Item.T>
                    <Form.Button.Info className="mr1" key={0} type="submit" text="ok"/>
                    <Form.Button.Info className="mr1" key={1} type="reset" text="reset"/>
                    <Form.Button.Info className="mr1" key={2} type="button" text="default" fnClick={() => { this.onUpdate(""); }}/>
                </Form.Item.T>
            </Form>
            <br />
            {this.data.map((va, i) => <div key={i}>
                <span className="w10 dib txc">{va.va0}</span>
                <span className="w10 dib txc">{va.va1}</span>
                <span className="w10 dib txc">{va.va2}</span>
                <span className="w10 dib txc">{va.va3}</span>
                <span className="w10 dib txc">{va.va4}</span>
                <span className="w10 dib txc"><a href="javascript: void(0);" onClick={() => { this.onUpdate(va.id); }}>→</a></span>
            </div>)}
        </div>;
    }

    onChang(va){
        let obj = {}, input = Object.assign({}, this.state.columns[va.name].input, {value: va.value});
        obj[va.name] = Object.assign({}, this.state.columns[va.name], {input: input});
        this.setState({columns: Object.assign({}, this.state.columns, obj)});
    }

    onUpdate(id){
        this.setState({selectedId: id});
        let arr = this.data.filter(va => va.id === id);
        if(arr.length > 0) this.makeForm(arr[0]);
        else this.makeForm();
    }

    makeForm(va){
        for(let field in this.state.columns){
            let input = Object.assign({}, this.state.columns[field].input, {value: va && va[field] ? va[field] : ""});
            let obj = Object.assign({}, this.state.columns[field], {input: input});
            this.state.columns[field] = Object.assign({}, this.state.columns[field], obj);
        }
        this.setState({columns: this.state.columns});
    }
}

export default Index;