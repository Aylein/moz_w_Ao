import React from "react";
import {Form, Mod} from "../plugs";

import "../styles/index.less";
const validate = new Form.Valid();

class Index extends React.Component{
    constructor(){
        super();
        this.state = {
            columns: {
                va0: {type: "text", title: "va0", input: {className: "w18", value: "", name: "va0"}, validation: [
                    {type: "notEmpty", msg: "请填写v0"}
                ], msg: "va0", required: true},
                va1: {type: "select", title: "va1", input: {className: "w18", value: "", name: "va1", list: [
                    {value: 1, text: "1"},
                    {value: 2, text: "2"},
                    {value: 3, text: "3"}
                ]}, validation: [
                    {type: "notEmpty", msg: "请选择va1"}
                ], msg: "va1", required: true},
                va2: {type: "radio", title: "va2", input: {value: "", name: "va2", list: [
                    {value: 1, text: "1"},
                    {value: 2, text: "2"},
                    {value: 3, text: "3"}
                ]}, validation: [
                    {type: "notEmpty", msg: "请选择va2"},
                    {fn: (va, callback) => {
                        let res = {validRes: "validating", validMsg: ""};
                            setTimeout(() => {
                                //if(callback) 
                                    callback({name: "va2", res: {validRes: true, validMsg: "something wrong"}});
                                //else 
                                    //this.onValid(Object.assign({}, va, {res: {validRes: false, validMsg: "something wrong"}}));
                            }, 1500);
                        return res;
                    }}
                ], msg: "va2", required: true},
                va3: {type: "checkbox", title: "va3", input: {value: [], name: "va3", list: [
                    {value: 1, text: "1"},
                    {value: 2, text: "2"},
                    {value: 3, text: "3"}
                ]}, validation: [
                    {type: "notEmpty", msg: "请选择va3"}
                ], msg: "va3", required: true},
                va4: {type: "textarea", title: "va4", input: {className: "w25", value: "", name: "va4"}, msg: "va4"}
            },
            selectedId: "",
            display: false
        }

        this.data = [
            {id: 1, va0: "11111111", va1: 1, va2: 1, va3: [], va4: "11111111111\n1111111111111"},
            {id: 2, va0: "2222222222", va1: 2, va2: 2, va3: [1], va4: "22222222222\n22222222222222"},
            {id: 3, va0: "333333333333", va1: 3, va2: 3, va3: [1, 2], va4: "33333333333\n3333333333333"},
            {id: 4, va0: "4444444444", va1: "", va2: 2, va3: [1, 3], va4: "44444444444\n444444444444"},
            {id: 5, va0: "555555555", va1: 2, va2: 1, va3: [2, 3], va4: "555555555555\n555555555555"},
        ];

        this.onChang = this.onChang.bind(this);
        this.onValid = this.onValid.bind(this);
        this.onAsyncSubmit = this.onAsyncSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSend = this.onSend.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.makeForm = this.makeForm.bind(this);
    }

    render(){
        let comp = [];
        for(let key in  this.state.columns){
            comp.push(<Form.Item key={key} {...this.state.columns[key]} fnChange={this.onChang} fnValid={this.onValid}/>)
        }
        return <div>
            <Form.Button.Info text="mod" fnClick={() => {
                this.setState({display: true});
            }}/>
            <Mod.Item
                display={this.state.display} 
                fnClose={() => { this.setState({display: false}); }}
                title="可控弹出框"
            >
                <div className="mb1">这是一个可控弹出框</div>
                <Form.Button.Error className="mr1" text="error" fnClick={() => { this.setState({display: false}); }}/>
            </Mod.Item>
            <Form.miniForm
                fnSubmit={(va, callback) => {
                    callback({validRes: false, validMsg: "添加失败"}); 
                }}
                list={this.state.columns}
                buttons={[
                    {type: "submit", className: "info mr1", text: "ok"},
                    {type: "reset", className: "alter mr1", text: "reset"},
                    {type: "button", className: "success mr1", text: "alert", fnClick: () => {
                        // Mod.Alert.Alter({
                        //     title: "不可控弹出框",
                        //     content: "这是一个不可控弹出框"
                        // });
                        // Mod.Confirm({
                        //     title: "不可控弹出框",
                        //     content: "这是一个不可控弹出框",
                        //     fnOk: res => { alert(res); }
                        // });
                        Mod.Prompt({
                            title: "输入密码",
                            type: "password",
                            fnOk: res => { alert(res); return false; }
                        });
                    }}
                ]}
            />
            {/*<Form 
                fnSubmit={this.onSubmit} 
                fnReset={this.onReset}
            >
                {comp}
                <Form.Item.T>
                    <Form.Button.Info className="mr1" key={0} type="submit" text="ok"/>
                    <Form.Button.Info className="mr1" key={1} type="reset" text="reset"/>
                    <Form.Button.Info className="mr1" key={2} type="button" text="default" fnClick={() => { this.onUpdate(""); }}/>
                </Form.Item.T>
            </Form>*/}
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
        if(this.validation_res) this.validation_res = null;
        let obj = {}, input = Object.assign({}, this.state.columns[va.name].input, {value: va.value});
        obj[va.name] = Object.assign({}, this.state.columns[va.name], {input: input}, va.res ? va.res : {});
        this.setState({columns: Object.assign({}, this.state.columns, obj)});
    }

    onValid(va){
        let obj = {};
        obj[va.name] = Object.assign({}, this.state.columns[va.name], va.res);
        this.setState({columns: Object.assign({}, this.state.columns, obj)});
        if(this.validation_res && this.validation_res[va.name] && this.validation_res[va.name].validRes !== true && va.res.validRes == true)
            this.onAsyncSubmit(va);
    }

    onFormValid(){
        this.validation_res = {};
        for(let field in this.state.columns){
            let o = this.state.columns[field];
            if(o.validation){
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

    checkValid(obj){
        obj = obj || this.getValidFormValue();
        let res = true;
        for(let field in obj){
            let o = obj[field];
            if(o.validRes === "validating") return o.validRes;
            res = !res ? res : (o.validRes === false ? o.validRes : true);
        }
        return res;
    }

    onAsyncSubmit(va){
        if(this.validation_res && this.validation_res[va.name]) this.validation_res[va.name] = va.res;
        if(this.checkValid() === true) this.onSend();
    }

    onSubmit(){
        this.onFormValid();
        if(this.checkValid() === true) this.onSend();
    }

    onSend(){
        this.validation_res = null;
    }

    onReset(){
        this.onUpdate(this.state.selectedId);
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
            let obj = Object.assign({}, this.state.columns[field], {input: input}, {validRes: true, validMsg: ""});
            this.state.columns[field] = Object.assign({}, this.state.columns[field], obj);
        }
        this.setState({columns: this.state.columns});
    }
}

export default Index;