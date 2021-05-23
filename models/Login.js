const globalVars = require('../models/globalVars')
const baseurl = globalVars.baseurl

class LoginPage {
  constructor(page) {
    this.page = page
  }

  async navigate() {
    await this.page.goto(baseurl)
  }
}

module.exports = { LoginPage }