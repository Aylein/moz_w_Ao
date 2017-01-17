import React from "react";
import "./styles/style.less";

class Alert extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div className="mod_alert">
            <div className="mod_cover"></div>
            <div className="mod_alert_item"></div>
        </div>
    }
}

export default Alert;