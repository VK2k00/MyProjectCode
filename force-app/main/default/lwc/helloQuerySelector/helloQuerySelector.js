import { LightningElement } from 'lwc';

export default class HelloQuerySelector extends LightningElement {
 userNames=[ "mike","john","nik","smith"]
    featchHandler(){

        // Query Selector---------------
            const elem = this.template.querySelector('h1')
            elem.style.border="1px solid red";
            console.log(elem.innerText)

            // Query SelectorAll---------------
            const userElements =this.template.querySelectorAll('.name')
            Array.from(userElements).forEach(item=>{
                console.log(item.innerText)

                item.setAttribute("title",item.innerText)
                
            })


            const childElem=this.template.querySelector('.child')
            childElem.innerHTML= '<p> im a child element</p>'
    }
}