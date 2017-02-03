import React from "react";

import "./styles/style.less";

class Com extends React.Component{
    constructor(){
        super();
    }

    render(){
        return <div 
            className={
                "may_com_main" + 
                (this.props._index > 0 ? "" : " may_com_first") + 
                (this.props._index > this.props.showIndex ? " may_com_mini" : "")
            }
        >
            {this.props._index <= this.props.showIndex ? this.makeChild() : null}
            <div className="may_com_content">
                <img className="may_com_master" src={require("../../img/master.jpg")}/>
                <div className="may_com_content_main">
                    XXXXX - xxxxxxxx<br/>
                    xxxxxxxx xxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxx xxxxxxx<br/>
                    xxxxxxxxxxxx xxxxxxxxx xxxxxxxxxxxxxx xxxxxxxxxxxxx xxxxxxxx xxxxxxxx<br/>
                    xxxxxxxxxxxxxxxx<br/>
                    <br/>
                    xxxxx - xxxxx - xxxx
                </div>
            </div>
        </div>;
    }

    makeChild(){
        if(!this.props.child) return null;
        if(this.props.child && this.props._index < this.props.showIndex) return <Com {...this.props.child} _index={this.props._index + 1}/>;
        else{
            let list = this.getChild(this.props);
            return list.map((va, i) => <Com key={i} {...va} _index={this.props._index + 1}/>)
        }
    }

    getChild(obj, list){
        var list = list || [];
        if(obj.child){
            list.push(obj.child);
            this.getChild(obj.child, list);
        }
        return list;
    }
}

Com.defaultProps = {
    _index: 0,
    showIndex: 3,
    child: undefined
};

export default Com;