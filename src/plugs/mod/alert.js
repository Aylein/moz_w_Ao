import React from "react";

import Form from "../may_form";
import Item from "./item";

class Alert extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display: true
        };

        this.onClose = this.onClose.bind(this);
        this.onOk = this.onOk.bind(this);
    }

    render(){
        return <Item
            display={this.state.display}
            title={this.props.title}
            fnClose={this.onClose}
        >
            <div className="mb1">{this.props.content}</div>
            <Form.Button className={"mr1" + (this.props.type ? " " + this.props.type : "")} text="ok" fnClick={this.onOk}/>
        </Item>;
    }

    onOk(){
        let res = true;
        if(this.props.fnOk && typeof this.props.fnOk == "function") res = this.props.fnOk();
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

Alert.defaultProps = {
    title: "",
    content: "",
    type: "info",
    
    fnOk: null,
    fnClose: null
};

export default Alert;