import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/Loginpage';
import { CreatePage } from '../pages/CreatePage';
import { AccountPage } from '../pages/AccountPage';
import { makeUniqueRegistration } from '../data/credentials';



test.describe('user registration and authentication', () => {
  

  test('register new user, logout, login again and verify account page', async ({ page }) => {
    const base = new BasePage(page);
    const login = new LoginPage(page);
    const create = new CreatePage(page);
    const account = new AccountPage(page);

    await base.navigate('https://automationteststore.com/');
    await expect(page).toHaveURL(/automationteststore.com/);

    // go to login page first
    await base.navigate('https://automationteststore.com/index.php?rt=account/login');
    await expect(page).toHaveURL(/account\/login/);

    // then navigate to register via button on the login page
    await login.goToRegister();
    await expect(page).toHaveURL(/account\/create/);

    const userData = makeUniqueRegistration();
    await create.register(userData);

    await expect(account.isAtAccountPage()).resolves.toBe(true);

    await account.logout();
    await expect(page).toHaveURL(/account\/logout/);

    await base.navigate('https://automationteststore.com/index.php?rt=account/login');
    await login.login(userData.userName, userData.password);
    await expect(account.isAtAccountPage()).resolves.toBe(true);
  });
});
