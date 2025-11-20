import {Page, expect} from '@playwright/test'
import { HelperBase } from './helperBase';

export class DatePickerPage extends HelperBase{
    
    constructor(page: Page){
        super(page);
    }

    async selectCommonDatePickerDate(numberOfDaysFromToday: number){
        const datepicker = this.page.getByPlaceholder('Form Picker');
        await datepicker.click();
        const dateToAssert = await this.selectDateInDatePicker(numberOfDaysFromToday);
        await expect(datepicker).toHaveValue(dateToAssert);
    }

    async selectDatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number){
        const calendarInputField = this.page.getByPlaceholder('Range Picker');
        await calendarInputField.click();

        const dateToAssertStart = await this.selectDateInDatePicker(startDayFromToday);
        const dateToAssertEnd = await this.selectDateInDatePicker(endDayFromToday);

        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`

        await expect(calendarInputField).toHaveValue(dateToAssert);

    }


    async selectDateInDatePicker(numberOfDaysFromToday: number){

        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        const expectedDate = date.getDate().toString();

        const monthShort = date.toLocaleString('En-US', {month: 'short'});
        const monthLong = date.toLocaleString('En-US', {month: 'long'});
        const fullYear = date.getFullYear();

        let calenderMonthAndYear: any = await this.page.locator('nb-calendar-view-mode').textContent();

        const requiredMonthYear = ` ${monthLong} ${fullYear} `

        while(!calenderMonthAndYear.includes(requiredMonthYear)){
            await this.page.locator('[data-name = "chevron-right"]').click();
            calenderMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        }

        // const dateValue = this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true});
        const dateValue = this.page.locator('.day-cell:not(.bounding-month)').getByText(expectedDate, { exact: true });
        await dateValue.click();

        return `${monthShort} ${expectedDate}, ${fullYear}`;

    }

}