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