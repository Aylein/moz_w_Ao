import React from "react";
import "./styles/style.less";

import Form from "../may_form";
import Item from "./item";

class Prompt extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display: true,
            text: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onOk = this.onOk.bind(this);
    }

    render(){
        return <Item
            display={this.state.display}
            title={this.props.title}
            fnClose={this.onClose}
        >
            <div className="mb1"><Form.Text className="w39" type={this.props.type} value={this.state.text} fnChange={this.onChange}/></div>
            <Form.Button.Info className="mr1" text="ok" fnClick={this.onOk}/>
        </Item>;
    }

    onChange(va){
        this.setState({text: va.value});
    }

    onOk(){
        let res = true;
        if(this.props.fnOk && typeof this.props.fnOk == "function") res = this.props.fnOk(this.state.text);
        if(res === false) return;
        this.setState({display: false});
    }

    onClose(){
        let res = true;
        if(this.props.fnClose && typeof this.props.fnClose == "function") res = this.props.fnClose();
        if(res === false) return;
        this.setState({display: false});
    }
}

Prompt.defaultProps = {
    type: "text",
    title: "",
    
    fnOk: null,
    fnClose: null
};

export default Prompt;