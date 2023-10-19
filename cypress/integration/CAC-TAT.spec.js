/// <reference types="Cypress" />

const { should } = require("chai");

  describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
      cy.visit('./src/index.html'); // Visiting the path to internal HTML file
    });
  
    it('verifica o título da aplicação', function() {
      cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    });
  
    // lesson 01 //
    it('preenche os campos obrigatórios e envia o formulário', function() {
      const longText = 'Campo - Como pode ajudar? Me conseguindo uma vaga de júnior, para que possa mostrar meu potencial e crescer ainda mais profissionalmente. Por isso, me arruma pelo menos uma entrevista, o resto eu desenrolo.'
      cy.get('#firstName').type('Tester'); // Selecting the CSS ID and typing in the field
      cy.get('#lastName').type('Júnior');  // Remember, # means ID and . means class
      cy.get('#email').type('jonathan.test@gmail.com'); 
      cy.get('#open-text-area').type(longText, {delay: 0}); // Now the long text is gonna be typed fastly
      cy.contains('button', 'Enviar').click(); // Selecting the CSS CLASS 'button'. Clicking to register the informations 
      
      cy.get('.success').should('be.visible'); // Selecting the CSS CLASS 'success' and asserting if it's visible 
    });

    // lesson 02 //

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      cy.get('#firstName').type('Tester'); 
      cy.get('#lastName').type('Júnior');  
      cy.get('#email').type('jonathan.testgmail.com'); // Typed without @
      cy.get('#open-text-area').type('teste');
      cy.contains('button', 'Enviar').click(); 
      
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
      cy.contains('button', 'Enviar').click(); 
      cy.get('.error').should('be.visible');   
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
      cy.get('#firstName').type('Tester').should('have.value', 'Tester'); 
      cy.get('#lastName').type('Júnior').should('have.value', 'Júnior');  
      cy.get('#email').type('jonathan.test@gmail.com').should('have.value', 'jonathan.test@gmail.com'); 
      cy.get('#phone').type('5585991530543').should('have.value', '5585991530543');

      cy.get('#firstName').clear().should('have.value', ''); 
      cy.get('#lastName').clear().should('have.value', '');  
      cy.get('#email').clear().should('have.value', ''); 
      cy.get('#phone').clear().should('have.value', '');
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
      cy.contains('button', 'Enviar').click();
      cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()
    })

    // lesson 03 // 

    it('seleciona um produto (YouTube) por seu texto', function(){
      cy.get('#product').select('youtube').should('have.value', 'youtube')
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
      cy.get('#product').select('Mentoria').should('be.visible', 'Mentoria') //Aqui eu poderia ter usado o valor, no caso, seria menotria com letra minúscula e usaria a option 'have.value'
    })
    it('seleciona um produto (Blog) por seu índice', function(){
      cy.get('#product').select('Blog').should('be.visible', 'Blog')
    })

    // lesson 04 //

    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback')
    })
    it('marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
          });
    });
  });