import React from "react";
import "./styles/style.less";

const body = document.body;

class Item extends React.Component{
    constructor(props){
        super(props);

        this.onCoverClick = this.onCoverClick.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    render(){
        if(this.props.display){   
            body.classList.add("ofyh");
            body.classList.add("pr17px");
        }
        else{
            body.classList.remove("ofyh");
            body.classList.remove("pr17px");
        }
        return <div className={"mod_item" + (this.props.display ? " db" : " dn")}>
            <div className="mod_cover" onClick={this.onCoverClick}></div>
            <div className={"mod_alert_item" + (this.props.className ? " " + this.props.className : "")} style={this.props.style}>
                <div className="mod_title">{this.props.title}</div>
                <div className="mod_content">{this.props.children}</div>
                <font className="mod_alert_close fa fa-close" onClick={this.onClose}></font>
            </div>
        </div>;
    }

    onCoverClick(){
        let res = true;
        if(this.props.fnCoverClick && typeof this.props.fnCoverClick == "function") res = this.props.fnCoverClick();
        if(res === false) return;
        this.onClose();
    }

    onOpen(){
        this.setState({display: true});
    }

    onClose(){
        let res = true;
        if(this.props.fnClose && typeof this.props.fnClose == "function") res = this.props.fnClose();
    }
}

Item.defaultProps = {
    title: "",
    className: "",
    style: null,
    display: true,

    fnCoverClick: null,
    fnClose: null
};

export default Item;