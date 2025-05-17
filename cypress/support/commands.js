Cypress.Commands.add('selector', (name) => {
  	return cy.selector(name,{timeout:3600000})
})

Cypress.Commands.add('call', (name) => {
  	return cy.wait(name,{timeout:3600000})
})