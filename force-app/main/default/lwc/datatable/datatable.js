import { LightningElement,wire } from 'lwc';
import getacc from '@salesforce/apex/getacc.getAccounts';
export default class Datatable extends LightningElement {

columns=[{label:'Name' ,fieldname:'accountName', type:'text'},
    {label:'LastName' ,fieldname:'LastName', type:'text'}];
    data=[];


@wire(getacc)
    wiredacc({data}){
        if(data){
            this.data= data.map(c =>({
                ...c,
                accountName:c.Account?.Name

            }));
        }
    
}

    
}