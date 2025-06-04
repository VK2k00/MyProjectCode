import { LightningElement,wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
export default class DataTableAcc extends LightningElement {

accounts;
error;
columns=[
    {label: 'Account Name',fieldName: 'Name'},
    {label: 'Phone',fieldName: 'Phone'},
    {label: 'Industry',fieldName: 'Industry'},
];
@wire(getAccounts)
wiredAccounts({error,data}) {
    if (data) {
        this.accounts=data;
    } else if (error){
this.error= error;
    }}
    
}