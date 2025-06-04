import { LightningElement, wire} from 'lwc';
import getAccount from '@salesforce/apex/AccountController.getAccountController';

export default class ApexDemo extends LightningElement {
    results

    @wire(getAccount)
    wireAccounts({data,error}){
        if(data){
           this.results = data
        }
        if(error){
         console.error(error)
        }
    }
}