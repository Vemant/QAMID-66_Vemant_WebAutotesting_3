const { test, expect } = require("@playwright/test");

// test("test", async ({ page }) => {
//   await page.goto("https://netology.ru/free/management#/");

//   await page.click("a");
//   await expect(page).toHaveURL("https://netology.ru/");

//   await page.click("text=Учиться бесплатно");
//   await expect(page).toHaveURL("https://netology.ru/free");

//   page.click("text=Бизнес и управление");

//   await page.click("text=Как перенести своё дело в онлайн");
//   await expect(page).toHaveURL(
//     "https://netology.ru/programs/kak-perenesti-svoyo-delo-v-onlajn-bp"
//   );
// });

test("right login and password", async ({ page }) => {
  const { username, password } = require("../user.js");
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(username);
  await page.getByPlaceholder("Email").press("Tab");
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByText("Моё обучение")).toBeVisible();
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
