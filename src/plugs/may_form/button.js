import React from "react";
import "./styles/style.less";

class Button extends React.Component{
    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }

    render(){
        return <label className="may_form_button">
            <button 
                type={["submit", "reset"].indexOf(this.props.type) > -1 && this.props.type || "button"}
                className={this.props.className + (this.props.icon ? " icon" : "")}
                onClick={this.onClick}
                disabled={this.props.disabled}
            >
                {this.props.icon ? <font className={"fa fa-" + this.props.icon}/> : null}
                {this.props.text}
            </button>
            <span className="cb"/>
        </label>
    }

    onClick(e){
        if(this.props.fnClick && typeof this.props.fnClick == "function") this.props.fnClick();
    }
}

Button.defaultProps = {
    className: "",
    type: "submit", // submit reset button
    text: undefined,

    disabled: false,
    icon: undefined,

    fnClick: undefined
};

["Info", "Warning", "Error", "Elter"].forEach(va => {
    Button[va] = props => <Button className={va.toLowerCase()} {...props}/>;
});

export default Button;