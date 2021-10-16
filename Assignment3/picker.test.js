const puppeteer = require('puppeteer');

function firstDay(relative) {
  let date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth()+relative); 
  return date.getDay();
}

let browser;

beforeEach(async () => {
  browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--headless'
    ]
  });
});

afterEach(async () => {
  await browser.close(); 
});

// Clicks the next button a random number of times then checks the first
// day of the displayed month is correct.  For example, July 1, 2021 falls 
// on a Thursday, the 5h day of the week when weeks start on Sundays.
test('Next Month', async () => {
  const page = await browser.newPage();   
  await page.goto(`file://${__dirname}/picker.html`);    
  const num = Math.max(1,Math.floor(Math.random()*28));
  for (let i = 0; i < num; i++) {
    await page.click('#next');
  }
  const elem = await page.$("#d"+(firstDay(num)+num-1));
  const cont = await (await elem.getProperty('textContent')).jsonValue();
  expect(cont).toBe(''+num);
});
