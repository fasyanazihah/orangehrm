Cypress.Commands.add('selector', (name) => {
  	return cy.get(name,{timeout:Number.MAX_SAFE_INTEGER})
})