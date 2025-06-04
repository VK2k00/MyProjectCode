import { LightningElement } from 'lwc';
import getAccountList from '@salesforce/apex/AccountDataController.getAccount';
export default class FetchAccount extends LightningElement {
    accountId;
    accountList=[];
    connectedCallback() {
        getAccountList()
            .then((result) => {
                this.accountList = result.map((currItem) => ({
                    label: currItem.Name,
                    value: currItem.Id, 
                }));
            })
            .catch((error) => {
                console.log('OUTPUT: ', JSON.stringify(error));
            });
        }
        handleChange(event){
this.accountId=event.target.value;
const childComponent= this.refs.childComp;
if(childComponent){
    childComponent.FetchAccountId(this.accountId);
}else{
    console.error('child component not found');
}
console.log('OUTPUT: ',this.accountId);
        }
    }