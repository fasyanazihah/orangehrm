import LoginPage from "../../pages/login_page.js"

describe("Login",()=>{
    let userData

    before(()=>{
        LoginPage.loadUserData().then((data)=>userData=data)
    })
    beforeEach(() => {
        LoginPage.initialize()
    })
    it("Empty Username & Empty Password",()=>{
        LoginPage.perform()
    })
    it("Empty Username & Filled Password",()=>{
        LoginPage.perform("",userData.validUser.password)
    })
    it("Filled Username & Empty Password",()=>{
        LoginPage.perform(userData.validUser.username,"")
    })
    it("Invalid Username & Valid Password",()=>{
        LoginPage.perform(userData.invalidUser.username,userData.validUser.password)
    })
    it("Valid Username & Invalid Password",()=>{
        LoginPage.perform(userData.validUser.username,userData.invalidUser.password)
    })
    it("Invalid Username & Invalid Password",()=>{
        LoginPage.perform(userData.invalidUser.username,userData.invalidUser.password)
    })
    it("Valid Username & Valid Password",()=>{
        LoginPage.perform(userData.validUser.username,userData.validUser.password)
        LoginPage.validateSuccessLogin()
    })
})