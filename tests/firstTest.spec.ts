import {test} from '@playwright/test';
import { beforeEach } from 'node:test';

test.beforeEach('Launch URL', async({page})=> {
   await page.goto('http://localhost:4200/');
   console.log('global before each')
})

// test('first test', async ({page}) => {
//   await page.getByText('Form layouts').click();
// })

// test('Second test', async ({page}) => {
//   await page.getByText('Datepicker').click();
// })

test.describe('test suite 1', () =>{

    test.beforeEach('describe before each', async({page})=>{
        await page.getByText('Forms').click();
        const title = await page.title();
        console.log(title)
        
    });

    test('test 1', async({page})=>{
        await page.getByText('Form layouts').click();

    });

    test('test 2', async({page})=>{
        await page.getByText('Datepicker').click();
        
    });

})