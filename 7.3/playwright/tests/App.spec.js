const { test, expect } = require("@playwright/test");
<script src="user.js"></script>;

test("test", async ({ page }) => {
  // Go to https://netology.ru/free/management#/
  await page.goto("https://netology.ru/free/management#/");

  // Click a
  await page.click("a");
  await expect(page).toHaveURL("https://netology.ru/");

  // Click text=Учиться бесплатно
  await page.click("text=Учиться бесплатно");
  await expect(page).toHaveURL("https://netology.ru/free");

  page.click("text=Бизнес и управление");

  // Click text=Как перенести своё дело в онлайн
  await page.click("text=Как перенести своё дело в онлайн");
  await expect(page).toHaveURL(
    "https://netology.ru/programs/kak-perenesti-svoyo-delo-v-onlajn-bp"
  );
});

test("test", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(user.loginTrue);
  await page.getByPlaceholder("Email").press("Tab");
  await page.getByPlaceholder("Пароль").fill(user.passwordTrue);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByClass("styles_title__QUu_b")).toHaveText([
    "Направления обучения",
  ]);
});

test("test", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("jkldfndfn@yandex.ru");
  await page.getByPlaceholder("Email").press("Tab");
  await page.getByPlaceholder("Пароль").fill("ldkbnlsdknbas");
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByTestId("login-error-hint")).toHaveText([
    "Вы ввели неправильно логин или пароль",
  ]);
});
