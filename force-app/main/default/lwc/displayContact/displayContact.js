import { LightningElement,api,wire } from 'lwc';
import getcontactlist from '@salesforce/apex/AccountDataController.getContact';
export default class DisplayContact extends LightningElement {
    columns=[
        {label:"Name", fieldName:'Name'},
        {label:"AccountName", fieldName:'AccountName'},
        {label:"Contact Email", fieldName:'Email', type:'email'}

    ]
    accountId;
    contactList=[];
    contactNotFound;
    @api 
    fetchAccountId(value){
        this.accountId=value;
        console.log('in child: ',this.accountId);

    }
    @wire (getcontactlist,{accId:'$accountId'})
    contactData({data,error}){
        if(data){
            this.contactlist=data.map((contact)=>{
                let updatedObject={};
                if(!contact.hasOwnProperty('Email')){
                    updatedObject={...contact,AccountName:contact.Account?.Name,Email:'test@demop.com'};
                }else{
                    updatedObject={...contact,AccountName:contact.Account?.Name};
                }
                this.contactNotFound='';
                return updatedObject;
            }
            )
        }else{
            console.log('OUTPUT: ',JSON.stringify(error)); 
        }
        if(data && data.length === 0){
            this.contactNotFound='there are no releted contacts';
            this.contactList=[];
        }
    }
    get notFoundCSS(){
        return this.contactNotFound ? 'redError' : '';
    }
}