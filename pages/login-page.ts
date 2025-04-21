import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage{
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly logInButton: Locator;

    constructor(page: Page) {
        super(page, '/Account/Login');
        
        this.emailInput = page.locator('#UserName');
        this.passwordInput = page.locator('#Password');
        this.logInButton = page.locator('#login-submit');
      }

    async loginAs(email: string, password: string): Promise<void> {
        await expect(this.emailInput).toBeVisible()
        this.emailInput.focus()
        this.emailInput.fill(email)

        await expect(this.passwordInput).toBeVisible()  
        this.passwordInput.focus()
        this.passwordInput.fill(password)

        this.logInButton.click()
    }
}