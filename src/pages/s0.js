import React from "react";
import {Form, Mod, Msg, Pager, Box} from "../plugs";

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
                                callback({name: "va2", res: {validRes: true, validMsg: "something wrong"}});
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
            display: false,
            pageNo: 1
        }

        this.data = [
            {id: 1, va0: "11111111", va1: 1, va2: 1, va3: [], va4: "11111111111\n1111111111111"},
            {id: 2, va0: "2222222222", va1: 2, va2: 2, va3: [1], va4: "22222222222\n22222222222222"},
            {id: 3, va0: "333333333333", va1: 3, va2: 3, va3: [1, 2], va4: "33333333333\n3333333333333"},
            {id: 4, va0: "4444444444", va1: "", va2: 2, va3: [1, 3], va4: "44444444444\n444444444444"},
            {id: 5, va0: "555555555", va1: 2, va2: 1, va3: [2, 3], va4: "555555555555\n555555555555"},
        ];

        this.key = 0;
        this.type = ["Info", "Alter", "Warning", "Error", "Success"];
    }

    render(){
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
            <br />
            <br />
            <Box.Item>http://www.aylein.com</Box.Item>
            <br />
            <Box.Alter title="Aylein" showClose={false}>http://www.aylein.com</Box.Alter>
            <br />
            <Pager pageNo={this.state.pageNo} pageSIze="10" total="1024" totalPage="103" showNum={8} fnClick={(va) => {
                this.setState({pageNo: va})
            }}/>
            <br />
            <br />
            <Form.miniForm
                fnSubmit={(va, callback) => {
                    callback({validRes: false, validMsg: "添加失败"}); 
                }}
                list={this.state.columns}
                buttons={[
                    {type: "submit", className: "info mr1", text: "ok"},
                    {type: "reset", className: "alter mr1", text: "reset"},
                    {type: "button", className: "success mr1", text: "alert", fnClick: () => {
                        Msg[this.type[Math.ceil(Math.random() * 100) % 5]](++this.key * 1000);
                        // Mod.Alert({
                        //     title: "不可控弹出框",
                        //     content: "这是一个不可控弹出框"
                        // });
                        // Mod.Confirm({
                        //     title: "不可控弹出框",
                        //     content: "这是一个不可控弹出框",
                        //     fnOk: res => { alert(res); }
                        // });
                        // Mod.Prompt({
                        //     title: "输入密码",
                        //     type: "password",
                        //     fnOk: res => { alert(res); return false; }
                        // });
                    }}
                ]}
            />
            <br />
            {/*
                {this.data.map((va, i) => <div key={i}>
                <span className="w10 dib txc">{va.va0}</span>
                <span className="w10 dib txc">{va.va1}</span>
                <span className="w10 dib txc">{va.va2}</span>
                <span className="w10 dib txc">{va.va3}</span>
                <span className="w10 dib txc">{va.va4}</span>
                <span className="w10 dib txc"><a href="javascript: void(0);" onClick={() => { this.onUpdate(va.id); }}>→</a></span>
            </div>)}
            */}
        </div>;
    }
}

export default Index;