import {Page} from '@playwright/test';


export class HelperBase {

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }   

    async waitForTimeout(milliseconds: number){
        await this.page.waitForTimeout(milliseconds);
    }

}

