import ForgotPasswordPage from "./../../pages/forgot_password_page.js"

describe("Forgot Password",()=>{
    let userData, statusMessage
    
    before(()=>{
        ForgotPasswordPage.loadUserData().then((data)=>userData=data)
        ForgotPasswordPage.loadStatusMessage().then((data)=>statusMessage=data)
    })

    beforeEach(()=>ForgotPasswordPage.initialize())

    it("Cancel Forgot Password",()=>ForgotPasswordPage.cancelForgotPassword())

    it("Empty Username",()=>ForgotPasswordPage.emptyUsername(statusMessage))

    it("Valid Username",()=>ForgotPasswordPage.validUsername(userData,statusMessage))
})