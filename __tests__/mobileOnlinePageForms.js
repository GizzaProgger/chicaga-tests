const { chromium, firefox, webkit, devices } = require('playwright');
const { LoginPage } = require('../models/Login')
const globalVars = require('../models/globalVars')
const baseurl = "https://m.chicaga.ru/onlain"
const headfullBrowserState = globalVars.browserState
const browserName = process.env.BROWSER || globalVars.browser // chromium, firefox, webkit

describe('Главная страница - заполение формы', () => {
    let browser
    let context
    let page
    let today = new Date().toLocaleDateString()
    let feature, description
    let epic = 'Модальный формы на онлайн в мобильной версии'

    beforeAll(async () => {
        browser = await { chromium, webkit, firefox }[browserName].launch({
            headless: headfullBrowserState,
            args: ['--disable-dev-shm-usage'],
            slowMo: 100
        })
        context = await browser.newContext({
            ...devices['Pixel 2'],
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

    test('Мобильная форма бесплатный урок', async () => {
        feature = 'Форма бесплатный пробный урок в первой секции'
        description = 'Форма бесплатный пробный урок в первой секции'

        // Вызываем форму
        await page.click('section.mob__first-screen >> text=БЕСПЛАТНЫЙ ПРОБНЫЙ УРОК')
        // Заполняем форму
        await page.click('.popup__form-group div div .new-select')
        await page.click('span:has-text("Online школа")')
        await page.fill('.popup__form-group [placeholder="Ваше имя"]', 'test')
        await page.fill('.popup__form-group [placeholder="Номер телефона"]', '2')
        // Отправляем
        // await page.click(':nth-match(button:has-text("Отправить"), 2)')

        // Проверяем
        screen = await page.screenshot({ path: `screens/${today}-mobileFreeClassForm-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")

        await page.click('.popup-btn__closed span')
    })

    test('Мобильная форма Хочу выйграть курс', async () => {
        feature = 'Форма Хочу выйграть курс'
        description = 'Форма Хочу выйграть курс'

        // Вызываем форму
        await page.click('text=Хочу выиграть курс')
        // Заполняем форму
        await page.click('.popup__london .popup__form-group div div .new-select')
        await page.click('.popup__london span:has-text("Online школа")')
        await page.fill('.popup__london [placeholder="Ваше имя"]', 'test')
        await page.fill('.popup__london [placeholder="Номер телефона"]', '2')
        // Отправляем
        // await page.click(':nth-match(button:has-text("Отправить"), 2)')

        // Проверяем
        screen = await page.screenshot({ path: `screens/${today}-mobileFreeCourseForm-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")

        await page.click('.popup__london  .popup-btn__closed span')
    })

    test('Мобильная форма в футере Задать вопрос', async () => {
        feature = 'Форма Задать вопрос'
        description = 'Форма в футере Задать вопрос'

        // Заполняем форму
        await page.fill('#footer [placeholder="Ваше имя"]', 'test')
        await page.fill('#footer [placeholder="Номер телефона"]', 'test')
        await page.click('#footer form >> :nth-match(:text("Выберите школу"), 2)')
        await page.click('#footer span:has-text("Онлайн-обучение")')
        await page.fill('#footer textarea[name="question"]', 'test')

        // Отправляем
        // await page.click('button:has-text("Отправить")')

        // Проверяем
        screen = await page.screenshot({ path: `screens/${today}-mobileAskAQuestionForm-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")
    })

    test('Мобильная форма записаться на курс', async () => {
        feature = 'Форма Записаться на курс'
        description = 'Мобильная форма Записаться на курс из блока Программы'

        // Вызываем форму
        await page.click('text=Начинающим')
        await page.click('text=Записаться')

        // Заполняем форму
        await page.click('.popup__form-group div div .new-select')
        await page.click('span:has-text("Online школа")')
        await page.fill('.popup__form-group [placeholder="Ваше имя"]', 'test')
        await page.fill('.popup__form-group [placeholder="Номер телефона"]', '2')
        // Отправляем
        // await page.click(':nth-match(button:has-text("Отправить"), 2)')

        // Проверяем
        screen = await page.screenshot({ path: `screens/${today}-mobileCourseFromProgramsForm-${browserName}.png` })
        reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")

        await page.click('.popup-btn__closed span')
    })

    // test('Мобильная форма Оплатить (меню)', async () => {
    //     feature = 'Форма Оплатить'
    //     description = 'Мобильная форма Оплатить в меню'

    //     // Вызываем форму
    //     await page.click('#burger div')
    //     await page.click('text=Оплатить')

    //     // Заполняем форму
    //     await page.fill('[placeholder="Телефон"]', 'test')
    //     await page.fill('[placeholder="Ваше ФИО"]', 'test')
    //     await page.fill('[placeholder="Email"]', 'test@test.ru')
    //     await page.click('.popup__pay .new-select') // Не прокликивается
    //     await page.click('.popup__pay >> text=Школа в Купчино')
    //     await page.fill('[placeholder="Сумма"]', 50)
    //     // Отправляем
    //     // await page.click('button:has-text("Оплатить")')

    //     // Проверяем
    //     screen = await page.screenshot({ path: `screens/${today}-mobilePayForm-${browserName}.png` })
    //     reporter.addAttachment(`${browserName}-Screenshot`, screen, "image/png")

    //     await page.click('.popup__london  .popup-btn__closed span')
    // })

})
