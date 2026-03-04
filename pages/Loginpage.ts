import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly userInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.userInput = page.locator('input[name="loginname"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('#loginFrm > fieldset > button');
    this.registerButton = page.locator('#accountFrm > fieldset > button');
  }

  /**
   * perform a login with given credentials
   * @param userName user name
   * @param password user password
   */
  async login(userName: string, password: string) {
    await this.fill(this.userInput, userName);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async goToRegister(){
    await this.click(this.registerButton);
  }
}
