import React from "react";

import Item from "./item";

import "./styles/style.less";

class Box extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display: props.display === undefined || props.display === null ? true : props.display
        };

        this.onClose = this.onClose.bind(this);
    }

    render(){
        return <div 
            className={"box_inline" + 
                (this.props.type ? " " + this.props.type : "") + 
                (this.props.className ? " " + this.props.className : "") + 
                (this.isDisplay() ? "" : " dn")
            }
        >
            <div className="box_inline_title">
                {this.props.title}
                {this.props.showClose ? <font className="box_inline_close fa fa-close" onClick={this.onClose}/> : null}
            </div>
            <div className="box_inline_content">
                {this.props.children}
            </div>
        </div>
    }

    isControlled(){
        return this.props.display !== null && this.props.display !== undefined;
    }

    isDisplay(){
        return this.isControlled() ? this.props.display : this.state.display;
    }

    onClose(){
        let res = true;
        if(this.props.fnClose && typeof this.props.fnClose == "function") res = this.props.fnClose();
        if(res === false) return;
        if(!this.isControlled()) this.setState({display: !this.state.display});
    }
}

Box.defaultProps = {
    className: "",
    type: "",
    display: undefined,
    defaultDisplay: undefined,
    showClose: true,

    title: "",
    
    fnClose: null
};

["Info", "Warning", "Error", "Alter", "Success"].forEach(va => {
    Box[va] = props => <Box {...props} type={va.toLowerCase()}/>;
});
["Info", "Warning", "Error", "Alter", "Success"].forEach(va => {
    Item[va] = props => <Item {...props} type={va.toLowerCase()}/>;
});

Box.Item = Item;

export default Box;