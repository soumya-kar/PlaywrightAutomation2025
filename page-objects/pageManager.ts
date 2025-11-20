import {expect, Page} from "@playwright/test";
import { NavigationPage } from "./navigationPage";
import { FormLayoutPage } from "./formLayoutPage";
import { DatePickerPage } from "./datePickerPage";

export class PageManager {
    readonly page: Page;
    readonly navigationPage: NavigationPage;
    readonly formLayoutPage: FormLayoutPage;
    readonly datePickerPage: DatePickerPage;  

    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(page);
        this.formLayoutPage = new FormLayoutPage(page);
        this.datePickerPage = new DatePickerPage(page);
    }

    get navigateTo() {
        return this.navigationPage;
    }

    get onFormLayoutPage() {
        return this.formLayoutPage;
    }

    get onDatePickerPage() {
        return this.datePickerPage;
    }
}