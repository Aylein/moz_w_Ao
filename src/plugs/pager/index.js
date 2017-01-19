import React from "react";

import Item from "./item";

require("./styles/style.less");

class Pager extends React.Component{
    constructor(){
        super();
    }

    render(){
        return <div className="pager_div"></div>;
    }
}

Pager.defaultProps = {

};

Pager.Item = Item;

export default Pager;