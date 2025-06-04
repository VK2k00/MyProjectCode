import { LightningElement } from 'lwc';

import LightningPrompt from 'lightning/prompt'; //this module needs to import.


export default class AlertComponent extends LightningElement {

    async handlePromptClick() {

        const result = await LightningPrompt.open({

            message: 'Enter your name',

            theme: 'success',

            label: 'Name',

            defaultValue: 'John Wick',

        });

        if (result) {

            //User entered some value and clicked OK

            //Do something with result

        } else {

            //User clicked Cancel

            //Do something else

        }

    }

}