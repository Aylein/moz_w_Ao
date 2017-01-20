import Form from "./may_form";
import Mod from "./mod";
import Msg from "./message";
import Pager from "./pager"

const RegExp = {
    isNumber: /^\d+$/, 
    isInt: /^[\-0-9][0-9]{0,11}$/, 
    isFloat_l: /^[\-\d]+(\.[\d]+)?$/, 
    isFloat: /^[\-\d]{0,11}(\.[\d]{1,4})?$/, 
    isEmail: /^[\w\-_\.]+@[\w]+(\.[a-z\d]+)+$/, 
    isMobile: /^[1][3|5|7|8][\d]{9}$/, 
    isTelephone: /^(\d{3,4}[\-|\s])?\d{7,8}$/, 
    is400: /^400-[\d]{3,4}-[\d]{4,6}$/,
    isChinese: /[\u4E00-\u9FA5]/,
    _byte: /[^\x00-\xff]/ig, 
    blank: /\s+/,

    toFix: (n) => {

    }
};

export {RegExp, Form, Mod, Msg, Pager};