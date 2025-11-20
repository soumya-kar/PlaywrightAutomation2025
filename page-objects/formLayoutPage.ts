import {Page} from '@playwright/test'
import { HelperBase } from './helperBase';

export class FormLayoutPage extends HelperBase{

    constructor(page: Page){
       super(page);
    }

    async getFormByLabel(label: string){
        return this.page.locator(`form:has(label:text-is("${label}"))`);
    }

    async submitUsingGridForm(email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card').filter({hasText: 'Using the Grid'});
        await usingTheGridForm.getByRole('textbox', {name: 'email'}).fill(email);
        await usingTheGridForm.getByRole('textbox', {name: 'email'}).fill(password);
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true});
        await usingTheGridForm.getByRole('button').click();
    }

    async submitInlineForm(name: string, email: string, rememberMe: boolean){
        const usingInlineForm = this.page.locator('nb-card').filter({hasText: 'Inline form'});
        await usingInlineForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name);
        await usingInlineForm.getByRole('textbox', { name: 'Email'}).fill(email);
        if(rememberMe)
             await usingInlineForm.getByRole('checkbox').check({force: true});
    }

}
