import {test, expect} from '@playwright/test';

test.beforeEach(async({page})=>{
    await page.goto('/'); 
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click()
})

test('user facing locators locators', async({page})=>{
    // await page.goto('http://localhost:4200/'); 
    // await page.getByText('Forms').click();
    // await page.getByText('Form Layouts').click()
    await page.getByRole('textbox', {name: 'Password'}).first().click()
    await page.getByLabel('Email').nth(2).click()
    await page.getByPlaceholder('Jane doe').fill('Saheb')
    await page.getByTitle('IoT Dashboard').click()
});

test('locating parent elements', async({page})=>{
    // await page.goto('http://localhost:4200/'); 
    // await page.getByText('Forms').click();
    // await page.getByText('Form Layouts').click()
    
    await page.locator('nb-card',{hasText: 'Using the Grid'})
                .getByRole('textbox', {name: 'Email'}).click()

    await page.locator('nb-card', {has: page.locator('#inputEmail1')})
                .getByRole('textbox', {name: 'Password'}).click()

    await page.locator('nb-card').filter({hasText: 'Basic form'})
                .getByRole('textbox', {name: 'Email'}).click()


    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign In'})
                .getByRole('textbox', {name: 'Email'}).click()

    await page.getByText('Block form').locator("..").getByPlaceholder('Email').fill('test.com')

});

test('Reusing the locators', async({page})=>{
    // await page.goto('http://localhost:4200/'); 
    // await page.getByText('Forms').click();
    // await page.getByText('Form Layouts').click();

    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'});
    const emailField = basicForm.getByRole('textbox', {name: 'Email'});

    await emailField.fill('test@test.com')
    await basicForm
                .getByRole('textbox', {name: 'Password'}).fill('test@12345')

    await basicForm.getByRole('button').click()

    expect(emailField).toHaveValue('test@test.com');
                   
});


test('Extracting values', async ({page})=>{
    // single test value
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'});
    const submitButtonText =  await basicForm.getByRole('button').textContent()
    expect(submitButtonText).toEqual('Submit')

    // all text values

    const usingTheGridForm = page.locator('nb-card').filter({hasText: 'Using the Grid'});
    const radioButtons = usingTheGridForm.locator('nb-radio')
    const allRadioButtonTexts = await radioButtons.allTextContents()
    expect(allRadioButtonTexts).toContain('Option 1')


    // input value
    const passwordBasicForm = basicForm.getByRole('textbox', {name: 'Password'});
    await passwordBasicForm.fill('123456');

    const password = await passwordBasicForm.inputValue()

    expect(password).toEqual('123456')

    // get attribute value
    const emailBasicForm = basicForm.getByRole('textbox', {name: 'Email'});
    const emailPlaceHolder = await emailBasicForm.getAttribute('placeholder');

    expect(emailPlaceHolder).toEqual('Email')

});
