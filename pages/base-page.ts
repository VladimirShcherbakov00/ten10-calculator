import { Page } from '@playwright/test';

export class BasePage {
    constructor(
        public page: Page,
        protected url: string,
    ) {}

    async visit(param= ''): Promise<void> {
        await this.page.goto(this.url, { waitUntil: 'load'});
    }
}