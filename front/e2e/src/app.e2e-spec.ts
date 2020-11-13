import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the secret button', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Access to the secret');
  });

  it('should connect', async () => {
    await page.navigateTo();
    await page.fillForm({ login: 'jlouis', password: 'toto' });
    await page.clickOnConnect();
    const secret = await page.showSecret();
    expect(secret).toEqual(
      '{ "secret": "this is my nice secret", "login": "jlouis" }'
    );
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
