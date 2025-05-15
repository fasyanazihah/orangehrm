import LoginPage from "./../../pages/login_page.js"

describe("Login",()=>{
    beforeEach(() => {
        cy.visit('/auth/login'); 
    })
    it("Empty Username & Empty Password",()=>{
        LoginPage.loginAction("","")
    })
    it("Empty Username & Filled Password",()=>{
        cy.fixture("userData").then((data)=>{
            LoginPage.loginAction("",data.validUser.password)
        })
    })
    it("Filled Username & Empty Password",()=>{
        cy.fixture("userData").then((data)=>{
            LoginPage.loginAction(data.validUser.username,"")
        })
    })
    it("Invalid Username & Valid Password",()=>{
        cy.fixture("userData").then((data)=>{
            LoginPage.loginAction(data.invalidUser.username,data.validUser.password)
        })
    })
    it("Valid Username & Invalid Password",()=>{
        cy.fixture("userData").then((data)=>{
            LoginPage.loginAction(data.validUser.username,data.invalidUser.password)
        })
    })
    it("Invalid Username & Invalid Password",()=>{
        cy.fixture("userData").then((data)=>{
            LoginPage.loginAction(data.invalidUser.username,data.invalidUser.password)
        })
    })
    it("Valid Username & Valid Password",()=>{
        cy.fixture("userData").then((data)=>{
            LoginPage.loginAction(data.validUser.username,data.validUser.password)
            cy.wait(3000)
            cy.url().should('include', 'dashboard');
        })
    })
})