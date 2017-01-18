import React from "react";
import ReactDom from "react-dom";

import Item from "./item";
import Alert from "./alert";
import Confirm from "./confirm";
import Prompt from "./prompt";

const body = document.body;
const makeDiv = () => {
    let div = document.getElementById("mod_div");
    if(!div){
        div = document.createElement("div");
        div.setAttribute("id", "mod_div");
        div.classList.add("mod_div")
        document.body.appendChild(div);
    }
    return div;
};
const distroyDiv = () => {
    let div = document.getElementById("mod_div");
    if(div) body.removeChild(div);
};

const AlertMake = (opt) => {
    return <Alert 
        {...opt} 
        type={opt.type || "info"}
        fnClose={() => {
            let res = true;
            if(opt.fnClose && typeof opt.fnClose == "function") res = opt.fnClose();
            if(res !== false) distroyDiv();
            return res;
        }}
        fnOk={() => {
            let res = true;
            if(opt.fnOk && typeof opt.fnOk == "function") res = opt.fnOk();
            if(res !== false) distroyDiv();
            return res;
        }}
    />;
};
const makeAlert = type => {
    return (opt = {}) => {
        ReactDom.render(<AlertMake {...opt} type={type}/>, makeDiv());
    }
};
const ConfirmMake = (opt) => {
    return <Confirm 
        {...opt}
        fnClose={() => {
            let res = true;
            if(opt.fnClose && typeof opt.fnClose == "function") res = opt.fnClose();
            if(res !== false) distroyDiv();
            return res;
        }}
        fnOk={() => {
            let res = true;
            if(opt.fnOk && typeof opt.fnOk == "function") res = opt.fnOk(true);
            if(res !== false) distroyDiv();
            return res;
        }}
        fnCancel={() => {
            let res = true;
            if(opt.fnCancel && typeof opt.fnCancel == "function") res = opt.fnCancel(false);
            if(res !== false) distroyDiv();
            return res;
        }}
    />;
};
const PromptMake = (opt) => {
    return <Prompt 
        {...opt}
        fnClose={() => {
            let res = true;
            if(opt.fnClose && typeof opt.fnClose == "function") res = opt.fnClose();
            console.log(2, res);
            if(res !== false) distroyDiv();
            return res;
        }}
        fnOk={(va) => {
            let res = true;
            if(opt.fnOk && typeof opt.fnOk == "function") res = opt.fnOk(va);
            if(res !== false) distroyDiv();
            return res;
        }}
    />;
};

const Mod = {
    Alert: makeAlert("info"),
    Confirm: (opt = {}) => {
        ReactDom.render(<ConfirmMake {...opt}/>, makeDiv());
    },
    Prompt: (opt = {}) => {
        ReactDom.render(<PromptMake {...opt}/>, makeDiv());
    }
}
Mod.Alert.Info = Mod.Alert;
Mod.Alert.Error = makeAlert("error");
Mod.Alert.Alter = makeAlert("alter");
Mod.Alert.Warning = makeAlert("warning");
Mod.Alert.Success = makeAlert("success");
Mod.Item = Item;

export default Mod;