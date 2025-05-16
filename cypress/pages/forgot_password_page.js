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
        cy.selector('.oxd-button--ghost').click()
        cy.get('.oxd-text--h5').should("be.visible")
        cy.url().should('include', 'login')
    }

    emptyUsername(statusMessage){
        cy.selector('.oxd-input').clear()
        cy.selector('.oxd-button--secondary').click()
        cy.contains(statusMessage.emptyField)
    }

    validUsername(userData,statusMessage){
        cy.selector('.oxd-input').clear().type(userData.validUser.username)
        cy.selector('.oxd-button--secondary').click()
        cy.contains(statusMessage.successMessage)
    }
}

export default new ForgotPasswordPage()