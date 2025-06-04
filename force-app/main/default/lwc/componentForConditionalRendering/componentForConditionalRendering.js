import { LightningElement } from 'lwc';

export default class ComponentForConditionalRendering extends LightningElement {

IsVisible = true;
name
handleClick(){
    this.IsVisible= !this.IsVisible;

}

changehandle(event){
    this.name = event.target.value

}
get hellomethod(){
    return this.name === "hello"
}


}