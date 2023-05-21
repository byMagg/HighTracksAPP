// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Login', function () {
    this.timeout(30000)
    let driver: any;
    let vars
    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build()
        vars = {}
    })
    afterEach(async function () {
        await driver.quit();
    })
    it('Login', async function () {
        await driver.get("http://hightracks.me/")
        await driver.manage().window().setRect({ width: 1358, height: 821 })
        await driver.findElement(By.id("open-login")).click()
        await driver.sleep(500)
        await driver.findElement(By.id("ion-input-0")).click()
        await driver.findElement(By.id("ion-input-0")).sendKeys("dani@gmail.com")
        await driver.findElement(By.id("ion-input-1")).sendKeys("123456")
        await driver.findElement(By.css(".button-solid")).click()
        await driver.findElement(By.id("open-login")).click()
        await driver.sleep(500)
        await driver.findElement(By.css(".button-solid")).click()
    })
})
