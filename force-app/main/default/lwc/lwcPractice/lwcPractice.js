import { LightningElement, track} from 'lwc';

export default class LwcPractice extends LightningElement {

ComapnyName = "Salesforce"
CompanyType = "CRM"
Clouds = "Service Cloud"


// ---------------@track Example
@track CompanyDetails = {
     Name : 'Gyansys',
     Location : 'Banglore',
     HeadQuarter : 'US'
}

changeHandler(event){
    this.Clouds = event.target.value

}

trackHandler(event){
    this.CompanyDetails.Location= event.target.value

}

// ----------------Getter Example

Users = ["john","Bob","Smith"]
num1 = 80
num2 = 70
get firstname(){
    return this.Users[0]
}
get sum(){
    return this.num1 + this.num2
}



}