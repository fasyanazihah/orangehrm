class LoginPage {
    loginAction(username,password){
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(username) 
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type(password)
        cy.get('.oxd-button').click()  
    }
}

export default LoginPage