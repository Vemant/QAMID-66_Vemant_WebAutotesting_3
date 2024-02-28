const { test, expect } = require("@playwright/test");

test("right login and password", async ({ page }) => {
  const { username, password } = require("../user.js");
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(username);
  await page.getByPlaceholder("Email").press("Tab");
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByText("Моё обучение")).toBeVisible({ timeout: 20000 });
});

test("wrong login and password", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("jkldfndfn@mail.ru");
  await page.getByPlaceholder("Email").press("Tab");
  await page.getByPlaceholder("Пароль").fill("ldkbnlsdknbas");
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByTestId("login-error-hint")).toHaveText(
    ["Вы ввели неправильно логин или пароль"],
    { timeout: 10000 }
  );
});
