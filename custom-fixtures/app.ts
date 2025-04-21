import type { Page } from '@playwright/test'

import { LoginPage } from '../pages/login-page'
import { CalculatorPage } from '../pages/calculator-page'

export class App {
    constructor(private page: Page) {}

    public loginPage = new LoginPage(this.page)
    public calculatorPage = new CalculatorPage(this.page)
}