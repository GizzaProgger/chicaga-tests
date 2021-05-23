const { chromium, firefox, webkit, devices } = require('playwright');
const { LoginPage } = require('../models/Login')
const globalVars = require('../models/globalVars')
const baseurl = "https://m.chicaga.ru/"
const headfullBrowserState = globalVars.browserState
const browserName = process.env.BROWSER || globalVars.browser // chromium, firefox, webkit

describe('Мобильная главная страница - медиа', () => {
    let browser
    let context
    let page
    let today = new Date().toLocaleDateString()
    let feature, description
    let epic = 'Модальные формы на главной мобильной версии'

    beforeAll(async () => {
        browser = await { chromium, webkit, firefox }[browserName].launch({
            headless: headfullBrowserState,
            args: ['--disable-dev-shm-usage'],
            slowMo: 100
        })
        context = await browser.newContext({
            ...devices['Pixel 5'],
        })
        page = await context.newPage()
        const loginPage = new LoginPage(page)
        await page.goto(baseurl)
    })

    afterAll(async () => {
        await context.close()
        await browser.close()
    })

    beforeEach(() => {
        reporter
            .feature(feature)
            .description(description)
            .epic(epic)
    })

    test('Видео школа английского номер 1', async () => {
        feature = 'Видео школа английского номер 1'
        description = 'Видео школа английского номер 1'

        //
        await page.click('#buttons-play-pause')
        await page.click('#buttons-play-pause')
        // Проверяем
        screen = await page.screenshot({ path: `screens/${today}-mobileFirstVideo-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
    })

    test('Видео Разыгрываем один миллион', async () => {
        feature = 'Видео Разыгрываем один миллион'
        description = 'Видео Разыгрываем один миллион'

        //
        await page.click('.raffle-start-btn')
        await page.waitForTimeout(11000)
        await page.click('.raffle-start-btn')
        // Проверяем
        screen = await page.screenshot({ path: `screens/${today}-mobileOneMiilionVideo-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")

    })
})
