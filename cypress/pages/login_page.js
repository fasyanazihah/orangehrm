class LoginPage {
    loadUserData(){
        return cy.fixture("user_data")
    }

    initialize(){
        cy.visit('/auth/login'); 
    }

    perform(username="",password=""){
        if(username) cy.selector(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(username)
        if(password) cy.selector(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(password)
        cy.selector('.oxd-button').click()
    }

    validateSuccessLogin(){
        cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should("be.visible")
        cy.url().should('include', 'dashboard')
    }
}

export default new LoginPage();