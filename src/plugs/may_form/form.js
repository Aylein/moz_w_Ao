import React from "react";

class Form extends React.Component{
    constructor(){
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    render(){
        return <form className={"may_form_form" + (this.props.className ? " " + this.props.className : "")} onSubmit={this.onSubmit} onReset={this.onReset}>
            {this.props.children}
        </form>
    }

    onSubmit(event){
        if(this.props.fnSubmit && typeof this.props.fnSubmit == "function") this.props.fnSubmit();
        event.preventDefault(); 
        return false; 
    }

    onReset(){
        if(this.props.fnReset && typeof this.props.fnReset == "function") this.props.fnReset();
    }
}

Form.defaultProps = {
    className: "",
    fnSubmit: undefined,
    fnReset: undefined
}

export default Form;