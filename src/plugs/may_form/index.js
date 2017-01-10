import React from "react";
import Form from "./form";
import Input from "./input";
import Button from "./button";
import CheckBox from "./checkbox";
import Radio from "./radio";
import Text from "./text";
import Select from "./select";
import Item from "./item";

class Index extends React.Component{
    render(){
        return <Form>

        </Form>
    }
}

Index.defaultProps = {
    fnSubmit: null,
    fnReset: null,
    list: [],
    buttons: []
};

Form.miniForm = Index;
Form.Input = Input;
Form.Button = Button;
Form.CheckBox = CheckBox;
Form.Radio = Radio;
Form.Text = Text;
Form.Select = Select;
Form.Item = Item;

export default Form;