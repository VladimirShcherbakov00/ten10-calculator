import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class CalculatorPage extends BasePage{  

  readonly principalAmountSlider: Locator;
  readonly selectedPrincipalValue: Locator;
  readonly minPrincipalValue: Locator;
  readonly maxPrincipalValue: Locator;
  readonly interestRateDropdown: Locator;
  readonly interestRateOptions: Locator;
  readonly durationOptions: Locator;
  readonly consentCheckbox: Locator;
  readonly calculateButton: Locator;
  readonly interestAmountResult: Locator;
  readonly totalAmountResult: Locator;
  readonly requirementsLink: Locator;

  constructor(page: Page) {
    super(page, '');
    
    // Initialize locators
    this.principalAmountSlider = page.locator('input.custom-range');
    this.selectedPrincipalValue = page.locator('#selectedValue');
    this.minPrincipalValue = page.locator('#minValue');
    this.maxPrincipalValue = page.locator('#maxValue');
    this.interestRateDropdown = page.locator('#dropdownMenuButton');
    this.interestRateOptions = page.locator('.dropdown-item input[type="checkbox"]');
    this.durationOptions = page.locator('#durationList .list-group-item');
    this.consentCheckbox = page.locator('#gridCheck1');
    this.calculateButton = page.locator('button.btn-primary');
    this.interestAmountResult = page.locator('#interestAmount');
    this.totalAmountResult = page.locator('#totalAmount');
    this.requirementsLink = page.locator('a.custom-link');
  }

  async setPrincipalAmount(amount: number): Promise<void> {
    await this.principalAmountSlider.fill(amount.toString());
    // Verify the value was set correctly
    await expect(this.selectedPrincipalValue).toContainText(amount.toString());
  }

  async selectInterestRate(rate: string): Promise<void> {
    // Open dropdown
    await this.interestRateDropdown.click();
    
    // Find and click the specific interest rate option
    const escapedRate = rate.replace('%', '\\%');
    await this.page.locator(`#rate-${escapedRate}`).click();

    // Small hack to close dropdown
    await this.page.locator('body').click()
    
    // Verify the selection reflected in dropdown button
    await expect(this.interestRateDropdown).toContainText(rate);
  }

  async selectDuration(duration: 'Daily' | 'Monthly' | 'Yearly'): Promise<void> {
    const durationOption = this.page.locator(`#durationList a[data-value="${duration}"]`);
    await durationOption.click();
    
    // Verify selection by checking for active class
    await expect(durationOption).toHaveClass(/active/);
  }

  async setConsent(checked: boolean): Promise<void> {
    if (checked) {
      await this.consentCheckbox.check();
    } else {
      await this.consentCheckbox.uncheck();
    }
    
    // Verify the checkbox state
    if (checked) {
      await expect(this.consentCheckbox).toBeChecked();
    } else {
      await expect(this.consentCheckbox).not.toBeChecked();
    }
  }

  async calculate(): Promise<void> {
    await this.calculateButton.click();
  }

  async getInterestAmount(): Promise<number> {
    const text = await this.interestAmountResult.textContent();
    if (!text) return 0;
    
    // Extract the numeric value from the text
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  async getTotalAmount(): Promise<number> {
    const text = await this.totalAmountResult.textContent();
    if (!text) return 0;
    
    // Extract the numeric value from the text
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  async viewRequirements(): Promise<void> {
    await this.requirementsLink.click();
  }

  async calculateWithParams(
    principal: number, 
    rate: string, 
    duration: 'Daily' | 'Monthly' | 'Yearly'
  ): Promise<void> {
    await this.setPrincipalAmount(principal);
    await this.selectInterestRate(rate);
    await this.selectDuration(duration);
    await this.setConsent(true);
    await this.calculate();
  }

  async getPrincipalRangeLimits(): Promise<{min: number, max: number}> {
    const minText = await this.minPrincipalValue.textContent();
    const maxText = await this.maxPrincipalValue.textContent();
    
    return {
      min: minText ? parseInt(minText) : 0,
      max: maxText ? parseInt(maxText) : 0
    };
  }
}