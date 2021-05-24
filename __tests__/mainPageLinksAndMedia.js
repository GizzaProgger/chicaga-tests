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
            slowMo: 500
        })
        context = await browser.newContext({
            viewport: { width: 1920, height: 1080 }
        })
        page = await context.newPage()
        const loginPage = new LoginPage(page)
        await loginPage.navigate()
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

    test('попап Оплата из футера', async () => {
        feature = 'Попап Оплата из футера'
        description = 'Попап Оплата из футера и закрытие окна'

        // Жмём в футере для вызова попапа
        await page.click('button:has-text("Оплатить")')

        // Проверяем
        await page.isVisible('h5:has-text("Оплата")')

        screen = await page.screenshot({ path: `screens/${today}-buyFromFooter-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")

        await page.click('#buyModal [aria-label="Close"]')
    })

    test('попап Политика конфиденциальности', async () => {
        feature = 'Попап политика конфиденциальности'
        description = 'Попап политика конфиденциальности'

        // Жмём в футере для вызова попапа
        await page.waitForSelector('#fullpage >> text=Политика конфиденциальности')
        await page.click('#fullpage >> text=Политика конфиденциальности')

        // Проверяем
        await page.isVisible('h5:has-text("Политика конфиденциальности")')

        screen = await page.screenshot({ path: `screens/${today}-policyModal-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
        await page.click('#policyModal >> [aria-label="Close"]')
    })

    test('попап Пользовательское соглашение', async () => {
        feature = 'Попап пользовательское соглашение'
        description = 'Попап пользовательское соглашение'

        // Жмём в футере для вызова попапа
        await page.waitForSelector('#fullpage >> text=Пользовательское соглашение')
        await page.click('#fullpage >> text=Пользовательское соглашение')

        // Проверяем
        await page.isVisible('h5:has-text("Пользовательское соглашение")')

        screen = await page.screenshot({ path: `screens/${today}-userConfirmModal-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
        await page.click('#policyModal2 >> [aria-label="Close"]')
    })

    test('вызов видео в advantages', async () => {
        feature = 'Вызов видео в advantages'
        description = 'Вызов видео в advantages'

        // Жмём вызова видео
        await page.click('.rvg-icon')
        await page.waitForTimeout(1000)
        // Проверяем
        await page.isVisible('html5-video-container >> text=Катя Фишер отзыв')

        screen = await page.screenshot({ path: `screens/${today}-videoAdvantages-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
        await page.click('a:has-text("Close")')
    })

    test('вызов видео в buy', async () => {
        feature = 'Вызов видео в buy'
        description = 'Вызов видео в buy и закрытие'

        // Жмём вызова видео
        await page.click('.raffle-start-btn')
        await page.waitForTimeout(1000)
        await page.click('.jquery-background-video-pauseplay')

        // Проверяем

        screen = await page.screenshot({ path: `screens/${today}-videoBuy-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
        await page.click('#billionModal [aria-label="Close"]')
    })

    test('открытие карт в секции контакты', async () => {
        feature = 'Открытие карт в секции контакты'
        description = 'Открытие карт в секции контакты'

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

        screen = await page.screenshot({ path: `screens/${today}-mapsInContacts-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
    })


    test('слайдер тренеров английского', async () => {
        feature = 'Cлайдер тренеров английского'
        description = 'Cлайдер тренеров английского'

        // Листаем слайдер и ждём тренера
        await page.click(':nth-match(button[role="presentation"], 2)')
        await page.waitForSelector('.active >> .name >> text=Наталья')

        await page.click(':nth-match(button[role="presentation"], 2)')
        await page.waitForSelector('.active >> .name >> text=Алиса')

        await page.click(':nth-match(button[role="presentation"], 2)')
        await page.waitForSelector('.active .name >> text=Анастасия')

        await page.click(':nth-match(button[role="presentation"], 2)')
        await page.waitForSelector('.active .name >> text=Кейси')

        screen = await page.screenshot({ path: `screens/${today}-trenersSlider-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
    })

    test('Видео школа английского номер 1', async () => {
        feature = 'Видео школа английского номер 1'
        description = 'Видео школа английского номер 1'

        //
        await page.click('#buttons-play-pause')
        // await page.click('#buttons-play-pause')
        // Проверяем
        screen = await page.screenshot({ path: `screens/${today}-mobileFirstVideo-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
    })

    test('Видео Разыгрываем один миллион', async () => {
        feature = 'Видео Разыгрываем один миллион'
        description = 'Видео Разыгрываем один миллион'

        //
        await page.click('.raffle-start-btn')
        await page.keyboard.press('Escape')
        // Проверяем
        screen = await page.screenshot({ path: `screens/${today}-mobileOneMiilionVideo-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")

    })
})
