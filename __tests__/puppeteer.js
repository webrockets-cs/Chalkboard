const puppeteer = require('puppeteer');

const APP = 'http://0.0.0.0:8080';

describe('Front-end Integration/Features', () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(10000);
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      //headless: false,
    });
    page = await browser.newPage();
  });

  afterAll(() => {
    browser.close();
  });

  describe('Initial display', () => {
    it('loads successfully', async () => {
      await page.goto(APP);
      await page.waitForSelector('#puppeteer-title');
      const title = await page.$eval('#puppeteer-title', (el) => el.innerHTML);
      expect(title).toBe('web-rockets');
    });
  });
});
