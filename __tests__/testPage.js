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

    test('переход на страницу с тестом с главной', async () => {
        feature = 'Открытие карт в форме контакты'
        description = 'Открытие карт в форме контакты'

        await page.click('text=тест')

        // Проверяем
        await page.waitForSelector('text=Онлайн-тест на уровень знания английского языка')
        screen = await page.screenshot({ path: `screens/${today}-testPageRedirect-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
    })

    test('прохождение теста на 100%', async () => {
        feature = 'Тест'
        description = 'Прохождение теста на 100%'

        // 1
        await page.click('text=sister')
        await page.click('text=Next')
        // 2
        await page.click('text=isn\'t')
        await page.click('text=Next')
        // 3
        await page.click('text=their')
        await page.click('text=Next')
        // 4
        await page.click('text=Where\'s')
        await page.click('text=Next')
        // 5
        await page.click('text=eat, are having')
        await page.click('text=Next')
        // 6
        await page.click('text=heavily')
        await page.click('text=Next')
        // 7
        await page.click('text=earns')
        await page.click('text=Next')
        // 8
        await page.click('text=have been')
        await page.click('text=Next')
        // 9
        await page.click('text=don\'t have to')
        await page.click('text=Next')
        // 10
        await page.click('text=as fashionable as')
        await page.click('text=Next')
        // 11
        await page.click('text=mean')
        await page.click('text=Next')
        // 12
        await page.click('text=how she is')
        await page.click('text=Next')
        // 13
        await page.click('text=cancel')
        await page.click('text=Next')
        // 14
        await page.click('text=locking')
        await page.click('text=Next')
        // 15
        await page.click('text=in case')
        await page.click('text=Next')
        // 16
        await page.click('text=didn’t they')
        await page.click('text=Next')
        // 17
        await page.click('#step-17 >> text=which')
        await page.click('text=Next')
        // 18
        await page.click('text=going')
        await page.click('text=Next')
        // 19
        await page.click('text=were having, rang')
        await page.click('text=Next')
        // 20
        await page.click('text=whether, not to use')
        await page.click('text=Next')
        // 21
        await page.click('text=don’t leave, miss')
        await page.click('text=Next')
        // 22
        await page.click('text=had been waiting')
        await page.click('text=Next')
        // 23
        await page.click('text=have been having')
        await page.click('text=Next')
        // 24
        await page.click('text=had come, have missed')
        await page.click('text=Next')
        // 25
        await page.click('text=is used to driving')
        await page.click('text=I finished')

        // Проверяем
        await page.waitForSelector('text=25 / 25')
        screen = await page.screenshot({ path: `screens/${today}-testPageRedirect-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
    })

    test('прохождение теста на any %', async () => {
        feature = 'Тест'
        description = 'Прохождение теста на any %'

        await page.reload()
        // 1
        await page.click('text=sister')
        await page.click('text=Next')
        // 2
        await page.click('text=isn\'t')
        await page.click('text=Next')
        // 3
        await page.click('text=their')
        await page.click('text=Next')
        // 4
        await page.click('text=Where\'s')
        await page.click('text=Next')
        // 5
        await page.click('text=eat, have')
        await page.click('text=Next')
        // 6
        await page.click('text=heavily')
        await page.click('text=Next')
        // 7
        await page.click('text=earns')
        await page.click('text=Next')
        // 8
        await page.click('text=have been')
        await page.click('text=Next')
        // 9
        await page.click('text=don\'t have to')
        await page.click('text=Next')
        // 10
        await page.click('text=more fashionable as')
        await page.click('text=Next')
        // 11
        await page.click('text=mean')
        await page.click('text=Next')
        // 12
        await page.click('text=how she is')
        await page.click('text=Next')
        // 13
        await page.click('text=cancel')
        await page.click('text=Next')
        // 14
        await page.click('text=locked')
        await page.click('text=Next')
        // 15
        await page.click('#step-15 >> :nth-match(:text("as"), 2)')
        await page.click('text=Next')
        // 16
        await page.click('text=couldn’t she')
        await page.click('text=Next')
        // 17
        await page.click('#step-17 >> text=it')
        await page.click('text=Next')
        // 18
        await page.click('text=going')
        await page.click('text=Next')
        // 19
        await page.click('text=had, has rung')
        await page.click('text=Next')
        // 20
        await page.click('text=that, no use')
        await page.click('text=Next')
        // 21
        await page.click('text=don’t leave, miss')
        await page.click('text=Next')
        // 22
        await page.click('text=has been waiting')
        await page.click('text=Next')
        // 23
        await page.click('text=have been having')
        await page.click('text=Next')
        // 24
        await page.click('text=would come, miss')
        await page.click('text=Next')
        // 25
        await page.click('text=is used to drive')
        await page.click('text=I finished')

        // Проверяем
        await page.waitForSelector('span:has-text("14 / 25")')
        screen = await page.screenshot({ path: `screens/${today}-testPageRedirect-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
    })

    // test('заполняем форму после теста', async () => {
    //     feature = 'Форма обратной связи после теста'
    //     description = 'Заполняем форму после теста'

    //     // Fill [placeholder="Ваше имя"]
    //     await page.fill('[placeholder="Ваше имя"]', 'test')
    //     // Press Tab
    //     await page.press('[placeholder="Ваше имя"]', 'Tab')
    //     // Fill [placeholder="Номер телефона"
    //     await page.fill('[placeholder="Номер телефона"]', '12300')
    //     // Press a with modifiers
    //     await page.press('[placeholder="Номер телефона"]', 'Control+a')
    //     // Select Онлайн-обучение
    //     await page.selectOption('select[name="school"]', 'Онлайн-обучение')
    //     // Проверяем
    //     await page.waitForSelector('text=Онлайн-тест на уровень знания английского языка')
    //     screen = await page.screenshot({ path: `screens/${today}-testPageRedirect-${browserName}.png` })
    //     reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
    // })

})
