import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from 'lightning/platformResourceLoader';
import generateCSV from '@salesforce/apex/AccountCSVGenerator.generateCSV';

export default class AccountCSV extends LightningElement {

    downloadCSV(csvData) {
        const element = document.createElement('a');
        element.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData);
        element.download = 'account_records.csv';
        document.body.appendChild(element);
        element.click();
    }

    showToast(title, message, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(toastEvent);
    }

    handleGenerateCSV() {
        generateCSV()
            .then(result => {
                this.downloadCSV(result);
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }
}