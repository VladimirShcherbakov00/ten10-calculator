import { test } from '../custom-fixtures/custom-fixtures';
import { expect } from '@playwright/test';

test.describe('Interest Calculator Tests', () => {
  test.beforeEach(async ({ app }) => {
    
    await app.loginPage.visit();
    await app.loginPage.loginAs(process.env.LOGIN, process.env.PASSWORD);
  });

  test('should validate all fields are mandatory', async ({ app }) => {
    // Try to calculate without setting any fields
    await app.calculatorPage.setConsent(false); // Ensure consent is unchecked
    await app.calculatorPage.calculate();
    
    // Check that results are not displayed
    await expect(app.calculatorPage.interestAmountResult).toBeEmpty();
    await expect(app.calculatorPage.totalAmountResult).toBeEmpty();
  });

  test('should calculate daily interest correctly', async ({ app }) => {
    const principal = 1000;
    const rate = '5%';
    
    await app.calculatorPage.setPrincipalAmount(principal);
    await app.calculatorPage.selectInterestRate(rate);
    await app.calculatorPage.selectDuration('Daily');
    await app.calculatorPage.setConsent(true);
    await app.calculatorPage.calculate();
    
    // Calculation for daily interest: principal * rate / 365
    const expectedInterest = parseFloat(((principal * 0.05) / 365).toFixed(2));
    const expectedTotal = principal + expectedInterest;
    
    // Verify calculations
    const actualInterest = await app.calculatorPage.getInterestAmount();
    const actualTotal = await app.calculatorPage.getTotalAmount();
    
    expect(actualInterest).toBeCloseTo(expectedInterest, 2);
    expect(actualTotal).toBeCloseTo(expectedTotal, 2);
  });

  test('should calculate yearly interest correctly', async ({ app }) => {
    const principal = 10000;
    const rate = '15%';
    
    await app.calculatorPage.setPrincipalAmount(principal);
    await app.calculatorPage.selectInterestRate(rate);
    await app.calculatorPage.selectDuration('Yearly');
    await app.calculatorPage.setConsent(true);
    await app.calculatorPage.calculate();
    
    // Calculation for yearly interest: principal * rate
    const expectedInterest = parseFloat((principal * 0.15).toFixed(2));
    const expectedTotal = principal + expectedInterest;
    
    // Verify calculations
    const actualInterest = await app.calculatorPage.getInterestAmount();
    const actualTotal = await app.calculatorPage.getTotalAmount();
    
    expect(actualInterest).toBeCloseTo(expectedInterest, 2);
    expect(actualTotal).toBeCloseTo(expectedTotal, 2);
  });

  test('should verify responsive UI', async ({ app, browserName }) => {
    // Skip this test for non-Chromium browsers to simplify
    test.skip(browserName !== 'chromium', 'This test runs only on Chromium');
    
    // Test on mobile viewport
    await app.calculatorPage.page.setViewportSize({ width: 375, height: 667 });
    await app.calculatorPage.setPrincipalAmount(1000);
    await app.calculatorPage.selectInterestRate('5%');
    await app.calculatorPage.selectDuration('Monthly');
    await app.calculatorPage.setConsent(true);
    await app.calculatorPage.calculate();
    
    // Verify calculations work on mobile viewport
    const mobileInterest = await app.calculatorPage.getInterestAmount();
    expect(mobileInterest).toBeGreaterThan(0);
    
    // Test on tablet viewport
    await app.calculatorPage.page.setViewportSize({ width: 768, height: 1024 });
    await app.calculatorPage.setPrincipalAmount(2000);
    await app.calculatorPage.selectInterestRate('10%');
    await app.calculatorPage.selectDuration('Monthly');
    await app.calculatorPage.setConsent(true);
    await app.calculatorPage.calculate();
    
    // Verify calculations work on tablet viewport
    const tabletInterest = await app.calculatorPage.getInterestAmount();
    expect(tabletInterest).toBeGreaterThan(0);
    
    // Test on desktop viewport
    await app.calculatorPage.page.setViewportSize({ width: 1280, height: 800 });
    await app.calculatorPage.setPrincipalAmount(3000);
    await app.calculatorPage.selectInterestRate('15%');
    await app.calculatorPage.selectDuration('Monthly');
    await app.calculatorPage.setConsent(true);
    await app.calculatorPage.calculate();
    
    // Verify calculations work on desktop viewport
    const desktopInterest = await app.calculatorPage.getInterestAmount();
    expect(desktopInterest).toBeGreaterThan(0);
  });
});