let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
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
    await page.goto("https://github.blog");
  });

  // Тест, проверяющий наличие надписи "Blog" вверху страницы
  test("Checking for the presence of the 'Blog' inscription", async () => {
    // const blogSelector = await page.$(
    //   "/html/body/header/div/nav/div/div[1]/a[2]"
    // );
    // const blogSelector = ".// /html/body/header/div/nav/div/div[1]/a[2]";
    const blogElement = await page.xpath(
      "/html/body/header/div/nav/div/div[1]/a[2]"
    );
    const actual = blogElement.textContent;
    // await page.$eval(blogSelector, (link) => link.textContent);
    expect(actual).toEqual("Blog", { timeout: 180000 });
  });

  // Тест, проверяющий переход по вкладке "Engineering"
  test("Going to the engineering tab", async () => {
    const engineerTub = await page.xpath(
      "/html/body/header/div/nav/div/div[2]/div[1]/div/ul/li[1]/a"
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
    const copilotButton = await page.xpath(
      "/html/body/header/div/nav/div/a[1]"
    );
    actualCopilotPage = await copilotButton.click();
    expectedCopilotPage = await browser.newPage();
    await expectedCopilotPage.goto(
      "https://github.com/features/copilot?utm_source=blog&utm_medium=topnav&utm_campaign=cta&utm_content=copilot"
    );
    expect(page.url(expectedCopilotPage)).toEqual(page.url(actualCopilotPage), {
      timeout: 180000,
    });
  });
});
