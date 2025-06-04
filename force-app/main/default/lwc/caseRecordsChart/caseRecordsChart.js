import { LightningElement,wire} from 'lwc';
import getcases from '@salesforce/apex/caseRecords.getcases';
const columns=[
    {label:'Case Number',fieldName:'CaseNumber',type:'text'},
    {label:'Owner',fieldName:'OwnerId',type:'text'},
]
export default class CaseRecordsChart extends LightningElement {
    columns = columns
    draftValues = []

@wire(getcases)
wireCase;

Handler(event){
    console.log(event.detail.draftValues)
}


}