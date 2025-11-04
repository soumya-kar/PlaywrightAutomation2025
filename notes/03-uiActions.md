# UI Components Testing with Playwright - Quick Reference Guide

## Table of Contents
1. Input Fields
2. Radio Buttons
3. Checkboxes
4. Lists and Dropdowns
5. Tooltips
6. Dialog Boxes
7. Web Tables
8. Date Picker
9. Sliders

## 1. Input Fields
```typescript
// Fill, clear and type operations
await emailField.fill('test@test.com');
await emailField.clear();
await emailField.pressSequentially('test', {delay:500}); // Types with delay

// Assertions
await expect(emailField).toHaveValue('test');
const inputValue = await emailField.inputValue();
```

## 2. Radio Buttons
```typescript
// Using getByLabel
await form.getByLabel('Option 1').check({force: true});

// Using getByRole
await form.getByRole('radio', {name: 'Option 1'}).check({force: true});

// Assertions
await expect(radioButton).toBeChecked();
await expect(radioButton).not.toBeChecked();
```

## 3. Checkboxes
```typescript
// Check/Uncheck operations
await checkbox.check({force: true});
await checkbox.uncheck({force: true});

// Loop through multiple checkboxes
const allBoxes = page.getByRole('checkbox');
for(const box of await allBoxes.all()){
    await box.check({force: true});
}
```

## 4. Lists and Dropdowns
```typescript
// Working with dropdowns
const optionList = page.locator('nb-option-list nb-option');
await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);

// CSS verification
await expect(header).toHaveCSS('background-color', 'rgb(34, 43, 69)');
```

## 5. Tooltips
```typescript
// Hover and verify tooltip
await button.hover();
const tooltipText = await page.locator('nb-tooltip').textContent();
```

## 6. Dialog Boxes
```typescript
// Handle dialog events
page.on('dialog', dialog => {
    expect(dialog.message()).toEqual('Are you sure you want to delete?');
    dialog.accept();
});
```

## 7. Web Tables
```typescript
// Find row by content
const targetRow = page.getByRole('row').filter({hasText:'email@example.com'});

// Edit table data
await targetRow.locator('.nb-edit').click();
await page.locator('input-editor').getByPlaceholder('Age').fill('80');

// Filter table
const ageFilter = page.locator('input-filter').getByPlaceholder('Age');
await ageFilter.fill('20');
```

## 8. Date Picker
```typescript
// Dynamic date selection
const date = new Date();
date.setDate(date.getDate() + 200);
// Navigate through calendar
while(!calendarMonthYear.includes(requiredMonthYear)){
    await page.locator('[data-name="chevron-right"]').click();
}
```

## 9. Sliders
```typescript
// Using attributes
await element.evaluate(node => {
    node.setAttribute('cx', '21.761');
    node.setAttribute('cy', '83.6030');
});

// Using mouse movement
const box = await element.boundingBox();
await page.mouse.move(x, y);
await page.mouse.down();
await page.mouse.move(x+100, y);
await page.mouse.up();
```

## Best Practices
1. Use force: true when elements are covered by other elements
2. Implement proper waiting mechanisms
3. Use appropriate assertions for validation
4. Handle dynamic content properly
5. Structure tests in describe blocks for better organization
6. Use beforeEach for common setup steps
7. Implement proper error handling
8. Use appropriate locator strategies

## Common Assertions
```typescript
await expect(element).toHaveValue(value);
await expect(element).toBeChecked();
await expect(element).toHaveText(text);
await expect(element).toHaveCSS(property, value);
await expect(element).toContainText(text);
```