import { LightningElement ,wire} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_INFO from '@salesforce/schema/Account'
export default class GetObjectInfoDemo extends LightningElement {
   defaultRecordTypeId
@wire(getObjectInfo,{objectApiName: ACCOUNT_INFO })
objectInfo({data,error}){
    if(data){
       console.log(data)
       this.defaultRecordTypeId = data.defaultRecordTypeId
    }
    if(error){
        console.error(error)

    }
}
}