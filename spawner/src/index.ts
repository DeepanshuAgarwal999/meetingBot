import { Builder, Browser, By, Key, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome.js";

async function main() {
  const options = new Options({});
  options.addArguments("--disable-blink-features=AutomationControlled");
  options.addArguments("--use-fake-ui-for-media-stream");
  options.addArguments("--use-fake-microphone-for-media-stream");
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("https://meet.google.com/dof-gkdw-zvo");
    const popupButton = await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(),"Got it")]')),
      10000
    );
    await popupButton.click();

    const nameInput = await driver.wait(
      until.elementLocated(By.xpath("//input[@id='c12']")),
      10000
    );
    await nameInput.clear();
    await nameInput.click();
    await nameInput.sendKeys("value", "Meeting Bot");
    const buttonInput = await driver.wait(
      until.elementLocated(By.xpath("//span[contains(text(), 'Ask to join')]")),
      10000
    );
    buttonInput.click();
    // await driver.wait
  } finally {
    await driver.quit();
  }
}
main();
