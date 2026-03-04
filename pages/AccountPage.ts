import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  // locators specific to account page
  readonly accountHeader: Locator;
  readonly accountDrop: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    // header text may vary; fall back to any h1 on account area
    this.accountHeader = page.locator('h1');
    this.accountDrop = page.locator('#main_menu_top > li.dropdown.current > a > span');
    this.logoutLink = page.locator('#main_menu_top > li.dropdown.current > ul > li:nth-child(2) > a > span');
  }

  /**
   * verify we are on the account page by inspecting current URL
   */
  async isAtAccountPage(): Promise<boolean> {
    const url = this.page.url();
    return /account/.test(url);
  }

  async logout() {
    // navigate straight to the logout page to bypass menu hover
    await this.page.goto('https://automationteststore.com/index.php?rt=account/logout');
  }
}
