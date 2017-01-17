import {RegExp} from "../index";

/**
 * 验证类 基类 用于提供通用的验证方法
 */
export default class FormValid{
    constructor(){
        this.validObject = {
            valid: undefined,
            type: undefined,
            msg: undefined
        };
    }
    valid(validation, obj){
        let value = this.trim(obj.value);
        if(typeof validation == "function") return validation(va, validation.callback);
        let len = value.length;
        if(Array.isArray(validation)){
            for(let i = 0, z = validation.length; i < z; i++){
                let va = Object.assign({}, this.validObject, validation[i]), res = va.type !== undefined && this[va.type] !== undefined ? this[va.type](value, va.valid, va.op) : true;
                if(!res) return Object.assign({}, obj, {res: {validRes: false, validMsg: va.msg}});
                if(va.fn && typeof va.fn == "function" && (res = va.fn(obj, validation.callback)) && res.validRes !== true) return Object.assign({}, obj, {res: res});
            }
        }
        return Object.assign({}, obj, {res: {validRes: true, validMsg: ""}});
    }
    floatRegExp(num){
        return new window.RegExp("\\.\\d{" + num.toString() + "}");
    };
    charLength(val, typeLen = 3){
        var l = 0; 
        for (var i = 0; i < val.length; i++) { 
            var length = val.charCodeAt(i); 
            if (length >= 0 && length <= 128) l += 1; 
            else l += typeLen; 
        } 
        return l; 
    };
    trim(value){
        return value == null ? "" : (value + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
    notEmpty(value){
        return value !== null && value !== undefined && value.toString().length > 0;
    };
    notChinese(value){
        return value !== null && !RegExp.isChinese.test(value);
    };
    minCharLength(value, len, charLen = 3){
        return this.charLength(value, charLen) > len - 1;
    };
    maxCharLength(value, len, charLen = 3){
        return this.charLength(value, charLen) < len + 1;
    };
    minLength(value, len){
        return value.length > len - 1;
    };
    maxLength(value, len){
        return value.length < len + 1;
    };
    biggerThan(value, than){
        return value * 1 > than * 1;
    };
    smallerThan(value, than){
        return value * 1 < than * 1;
    };
    regExp(value, reg){
        return (value + "").length < 1 || reg.test(value.toString());
    };
    isFloat(value, bo = false){
        return (value + "").length < 1 || (bo ? RegExp.isFloat_l.test(value.toString()) : RegExp.isFloat.test(value.toString()));
    };
    isFloat2(value, float = 2){
        let exp = this.floatRegExp(float + 1);
        return (value + "").length < 1 || RegExp.isInt.test(value.toString()) || !exp.test(value.toString());
    };
    isNumber(value){
        return (value + "").length < 1 || RegExp.isNumber.test(value.toString());
    };
    isPhone(value){
        return (value + "").length < 1 || this.isTelephone(value) || RegExp.is400.test(value.toString()) || this.isMobile(value);
    };
    isTelephone(value){
        return (value + "").length < 1 || RegExp.isTelephone.test(value.toString()) || RegExp.is400.test(value.toString());
    };
    isMobile(value){
        return (value + "").length < 1 || RegExp.isMobile.test(value.toString());
    };
    isEmail(value){
        return (value + "").length < 1 || RegExp.isEmail.test(value.toString());
    };
}