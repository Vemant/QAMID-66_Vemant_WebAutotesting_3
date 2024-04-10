const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText } = require("../../lib/commands.js");

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
Given("user is on cinema ticket page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 20000,
  });
});

When("user search by {string}", async function (string) {
  await clickElementXPath(page, "//*[@data-seance-start='1200']");
  await clickElementXPath(
    page,
    "/html/body/main/section/div[2]/div[1]/div[8]/span[4]"
  );
  return await clickElementXPath(page, "/html/body/main/section/button");
});

Then("user sees the course suggested {string}", async function (string) {
  const actual = await getTextXPath(page, "/html/body/main/section/header/h2");
  const expected = "Вы выбрали билеты:";
  expect(actual).toContain(expected);
});

// Test "Should book 2 tickets"
Given("user is on cinema ticket page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 20000,
  });
});

When("user search by {string}", async function (string) {
  await clickElementXPath(
    page,
    "/html/body/main/section/div[2]/div[1]/div[1]/span[1]"
  );
  await clickElementXPath(
    page,
    "/html/body/main/section/div[2]/div[1]/div[1]/span[2]"
  );
  await clickElementXPath(page, "/html/body/main/section/button");
});

Then("user sees the course suggested {string}", async function (string) {
  const actual = await getTextXPath(page, "/html/body/main/section/header/h2");
  const expected = "Вы выбрали билеты:";
  expect(actual).toContain(expected);
});

// Test "Should try to book already booked ticket"
Given("user is on cinema ticket page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`, {
    setTimeout: 20000,
  });
});

When("user search by {string}", async function (string) {
  await clickElementXPath(
    page,
    "/html/body/main/section/div[2]/div[1]/div[5]/span[8]"
  );
});

Then("user sees the course suggested {string}", async function (string) {
  await clickElementXPath(page, "/html/body/main/section/button");
  await expect(clickElementXPath()).rejects.toThrow(Error);
});
