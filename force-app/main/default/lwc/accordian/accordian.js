import { LightningElement } from 'lwc';

export default class Accordian extends LightningElement {
    activeSectionMessage = "";

    handleToggleChange(event) {
        this.activeSectionMessage = 'Open the section:  ' + event.detail.openSections;
    }

    handleSetActiveSections() {
        const accordion = this.template.querySelector('.example-accordian');
        accordion.activeSectionName = 'C';
    }
}