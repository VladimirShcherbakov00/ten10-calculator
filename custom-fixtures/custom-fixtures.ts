import { test as base } from '@playwright/test'

import { App } from './app'

interface MyFixtures {
    app: App;
}

export const test = base.extend<MyFixtures>({
    app: async ({ page }, use) => {
        await use(new App(page))
    }
})