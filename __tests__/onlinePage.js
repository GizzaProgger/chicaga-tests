const { chromium, firefox, webkit } = require('playwright');
const { LoginPage } = require('../models/Login')
const globalVars = require('../models/globalVars')
const baseurl = globalVars.baseurl
const headfullBrowserState = globalVars.browserState
const browserName = process.env.BROWSER || globalVars.browser // chromium, firefox, webkit

describe('Главная страница - заполение формы', () => {
    let browser
    let context
    let page
    let today = new Date().toLocaleDateString()
    let feature, description
    let epic = 'Модальный формы на главной'

    beforeAll(async () => {
        browser = await { chromium, webkit, firefox }[browserName].launch({
            headless: headfullBrowserState,
            args: ['--disable-dev-shm-usage'],
            slowMo: 300
        })
        context = await browser.newContext({
            viewport: { width: 1920, height: 1080 }
        })
        page = await context.newPage()
        await page.goto('https://chicaga.ru/on-line/#contacts')
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

    test('открытие карт в форме контакты', async () => {
        feature = 'Открытие карт в форме контакты'
        description = 'Открытие карт в форме контакты'

        // Жмём вызова видео
        await page.click('.section-contacts .info-schools .item >> text=Увидеть вход и парковку')
        await page.click('.fancybox-button.fancybox-button--close')
        await page.click('.section-contacts .info-schools .item:nth-child(2) >> text=Увидеть вход и парковку')
        await page.click('.fancybox-button.fancybox-button--close')
        await page.click('.section-contacts .info-schools .item:nth-child(3) >> text=Увидеть вход и парковку')
        await page.click('.fancybox-button.fancybox-button--close')
        await page.click('.section-contacts .info-schools .item:nth-child(4) >> text=Увидеть вход и парковку')
        await page.click('.fancybox-button.fancybox-button--close')
        await page.click('.section-contacts .info-schools .item:nth-child(5) >> text=Увидеть вход и парковку')
        await page.click('.fancybox-button.fancybox-button--close')
        await page.click('.section-contacts .info-schools .item:nth-child(6) >> text=Увидеть вход и парковку')
        await page.click('.fancybox-button.fancybox-button--close')

        // Проверяем

        screen = await page.screenshot({ path: `screens/${today}-mapsInContacts-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
    })

})
