/// <reference types="Cypress" />

  describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
      cy.visit('./src/index.html'); // Visiting the path to internal HTML file
    });
  
    it('verifica o título da aplicação', function() {
      cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    });
  
    it('preenche os campos obrigatórios e envia o formulário', function() {
      const longText = 'Me conseguindo uma vaga de júnior, para que possa mostrar meu potencial e crescer ainda mais profissionalmente. Por isso, me arruma pelo menos uma entrevista, o resto eu desenrolo.'
      cy.get('#firstName').type('Tester'); // Selecting the CSS ID and typing in the field
      cy.get('#lastName').type('Júnior');  // Remember, # means ID and . means class
      cy.get('#email').type('jonathan.test@gmail.com'); 
      cy.get('#open-text-area').type(longText, {delay: 0}); // Now the long text is gonna be typed fastly
      cy.get('.button[type="submit"]').click(); // Selecting the CSS CLASS 'button'. Clicking to register the informations 
      
      cy.get('.success').should('be.visible'); // Selecting the CSS CLASS 'success' and asserting if it's visible 
    });
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      cy.get('#firstName').type('Tester'); 
      cy.get('#lastName').type('Júnior');  
      cy.get('#email').type('jonathan.testgmail.com'); // Typed without @
      cy.get('#open-text-area').type('teste');
      cy.get('.button[type="submit"]').click(); 
      
      cy.get('.error').should('be.visible');   
    })
    it('campo telefone permanece vazio quando preenchido com valor não-numérico', function(){
      cy.get('#phone')
        .type('asdfghijk') // Strings for phone
        .should('have.value', '')      
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.get('#firstName').type('Tester'); 
      cy.get('#lastName').type('Júnior');  
      cy.get('#email').type('jonathan.test@gmail.com'); 
      cy.get('#open-text-area').type('teste');

      cy.get('#phone-checkbox').click()
      cy.get('.button[type="submit"]').click(); 
      cy.get('.error').should('be.visible');

    
    })
  });
  