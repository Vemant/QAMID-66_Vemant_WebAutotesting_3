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

// ЗАДАНИЕ 1
describe("qamidTmWeb tests task 1", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  test("Should book 1 ticket", async () => {
    // Выбор времени сеанса и клик
    // await clickElementXPath(
    //   page,
    //   "/html/body/main/section[1]/div[2]/ul/li[3]/a"
    // );
    await clickElementXPath(page, "//*[@data-seance-start='1200']");

    // Выбор места в зале и клик
    await clickElementXPath(
      page,
      "/html/body/main/section/div[2]/div[1]/div[8]/span[4]"
    );
    // Клик кнопки "Забронировать"
    await clickElementXPath(page, "/html/body/main/section/button");
    // Проверка наличия на странице нужного текста
    const actual = await getTextXPath(
      page,
      "/html/body/main/section/header/h2"
    );
    const expected = "Вы выбрали билеты:";
    expect(actual).toContain(expected);
  });

  test("Should book 2 tickets", async () => {
    // Выбор времени сеанса и клик
    await clickElementXPath(page, "//*[@data-seance-start='1200']");
    // Выбор 1-го места в зале и клик
    await clickElementXPath(
      page,
      "/html/body/main/section/div[2]/div[1]/div[1]/span[1]"
    );
    // Выбор 2-го места в зале и клик
    await clickElementXPath(
      page,
      "/html/body/main/section/div[2]/div[1]/div[1]/span[2]"
    );
    // Клик кнопки "Забронировать"
    await clickElementXPath(page, "/html/body/main/section/button");
    // Проверка наличия на странице нужного текста
    const actual = await getTextXPath(
      page,
      "/html/body/main/section/header/h2"
    );
    const expected = "Вы выбрали билеты:";
    expect(actual).toContain(expected);
  });

  test("Should try to book already booked ticket", async () => {
    // Выбор времени сеанса и клик
    await clickElementXPath(page, "//*[@data-seance-start='1200']");
    // Выбор места в зале и клик
    await clickElementXPath(
      page,
      "/html/body/main/section/div[2]/div[1]/div[5]/span[8]"
    );
    // Клик кнопки "Забронировать"; проверка выпадения исключения
    await clickElementXPath(page, "/html/body/main/section/button");
    await expect(clickElementXPath()).rejects.toThrow(Error);
  });
});
