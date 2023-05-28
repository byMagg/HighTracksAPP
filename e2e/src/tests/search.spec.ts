// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Search', function () {
  this.timeout(30000)
  let driver: any
  let vars
  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function () {
    await driver.quit();
  })
  it('Search', async function () {
    await driver.get("http://localhost:8100/")
    await driver.manage().window().setRect({ width: 1365, height: 817 })
    await driver.findElement(By.id("open-login")).click()
    await driver.findElement(By.id("ion-input-0")).click()
    await driver.findElement(By.id("ion-input-0")).sendKeys("dani@gmail.com")
    await driver.findElement(By.id("ion-input-1")).sendKeys("123456")
    await driver.findElement(By.id("ion-input-1")).sendKeys(Key.ENTER)
    await driver.findElement(By.css(".searchbar-input")).click()
    await driver.findElement(By.css(".searchbar-input")).sendKeys("pinin")
    await driver.findElement(By.css(".searchbar-input")).sendKeys(Key.ENTER)
    await driver.wait(until.elementLocated(By.xpath("//ion-toolbar[2]/ion-buttons/ion-fab-button")), 30000)
    await driver.findElement(By.xpath("//ion-toolbar[2]/ion-buttons/ion-fab-button/ion-icon")).click()
    await driver.findElement(By.css(".back-button-has-icon-only")).click()
    await driver.wait(until.elementIsVisible(await driver.findElement(By.id("open-login"))), 30000)
    await driver.findElement(By.id("open-login")).click()
    await driver.findElement(By.css(".button-solid")).click()
  })
})
