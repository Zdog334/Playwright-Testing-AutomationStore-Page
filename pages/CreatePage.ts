import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CreatePage extends BasePage {
  // locators for the create user / registration form (Only required ones)
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly country: Locator;
  readonly zone: Locator;
  readonly city: Locator;
  readonly address: Locator; 
  readonly zip: Locator;
  readonly userName: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly newsletterContainer: Locator;
  readonly policyCheck: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.locator('input[name="firstname"]');
    this.lastName = page.locator('input[name="lastname"]');
    // account registration email field specifically (avoid newsletter textbox)
    this.email = page.locator('#AccountFrm_email');
    this.country = page.locator('#AccountFrm_country_id');
    this.zone = page.locator('#AccountFrm_zone_id');
    // city field (text input)
    this.city = page.locator('input[name="city"]');
    this.address = page.locator('input[name="address_1"]');
    this.zip = page.locator('input[name="postcode"]');
    this.userName = page.locator('input[name="loginname"]');
    this.password = page.locator('input[name="password"]');
    this.confirmPassword = page.locator('input[name="confirm"]');
    this.newsletterContainer = page.locator('.input-group:has(input[name="newsletter"])');
    this.policyCheck = page.locator('#AccountFrm_agree');
    this.registerButton = page.locator('#AccountFrm > div.form-group > div > div > button');
  }

  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    countryValue?: string;
    zoneValue?: string;
    cityValue?: string;
    zip?: string;
    userName?: string;
  }) {
    await this.fill(this.firstName, data.firstName);
    await this.fill(this.lastName, data.lastName);
    await this.fill(this.email, data.email);

    if (data.countryValue) {
      await this.selectOption(this.country, data.countryValue);
    }
    if (data.zoneValue) {
      await this.selectOption(this.zone, data.zoneValue);
    }
    if (data.cityValue) {
      await this.fill(this.city, data.cityValue);
    }
    if (data.zip) {
      await this.fill(this.zip, data.zip);
    }
    if (data.userName) {
      await this.fill(this.userName, data.userName);
    }

    // choose newsletter = no by selecting the radio input with value 0
    const noRadio = this.newsletterContainer.locator('input[value="0"]');
    await noRadio.check();

    // agree to privacy policy
    await this.click(this.policyCheck);

    await this.fill(this.password, data.password);
    await this.fill(this.confirmPassword, data.password);
    await this.click(this.registerButton);
  }
}
