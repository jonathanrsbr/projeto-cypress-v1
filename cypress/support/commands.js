Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
  cy.get('#firstName').type('Tester'); // Selecting the CSS ID and typing in the field
  cy.get('#lastName').type('Júnior');  // Remember, # means ID and . means class
  cy.get('#email').type('jonathan.test@gmail.com'); 
  cy.get('#open-text-area').type('Teste'); 
  cy.get('.button[type="submit"]').click();  
})
    