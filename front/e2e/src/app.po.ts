import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('button.secret')).getText() as Promise<string>;
  }

  async clickOnConnect(): Promise<void> {
    await element(by.css('button.primary')).click();
    await browser.sleep(5000);
  }

  async fillForm(form: { login: string; password: string }): Promise<void> {
    const login = element(by.css('input[formcontrolname="login"]'));
    await login.clear();
    await login.sendKeys(form.login);

    const password = element(by.css('input[formcontrolname="password"]'));
    await password.clear();
    await password.sendKeys(form.password);
  }

  async showSecret(): Promise<string> {
    await element(by.css('button.secret')).click();
    const secret = await element(by.css('div')).getText();
    await browser.sleep(5000);
    return secret;
  }
}
