import {expect, test} from '@playwright/test';


test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200')
});


test.describe('Form layout page', ()=>{

    test.beforeEach( async({page})=>{
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click()
    });

    test('input fields', async({page})=>{
        const usingTheGridForm = page.locator('nb-card').filter({hasText: 'Using the Grid'});
        const emailGrid = usingTheGridForm.getByRole('textbox', {name: 'email'});
        await emailGrid.fill('test@test.com');
        await emailGrid.clear()
        await emailGrid.pressSequentially('email@test.com');
        await emailGrid.clear()
        await emailGrid.pressSequentially('test', {delay:500});

        // generic assertion
        const inputValue = await emailGrid.inputValue();
        expect(inputValue).toEqual('test');

        // locator assertion
        await expect(emailGrid).toHaveValue('test')

    });

    test('radio buttons', async({page})=>{
        const usingTheGridForm = page.locator('nb-card').filter({hasText: 'Using the Grid'});

        // radio button with getByLabel

        await usingTheGridForm.getByLabel('Option 1').check({force: true})

        await usingTheGridForm.getByLabel('Option 2').check({force: true})

        // radio button with getByRole
        await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true})
        const radioStatus =  await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()

        expect(radioStatus).toBeTruthy()

        await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked()

        await usingTheGridForm.getByLabel('Option 2').check({force: true})

         await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).not.toBeChecked()
    })

});


test('Checkboxes', async({page})=>{
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true});
    await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true});

    const allBoxes = page.getByRole('checkbox');
    for(const box of await allBoxes.all()){
        await box.check({force: true});
        expect(await box.isChecked()).toBeTruthy();
    }

})

test('List and dropdowns', async({page})=>{
    
    const themeMenu = page.locator('ngx-header nb-select');

    await themeMenu.click();

    page.getByRole('list'); // when the list has ul tag
    page.getByRole('listitem'); // when the list has li tag

   // const optionList = page.getByRole('list').locator('nb-option');
   const optionList = page.locator('nb-option-list nb-option');

   expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);

   await optionList.filter({hasText: 'Dark'}).click();

   const header = page.locator('nb-layout-header').first();
    await expect(header).toHaveCSS('background-color', 'rgb(34, 43, 69)');

    const colors: any = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }
    await themeMenu.click();
    for(const color in colors){
        await optionList.filter({hasText: color}).click();
        await expect(header).toHaveCSS('background-color', colors[color]);
        if(color != 'Corporate')
            await themeMenu.click();
    }

})


test('Tooltips', async({page})=>{
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    const tooltipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'});
    await tooltipCard.getByRole('button', {name: 'Top'}).hover();

    const toollipMsg = await page.locator('nb-tooltip').textContent();

    expect(toollipMsg).toEqual('This is a tooltip')

})


test('Dialog box', async({page})=>{
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();


    page.on('dialog', dialog =>{
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        dialog.accept()
    })
    const trashIcon = page.locator('table').locator('tr', {hasText:'mdo@gmail.com'}).locator('.nb-trash');
    await trashIcon.click();

    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com');
});

test('Web table', async({page})=>{

    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    // 1. get the row by any value in this row

    const targetRow = page.getByRole('row').filter({hasText:'fat@yandex.ru'});

    await targetRow.locator('.nb-edit').click();

    await page.locator('input-editor').getByPlaceholder('Age').clear();

    await page.locator('input-editor').getByPlaceholder('Age').fill('80');

    await page.locator('.nb-checkmark').click();


    // 2. get row by filteriing

     await page.locator('.ng2-smart-pagination-nav').locator('li', {hasText: "2"}).click();

     const targetRowId = page.getByRole('row').filter({hasText: '11'}).filter({has: page.locator('td').nth(1).getByText('11')});

    await targetRowId.locator('.nb-edit').click();

    await page.locator('input-editor').getByPlaceholder('E-mail').clear();

    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com');

    await page.locator('.nb-checkmark').click();

    expect(targetRowId).toContainText('test@test.com')

    // 3. test filter of the table

    const ageFilter = page.locator('input-filter').getByPlaceholder('Age');
    await ageFilter.clear()
    await ageFilter.fill('20');
    await page.waitForTimeout(2000);
    const allRows = page.locator('tbody tr');

    for(const row of await allRows.all()){
       const cellvalue = await row.locator('td').last().textContent();
       expect(cellvalue).toEqual('20');
    }
});


test('Datepicker', async({page})=>{

    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();
    const datepicker = page.getByPlaceholder('Form Picker');
    await datepicker.click();

    let date = new Date();
    date.setDate(date.getDate() + 200);
    const expectedDate = date.getDate().toString();

    const monthShort = date.toLocaleString('En-US', {month: 'short'});
    const monthLong = date.toLocaleString('En-US', {month: 'long'});
    const fullYear = date.getFullYear();

    let calenderMonthAndYear: any = await page.locator('nb-calendar-view-mode').textContent();

    const requiredMonthYear = ` ${monthLong} ${fullYear} `

    while(!calenderMonthAndYear.includes(requiredMonthYear)){
        await page.locator('[data-name = "chevron-right"]').click();
        calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    }

    const dateValue = page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true});

    await dateValue.click();

    await expect(datepicker).toHaveValue(`${monthShort} ${expectedDate}, ${fullYear}`);
});


test('Slider-using attribute', async({page})=>{
    const tempDragger = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    const tempCircle = tempDragger.locator('circle');

    await tempCircle.evaluate( node => {
        node.setAttribute('cx', '21.761');
        node.setAttribute('cy', '83.6030');
    })

    await tempCircle.click();

    expect(tempDragger).toContainText('17');

});

test('Slider- using mouse movement', async({page})=>{
    const tempDragger = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');

    await tempDragger.scrollIntoViewIfNeeded();

    const box = await tempDragger.boundingBox();

    const x = box!.x + box!.width / 2;
    const y = box!.y + box!.height / 2; 

    await page.mouse.move(x, y);

    await page.mouse.down();

    await page.mouse.move(x+100, y);

    await page.mouse.move(x+100, y+100);
    await page.mouse.up();

    await expect(tempDragger).toContainText('30');

});