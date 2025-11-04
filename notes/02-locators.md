# Playwright Locators — Quick Reference (based on tests/locators.spec.ts)

Purpose
- Quick revision sheet summarising locator strategies and patterns used in tests/locators.spec.ts.

Common locator methods
- Role (preferred for accessibility-aware tests)
  - page.getByRole('textbox', { name: 'Email' })
  - .first(), .nth(index)
- Label
  - page.getByLabel('Email')
- Placeholder
  - page.getByPlaceholder('Jane doe')
- Title
  - page.getByTitle('IoT Dashboard')
- Text
  - page.getByText('Forms')
  - page.getByText('Block form').locator("..")  // move to parent

Scoping/Parent locators
- Use locator(selector, { hasText }) to scope by visible text:
  - page.locator('nb-card', { hasText: 'Using the Grid' })
- Use locator(selector, { has: page.locator(...) }) to scope by child element:
  - page.locator('nb-card', { has: page.locator('#inputEmail1') })
- Use filter({ hasText }) or filter({ has: ... }) for additional narrowing:
  - page.locator('nb-card').filter({ hasText: 'Basic form' })
  - page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).filter({ hasText: 'Sign In' })

Reusing locators (good for readability & performance)
- Capture parent/container then query inside:
  - const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
  - const emailField = basicForm.getByRole('textbox', { name: 'Email' })
  - await emailField.fill('test@test.com')

Extracting values
- Single element text: await element.textContent()
  - const submitButtonText = await basicForm.getByRole('button').textContent()
- Multiple texts: await locator.allTextContents()
  - const allRadioButtonTexts = await usingTheGridForm.locator('nb-radio').allTextContents()
- Input value: await input.inputValue()
  - const password = await passwordBasicForm.inputValue()
- Attributes: await element.getAttribute('placeholder')

Assertions (examples)
- expect(emailField).toHaveValue('test@test.com')
- expect(submitButtonText).toEqual('Submit')
- expect(allRadioButtonTexts).toContain('Option 1')
- expect(password).toEqual('123456')
- expect(emailPlaceHolder).toEqual('Email')

Small patterns & tips
- Prefer role/label/placeholders (more stable) over brittle CSS selectors.
- Use scoping (locator(..., { has/hasText })) to reduce accidental matches.
- Chain locators to keep tests readable and maintainable.
- Use .first() / .nth() when multiple matches exist.
- Use page.getByText(...).locator("..") to move from a text node to its parent element.
- Locator methods auto-wait for actions; still await promises (fill(), click(), textContent(), etc.).

Quick examples (from file)
- Click first password textbox:
  - await page.getByRole('textbox', { name: 'Password' }).first().click()
- Fill placeholder:
  - await page.getByPlaceholder('Jane doe').fill('Saheb')
- Scope to nb-card and click email:
  - await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' }).click()

Keep this file for rapid recall when working with Playwright locator patterns used in the project.