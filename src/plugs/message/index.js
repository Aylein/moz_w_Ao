import React from "react";
import ReactDom from "react-dom";

import Item from "./item";

require("./styles/style.less");

const body = document.body;
const makeDiv = () => {
    let div = document.getElementById("msg_div");
    if(!div){
        div = document.createElement("div");
        div.setAttribute("id", "msg_div");
        div.classList.add("msg_div")
        document.body.appendChild(div);
    }
    return div;
};
const distroyDiv = () => {
    Msg.length = 0;
    Msg.list = [];
    let div = document.getElementById("msg_div");
    if(div) body.removeChild(div);
};

const MsgMake = opt => <Item {...opt}/>;
const makeMsg = type => (msg => {
    Msg.list.push(<MsgMake
        key={Msg.list.length + 1}
        msg={msg} 
        type={type} 
        autoClose={true}
        autoCloseCount={type == "error" ? 15000 : 7000}
        fnClose={() => {
            ++Msg.length > Msg.list.length && distroyDiv();
        }}
    />);
    ReactDom.render(<span>{Msg.list}</span>, makeDiv());
});

const Msg = {length: 0, list: []};
["Info", "Alter", "Warning", "Error", "Success"].forEach(va => {
    Msg[va] = makeMsg(va.toLowerCase());
});
Msg.Item = Item;

export default Msg;