module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },
  clickElementXPath: async function (page, xPath) {
    try {
      await page.waitForXPath(xPath);
      const elementXPath = await page.$x(xPath);
      let elem = await elementXPath[0];
      await elem.click();
    } catch (error) {
      throw new Error(`XPath is not clickable: ${xPath}`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
  getTextXPath: async function (page, xPath) {
    try {
      await page.waitForXPath(xPath);
      const elementXPath = await page.$x(xPath);
      return await page.evaluate((link) => link.textContent, elementXPath);
    } catch (error) {
      throw new Error(`Text is not available for xpath: ${xPath}`);
    }
  },
  putText: async function (page, selector, text) {
    try {
      const inputField = await page.$(selector);
      await inputField.focus();
      await inputField.type(text);
      await page.keyboard.press("Enter");
    } catch (error) {
      throw new Error(`Not possible to type text for selector: ${selector}`);
    }
  },
};
