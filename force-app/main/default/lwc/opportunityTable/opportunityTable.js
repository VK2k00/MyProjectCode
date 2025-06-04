import { LightningElement, wire } from 'lwc';
import getOpportunity from '@salesforce/apex/opportunityRecords.getOpportunity';
const columns=[
    {label:'Name',fieldName:'Name', editable:true},
    {label:'Account Id',fieldName:'AccountId',type:'text'},
    
]
export default class OpportunityTable extends LightningElement {
    
    columns = columns
    defaultValues = []


@wire(getOpportunity)
opportunity;


handleSave(event){
    console.log(event.detail.defaultValues)

}


}