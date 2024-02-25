let page;

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  afterEach(() => {
    page.close();
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Where the world builds software · GitHub", {
      timeout: 180000,
    });
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content", { timeout: 180000 });
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free", { timeout: 180000 });
  });
});

// Новые три теста написаны в данном блоке; тестируется страница https://github.blog
describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.blog");
  });

  afterEach(() => {
    page.close();
  });

  // Тест, проверяющий наличие надписи "Blog" вверху страницы
  test("Checking for the presence of the 'Blog' inscription", async () => {
    const blogSelector = await page.$(
      "body > header > div > nav > div > div.d-flex.flex-items-center > a.d-inline-block.Header-link.font-weight-semibold.ml-2.f2.color-fg-default"
    );
    const actual = await page.$eval(blogSelector, (link) => link.textContent);
    expect(actual).toEqual("Blog", { timeout: 180000 });
  });

  // Тест, проверяющий переход по вкладке "Engineer"
  test("Going to the engineer tab", async () => {
    const engineerTub = await page.$(
      "body > header > div > nav > div > div.p-plus-container > div.p-plus.p-plus--is-showing-toggle.p-plus--is-hiding-primary.p-plus--is-showing-overflow > ul > li:nth-child(1) > a"
    );
    await engineerTub.click();

    const engineerHead = "#start-of-content > div > h1";
    await page.waitForSelector(engineerHead, {
      visible: true,
    });
    const actual = await page.$eval(engineerHead, (link) => link.textContent);
    expect(actual).toEqual("Engineering", { timeout: 180000 });
  });

  // Тест, проверяющий, что открылась нужная вкладка после нажатия кнопки "Try GitHub Copilot"
  test("Creation a new tab", async () => {
    const copilotButton = await page.$(
      "body > header > div > nav > div > div.p-plus-container > div.p-plus.p-plus--is-showing-toggle.p-plus--is-hiding-primary.p-plus--is-showing-overflow > ul > li:nth-child(11) > a:nth-child(1)"
    );
    actualCopilotPage = await copilotButton.click();
    expectedCopilotPage = await browser.newPage();
    await expectedCopilotPage.goto(
      "https://github.com/features/copilot?utm_source=blog&utm_medium=topnav&utm_campaign=cta&utm_content=copilot"
    );
    expect(expectedCopilotPage).toEqual(actualCopilotPage, { timeout: 180000 });
  });
});
