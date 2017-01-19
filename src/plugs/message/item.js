import React from "react";

class Item extends React.Component{
    constructor(){
        super();
        this.state = {
            display: true
        };
        
        this.onClick = this.onClick.bind(this);
    }

    render(){
        return <span 
            className={"msg_item" + 
                (this.props.className ? " " + this.props.className : "") + 
                (this.props.type ? " " + this.props.type : "") + 
                (this.state.display ? "" : " dn")}
            onClick={this.onClick}
        >
            {this.props.icon ? <font className={"fa fa-" + this.props.icon}/> : null}
            {this.props.msg}
        </span>;
    }

    componentDidMount(){
        if(this.props.autoClose) 
            setTimeout(() => {
                this.onClose();
            }, this.props.autoCloseCount);
    }
    

    onClick(){
        let res = true;
        if(this.props.fnClick && typeof this.props.fnClick == "function") res = this.props.fnClick();
        if(res !== false) this.onClose();
    }

    onClose(){
        if(this.props.fnClose && typeof this.props.fnClose == "function") this.props.fnClose();
        this.setState({display: false});
    }
}

Item.defaultProps = {
    autoClose: false,
    autoCloseCount: 7000,
    type: "info",
    msg: "",
    icon: "",
    className: "",

    fnClick: null,
    fnClose: null
};

export default Item;