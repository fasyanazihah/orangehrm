Cypress.Commands.add('selector', (name) => {
  	return cy.get(name)
})

Cypress.Commands.add('call', (name) => {
  	return cy.wait(name)
})