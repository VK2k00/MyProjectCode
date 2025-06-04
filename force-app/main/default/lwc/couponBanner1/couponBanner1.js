import { LightningElement, wire, track } from 'lwc';
import getActiveCampaign from '@salesforce/apex/CouponCampaignController.getActiveCampaign';

export default class CouponBanner1 extends LightningElement {
    @track campaign;
    formattedDate;

    @wire(getActiveCampaign)
    wiredCampaign({ error, data }) {
        if (data) {
            this.campaign = data;

            const date = new Date(data.End_Date__c);
            this.formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
        } else if (error) {
            console.error('Error fetching campaign:', error);
        }
    }

    handleOptIn() {
        alert('You have opted in!');
    }
}