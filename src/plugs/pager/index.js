import React from "react";

import Item from "./item";

require("./styles/style.less");

class Pager extends React.Component{
    constructor(){
        super();

        this.onClick = this.onClick.bind(this);
    }

    render(){
        let pref = this.props.pageNo > 1 ? this.props.pageNo - 1 : 1, next = this.props.pageNo < this.props.totalPage ? this.props.pageNo + 1 : this.props.totalPage;
        return <div className="pager_div">
            <Item icon="angle-double-left" className="pager_first" key="first" value={1} disabled={this.props.pageNo == 1} fnClick={this.onClick}/>
            <Item icon="angle-left" className="pager_pref" key="pref" value={pref} disabled={this.props.pageNo == pref} fnClick={this.onClick}/>
            {this.makePageList().map((va, i) => <Item key={i} text={va} className={va == this.props.pageNo ? "selected" : ""} value={va} disabled={this.props.pageNo == va} fnClick={this.onClick}/>)}
            <Item icon="angle-right" className="pager_next" key="next" value={next} disabled={next < 1 || this.props.pageNo == next} fnClick={this.onClick}/>
            <Item icon="angle-double-right" className="pager_last" key="last" value={this.props.totalPage} disabled={this.props.totalPage < 1 || this.props.pageNo == this.props.totalPage} fnClick={this.onClick}/>
        </div>;
    }

    makePageList(){
        let minN = Math.ceil(this.props.showNum / 2), minC = minN - 1, maxN = Math.floor(this.props.showNum / 2), maxC = this.props.totalPage - maxN;
        if(this.props.totalPage == 0) return [];
        else if(this.props.totalPage <= this.props.showNum) return this.makeArr(1, this.props.totalPage);
        else if(this.props.pageNo <= minN) return this.makeArr(1, this.props.showNum);
        else if(this.props.pageNo >= maxC) return this.makeArr(this.props.totalPage - this.props.showNum + 1, this.props.totalPage);
        else return this.makeArr(this.props.pageNo - minC, this.props.pageNo + maxN);
    }

    makeArr(n, m){
        let arr = [];
        for(let i = n; i <= m; i++) arr.push(i);
        return arr;
    }

    onClick(va){
        if(this.props.fnClick && typeof this.props.fnClick == "function") this.props.fnClick(va);
    }
}

Pager.defaultProps = {
    pageNo: 1,
    pageSize: 10,
    total: 0,
    totalPage: 0,

    showNum: 5,
    fnClick: null
};

Pager.Item = Item;

export default Pager;