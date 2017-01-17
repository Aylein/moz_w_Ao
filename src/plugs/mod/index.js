import React from "react";
import ReactDom from "react-dom";

import Alert from "./alert";

let div = document.getElementById("mod_div"), body = document.body;
if(!div){
    div = document.createElement("div");
    div.setAttribute("id", "mod_div");
    div.classList.add("mod_div")
    document.body.appendChild(div);
}

const Mod = {
    Alert: () => {
        body.classList.add("ofyh");
        body.classList.add("pr3");
        ReactDom.render(<Alert/>, div);
    }
}

export default Mod;