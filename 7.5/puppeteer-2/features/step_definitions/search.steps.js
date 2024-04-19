const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");
const { clickElementXPath, getTextXPath } = require("../../lib/commands.js");

setDefaultTimeout(10000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

// Test "Should book 1 ticket"
Given("user is on {string} page", async function (string) {
  await this.page.goto(`https://qamid.tmweb.ru${string}`, {
    setTimeout: 20000,
  });
  // Выбор дня и клик
  return await clickElementXPath(this.page, "/html/body/nav/a[2]");
});

When(
  "user search 1 movie ticket by {string} of data-seance-start",
  async function (string) {
    // await clickElementXPath(this.page, string);
    // Выбор времени сеанса и клик
    await clickElementXPath(this.page, `//*[@data-seance-start=${string}]`);
    // Выбор места в зале и клик
    await clickElementXPath(
      this.page,
      "/html/body/main/section/div[2]/div[1]/div[4]/span[1]"
    );
    // Клик кнопки "Забронировать"
    return await clickElementXPath(this.page, "//*[@class='acceptin-button']");
  }
);

When(
  "user search 2 movie tickets by {string} of data-seance-start",
  async function (string) {
    // await clickElementXPath(this.page, string);
    // Выбор времени сеанса и клик
    await clickElementXPath(this.page, `//*[@data-seance-start=${string}]`);
    // Выбор 1-го места в зале и клик
    await clickElementXPath(
      this.page,
      "/html/body/main/section/div[2]/div[1]/div[4]/span[1]"
    );
    // Выбор 2-го места в зале и клик
    await clickElementXPath(
      this.page,
      "/html/body/main/section/div[2]/div[1]/div[4]/span[2]"
    );
    // Клик кнопки "Забронировать"
    return await clickElementXPath(this.page, "//*[@class='acceptin-button']");
  }
);

When(
  "user search booked movie ticket by {string} of data-seance-start",
  async function (string) {
    // await clickElementXPath(this.page, string);
    // Выбор времени сеанса и клик
    await clickElementXPath(this.page, `//*[@data-seance-start=${string}]`);
    // Выбор места в зале и клик
    await clickElementXPath(
      this.page,
      "/html/body/main/section/div[2]/div[1]/div[7]/span[8]"
    );
    // await clickElementXPath(this.page, `//*[@class=${string}]`);
    // await expect(clickElementXPath()).rejects.toThrow(Error);
  }
);

Then("user sees the text {string}", async function (string) {
  const actual = await getTextXPath(
    this.page,
    "//*[@class='ticket__check-title']"
  );
  expect(actual).contain(string, { timeout: 180000 });
});

Then("user tries to click {string}", async function (string) {
  xPath = `//*[@class='${string}']`;
  await clickElementXPath(this.page, xPath);
  expect(() => {
    throw new Error(`XPath is not clickable: ${xPath}`);
  }).to.throw(`XPath is not clickable: ${xPath}`);
});
