import React from "react";

class Item extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            display: props.display === undefined || props.display === null ? true : props.display
        };

        this.onClose = this.onClose.bind(this);
    }

    render(){
        return <div 
            className={"box_inline_item" + 
                (this.props.type ? " " + this.props.type : "") + 
                (this.props.className ? " " + this.props.className : "") + 
                (this.isDisplay() ? "" : " dn")
            }
        >
            <div className="box_inline_item_title">
                {this.props.showClose ? <font className="box_inline_item_close fa fa-close" onClick={this.onClose}/> : null}
            </div>
            {this.props.children}
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

Item.defaultProps = {
    className: "",
    type: "",
    display: undefined,
    defaultDisplay: undefined,
    showClose: true,
    
    fnClose: null
};

export default Item;