const puppeteer = require('puppeteer');

const APP = 'http://0.0.0.0:8080';

describe('Front-end Integration/Features', () => {
  let browser;
  let page;

  beforeAll(async () => {
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
    });
  });
});
