const { clickElementXPath, getTextXPath } = require("./lib/commands.js");
// const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("qamidTmWeb tests task 1", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  test("Should book 1 ticket", async () => {
    // Выбор дня и клик
    await clickElementXPath(page, "//*[@data-time-stamp='1713387600']");
    // Выбор времени сеанса и клик
    await clickElementXPath(page, "//*[@data-seance-start='600']");
    // Выбор места в зале и клик
    await clickElementXPath(
      page,
      "/html/body/main/section/div[2]/div[1]/div[3]/span[1]"
    );
    // Клик кнопки "Забронировать"
    await clickElementXPath(page, "//*[@class='acceptin-button']");
    // Проверка наличия на странице нужного текста
    const actual = await getTextXPath(
      page,
      "//*[@class='ticket__check-title']"
    );
    const expected = "Вы выбрали билеты:";
    expect(actual).toContain(expected, { timeout: 180000 });
  });

  test("Should book 2 tickets", async () => {
    // Выбор дня и клик
    await clickElementXPath(page, "//*[@data-time-stamp='1713387600']");
    // Выбор времени сеанса и клик
    await clickElementXPath(page, "//*[@data-seance-start='600']");
    // Выбор 1-го места в зале и клик
    await clickElementXPath(
      page,
      "/html/body/main/section/div[2]/div[1]/div[3]/span[1]"
    );
    // Выбор 2-го места в зале и клик
    await clickElementXPath(
      page,
      "/html/body/main/section/div[2]/div[1]/div[3]/span[2]"
    );
    // Клик кнопки "Забронировать"
    await clickElementXPath(page, "//*[@class='acceptin-button']");
    // Проверка наличия на странице нужного текста
    const actual = await getTextXPath(
      page,
      "//*[@class='ticket__check-title']"
    );
    const expected = "Вы выбрали билеты:";
    expect(actual).toContain(expected, { timeout: 180000 });
  });

  test("Should try to book already booked ticket", async () => {
    // Выбор дня и клик
    await clickElementXPath(page, "//*[@data-time-stamp='1713387600']");
    // Выбор времени сеанса и клик
    await clickElementXPath(page, "//*[@data-seance-start='660']");
    // Выбор места в зале и клик
    await clickElementXPath(
      page,
      "/html/body/main/section/div[2]/div[1]/div[2]/span[8]"
    );
    // Клик кнопки "Забронировать"; проверка выпадения исключения
    await clickElementXPath(page, "//*[@class='acceptin-button']");
    await expect(clickElementXPath()).rejects.toThrow(Error);
  });
});
