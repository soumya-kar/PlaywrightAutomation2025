import {expect} from '@playwright/test';
import {test} from '../test-options'

test('Drag and drop', async({ page,  globalsQaURL})=>{
    await page.goto(globalsQaURL);

    const dragMe =  page.locator('#draggable');

    const dropTo = page.locator('#droppable')

    await dragMe.dragTo(dropTo);

    await expect(dropTo).toHaveCSS('background-color', 'rgb(255, 250, 144)');

})