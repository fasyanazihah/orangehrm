Cypress.Commands.add('selector', (name) => {
	cy.get(name).should('be.visible')
  	return cy.get(name)
})