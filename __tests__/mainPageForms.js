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
        await page.goto('https://chicaga.ru/?is_test_mode=true')
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

    test('Форма бесплатный урок', async () => {
        feature = 'Форма Пробный бесплатный урок'
        description = 'Форма Пробный бесплатный урок'

        await page.waitForSelector('form input[placeholder="Ваше имя"]')

        await page.fill('[placeholder="Ваше имя"]', 'Василий иванович')
        await page.fill('[placeholder="Номер телефона"]', '9509501234')
        await page.selectOption('select[name="school"]', 'Школа в Купчино')
        await page.click('button:has-text("Просто попробуй")')

        // Проверяем
        // // const content = await page.textContent('text="Номенклатура"')
        // await page.waitForSelector('text=Спасибо, ваша заявка успешно отправлена!')
        // expect(await page.textContent('text=Спасибо, ваша заявка успешно отправлена!')).toBe('Спасибо, ваша заявка успешно отправлена!')

        const screen = await page.screenshot({ path: `screens/${today}-mainPageForm-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
    })

    test('Форма бесплатный урок в секции comments', async () => {
        feature = 'Форма Пробный бесплатный урок'
        description = 'Форма Пробный бесплатный урок из секции comments'

        await page.waitForSelector('form input[placeholder="Ваше имя"]')

        await page.fill('.section-comment [placeholder="Ваше имя"]', 'Василий иванович')
        await page.fill('.section-comment [placeholder="Номер телефона"]', '9509501234')
        await page.selectOption('.section-comment select[name="school"]', 'Школа в Купчино')
        await page.click('.section-comment button:has-text("Просто попробуй")')

        // Проверяем
        // // const content = await page.textContent('text="Номенклатура"')
        // await page.waitForSelector('text=Спасибо, ваша заявка успешно отправлена!')
        // expect(await page.textContent('text=Спасибо, ваша заявка успешно отправлена!')).toBe('Спасибо, ваша заявка успешно отправлена!')

        const screen = await page.screenshot({ path: `screens/${today}-mainPageForm-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
    })

    test('Форма Хочу выиграть курс', async () => {
        feature = 'Форма Хочу выигрвать курс'
        description = 'Форма Хочу выигрвать курс'

        await page.click('text=Хочу выиграть курс')

        await page.fill('[placeholder="Имя"]', 'tetst')
        await page.fill('[placeholder="Телефон"]', '831222222')
        await page.selectOption('#exampleModal select[name="school"]', 'Онлайн-обучение');
        await page.click('text=Отправить')

        // Проверяем
        // // const content = await page.textContent('text="Номенклатура"')
        // await page.waitForSelector('text=Спасибо, ваша заявка успешно отправлена!')
        // expect(await page.textContent('text=Спасибо, ваша заявка успешно отправлена!')).toBe('Спасибо, ваша заявка успешно отправлена!')

        const screen = await page.screenshot({ path: `screens/${today}-mainPageForm-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
		await page.click('#exampleModal [aria-label="Close"]')
    })

    test('попап Оплата из шапки', async () => {
        feature = 'Попап Оплата из шапки'
        description = 'Попап Оплата из шапки с заполнением формы и редиректом на платёжную систему'

        // Жмём в шапке для вызова попапа
        await page.click('text=Оплатить')

        // Заполняем
        await page.fill('#buyModal [placeholder="Телефон"]', '12345678')
        await page.fill('#buyModal [placeholder="Ваше ФИО"]', 'autotest')
        await page.fill('#buyModal [placeholder="Email"]', 'autotest@test.ru')
        await page.click(':nth-match(:text("Выберите школу"), 4)')
        await page.click('span:has-text("Школа в Озерках")')
        await page.fill('[placeholder="Сумма"]', '1500')
        await page.click('#buyModal button[name="sendOrder"]')

        // Проверяем
        await page.waitForSelector('text=https://chicaga.ru/edu/')
        screen = await page.screenshot({ path: `screens/${today}-mainPageFormPayFromHead-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
        await page.click('text=Вернуться в магазин')
        await page.click('#unSuccessPayModal [aria-label="Close"]')
    })

    test('попап Оплата из футера', async () => {
        feature = 'Попап Оплата из футера'
        description = 'Попап Оплата из футера с заполнением формы и редиректом на платёжную систему'

        // Жмём в шапке для вызова попапа
        await page.click('button:has-text("Оплатить")')

        // Заполняем
        await page.fill('#buyModal [placeholder="Телефон"]', '12345678')
        await page.fill('#buyModal [placeholder="Ваше ФИО"]', 'autotest')
        await page.fill('#buyModal [placeholder="Email"]', 'autotest@test.ru')
        await page.click(':nth-match(:text("Выберите школу"), 4)')
        await page.click('span:has-text("Школа в Озерках")')
        await page.fill('[placeholder="Сумма"]', '1500')
        await page.click('#buyModal button[name="sendOrder"]')

        // Проверяем
        await page.waitForSelector('text=https://chicaga.ru/edu/')
        screen = await page.screenshot({ path: `screens/${today}-mainPageFormPayFromFooter-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
        await page.click('text=Вернуться в магазин')
        await page.click('#unSuccessPayModal [aria-label="Close"]')
    })

    test('Тест плагина с якорями', async () => {
        feature = 'Тест плагина с якорями'
        description = 'Попап Оплата из футера с заполнением формы и редиректом на платёжную систему'

        await page.goto('https://chicaga.ru')
        // Жмём в шапке для вызова попапа
        await Promise.all([
            page.waitForNavigation({ url: 'https://chicaga.ru/#comment' }),
            page.click('text=Отзывы')
        ])

        screen = await page.screenshot({ path: `screens/${today}-mainPageForm-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")

    })
})
