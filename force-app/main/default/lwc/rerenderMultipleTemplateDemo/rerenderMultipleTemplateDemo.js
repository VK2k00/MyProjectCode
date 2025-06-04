import { LightningElement } from 'lwc';
import signUpTemplate from "./signUpTemplate.html";
import signInTemplate from "./signInTemplate.html";
import rerenderMultipleTemplateDemo from "./rerenderMultipleTemplateDemo.html";
export default class RerenderMultipleTemplateDemo extends LightningElement {

selected = null;
render(){
    return this.selected === 'Sign Up' ? signUpTemplate:
     this.selected === 'Sign In' ? signInTemplate:
     rerenderMultipleTemplateDemo

}
handleclick(event){
this.selected = event.target.label

}

submitHandler(event){
    if(event.target.label === 'Sign In'){
        console.log("Sign In Successfully")
    } else if (event.target.label === 'Sign Up'){
        console.log("Sign Up Successfully")
    } else {
    
}
}
}