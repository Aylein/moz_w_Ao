import React from "react";
import Form from "./form";
import Input from "./input";
import Button from "./button";
import CheckBox from "./checkbox";
import Radio from "./radio";
import Text from "./text";
import Select from "./select";

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

Index.Form = Form;
Index.Input = Input;
Index.Button = Button;
Index.CheckBox = CheckBox;
Index.Radio = Radio;
Index.Text = Text;
Index.Select = Select;

export default Index;