import React from "react";

class Item extends React.Component{
    constructor(){
        super();
    }

    render(){
        return <span className="pager_item">{this.props.text}</span>;
    }
}

Item.defaultProps = {
    className: "",
    text: ""
};

export default Item;