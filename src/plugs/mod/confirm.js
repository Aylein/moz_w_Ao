import React from "react";
import "./styles/style.less";

import Form from "../may_form";
import Item from "./item";

class Confirm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display: true
        };

        this.onClose = this.onClose.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onOk = this.onOk.bind(this);
    }

    render(){
        return <Item
            display={this.state.display}
            title={this.props.title}
            fnClose={this.onClose}
        >
            <div className="mb1">{this.props.content}</div>
            <Form.Button.Warning className="mr1" text="confirm" fnClick={this.onOk}/>
            <Form.Button.Alter className="mr1" text="cancel" fnClick={this.onCancel}/>
        </Item>;
    }

    onOk(){
        let res = true;
        if(this.props.fnOk && typeof this.props.fnOk == "function") res = this.props.fnOk();
        if(res === false) return;
        this.setState({display: false});
    }

    onCancel(){
        let res = true;
        if(this.props.fnCancel && typeof this.props.fnCancel == "function") res = this.props.fnCancel();
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

Confirm.defaultProps = {
    title: "",
    content: "",
    type: "info",
    
    fnOk: null,
    fnCancel: null,
    fnClose: null
};

export default Confirm;