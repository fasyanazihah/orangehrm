class ForgotPasswordPage {
    loadUserData(){
        return cy.fixture("user_data")
    }

    loadStatusMessage(){
        return cy.fixture("status_message")
    }

    initialize(){
        cy.visit('/auth/requestPasswordResetCode')
    }

    cancelForgotPassword(){
        cy.get('.oxd-button--ghost').click()
        cy.url().should('include', 'login')
        cy.wait(3000)
    }

    emptyUsername(statusMessage){
        cy.get('.oxd-input').clear()
        cy.get('.oxd-button--secondary').click()
        cy.contains(statusMessage.emptyField)
    }

    validUsername(userData,statusMessage){
        cy.get('.oxd-input').clear().type(userData.validUser.username)
        cy.get('.oxd-button--secondary').click()
        cy.contains(statusMessage.successMessage)
    }
}

export default new ForgotPasswordPage()