## This project contains end-to-end (E2E) automated tests for the Interest Calculator web application, built using Playwright with TypeScript and a Custom Fixtures pattern.

## 🚀 Project Structure

```text
project-root/
├── tests/
│   └── calculator.spec.ts               # Main E2E tests for Interest Calculator
│
├── custom-fixtures/
│   └── custom-fixtures.ts               # Fixtures setup
│   └── app.ts                           # Pages
│
├── pages/
│   ├── login-page.ts                    # Page Object Model for Login Page
│   └── calculator-page.ts               # Page Object Model for Calculator Page
│   └── base-page.ts                     # Base Page for all pages
│
├── playwright.config.ts                 # Playwright configuration file
├── package.json                         # Project dependencies and npm scripts
├── README.md                            # Project documentation (this file)
└── .env                                 # Environment variables for login credentials (optional)
```

## 🧪 Test Scenarios
```text
The following test cases are covered:

Mandatory Fields Validation
Ensures that all required fields must be completed before calculation.

Daily Interest Calculation
Verifies correct daily interest calculation based on principal and rate.

Yearly Interest Calculation
Verifies correct yearly interest calculation based on principal and rate.

Responsive UI Validation
Tests the application’s behavior and correctness on different viewports (mobile, tablet, desktop) — Chromium only.
```
## 🛠 Setup Instructions
```text
1. Clone the repository

   git clone https://github.com/VladimirShcherbakov00/ten10-calculator.git

2. Install dependencies

   npm install

3. Install Playwright browsers

   npx playwright install

4. Set environment variables

   Create a `.env` file in the root directory:

     LOGIN=vladimir.sherbakov@gmail.com
     PASSWORD=asdaQwer1234!
```
