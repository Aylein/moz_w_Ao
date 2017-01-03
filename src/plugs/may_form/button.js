import React from "react";

class Button extends React.Component{
    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }

    render(){
        return <input 
            type={["submit", "reset"].indexOf(this.props.type) > -1 && this.props.type || "button"}
            className={this.props.className}
            value={this.props.value}
            onClick={this.onClick}
        />
    }

    onClick(e){
        if(this.props.fnClick && typeof this.props.fnClick == "function") this.props.fnClick();
    }
}

Button.defaultProps = {
    type: "submit", // submit reset button
    className: "",
    value: undefined,

    fnClick: undefined
}

export default Button;