/// <reference types="Cypress" />

const { should } = require("chai");

  describe('Central de Atendimento ao Cliente TAT', function() {
    const three_seconds = 3000
    beforeEach(function() {
      cy.visit('./src/index.html'); // Visiting the path to internal HTML file
    });
  
    it('verifica o título da aplicação', function() {
      cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    });
  
    // lesson 01 //
    it('preenche os campos obrigatórios e envia o formulário', function() {
      const longText = 'Campo - Como pode ajudar? Me conseguindo uma vaga de júnior, para que possa mostrar meu potencial e crescer ainda mais profissionalmente. Por isso, me arruma pelo menos uma entrevista, o resto eu desenrolo.'
      
      cy.clock() // Congela o relógio do navegador
      
      cy.get('#firstName').type('Tester'); // Selecting the CSS ID and typing in the field
      cy.get('#lastName').type('Júnior');  // Remember, # means ID and . means class
      cy.get('#email').type('jonathan.test@gmail.com'); 
      cy.get('#open-text-area').type(longText, {delay: 0}); // Now the long text is gonna be typed fastly
      cy.contains('button', 'Enviar').click(); // Selecting the CSS CLASS 'button'. Clicking to register the informations 
      
      cy.get('.success').should('be.visible') // Selecting the CSS CLASS 'success' and asserting if it's visible 
    
      cy.tick(three_seconds) // Avança o relógio 3 segundos, exatamente o tempo que a mensagem de erro some
    
      cy.get('.success').should('not.be.visible'); // Agora quero ver se não vai ser visível
    });

    // lesson 02 //

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
      cy.clock()
      cy.get('#firstName').type('Tester'); 
      cy.get('#lastName').type('Júnior');  
      cy.get('#email').type('jonathan.testgmail.com'); // Typed without @
      cy.get('#open-text-area').type('teste');
      cy.contains('button', 'Enviar').click(); 
      cy.get('.error').should('be.visible');
      cy.tick(three_seconds);
      cy.get('.error').should('not.be.visible');   
    })
    it('campo telefone permanece vazio quando preenchido com valor não-numérico', function(){
      cy.get('#phone')
        .type('asdfghijk') // Strings for phone
        .should('have.value', '')      
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.clock();
      cy.get('#firstName').type('Tester'); 
      cy.get('#lastName').type('Júnior');  
      cy.get('#email').type('jonathan.test@gmail.com'); 
      cy.get('#open-text-area').type('teste');
      cy.get('#phone-checkbox').click()
      cy.contains('button', 'Enviar').click(); 
      cy.get('.error').should('be.visible');
      cy.tick(three_seconds);
      cy.get('.error').should('not.be.visible');
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
      cy.clock()
      cy.contains('button', 'Enviar').click();
      cy.get('.error').should('be.visible')
      cy.tick(three_seconds);
      cy.get('.error').should('not.be.visible')
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
    // lesson 05 //
    it('marca ambos checkboxes, depois desmarca o último', function(){
      cy.get('input[type= "checkbox"]')
        .check()
        .last()
        .uncheck()
    });

    // lesson 05, revisão do teste da lesson 02 para telefone //     
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.clock()
      cy.get('input[type= "checkbox"]').check('phone')
      cy.contains('button', 'Enviar').click(); 
      cy.get('.error').should('be.visible');
      cy.tick(three_seconds);
      cy.get('.error').should('not.be.visible');
    })

    // lesson 06 //
    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]').should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    }) 
    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]').should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    // lesson07 // (Pulei porque não quero que abra esse arquivo quando for testar tudo)
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy.get('#privacy a').should('have.attr', 'target', '_blank')      
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a').invoke('removeAttr', 'target')
        .click()
      cy.contains('e usada para fins de ensino.').should('be.visible')
    })
    // lesson08 - Configuração do viewport //
    // lesson09 - Documentação/Readme //
    // lesson10 - Configuração do CI(Github actions) //
    // lesson11 - adicionando cy.clock() e cy.tick() //
    // lesson11 - refazendo a lesson01 com lodash //
    // lodash - repeat //
    it('preenche os campos obrigatórios e envia o formulário', function() {
      const longText = Cypress._.repeat('0123456789', 20); // salvo na variável o comando lodash, repeat(), com uma string sendo repetida 20 vezes
      
      cy.clock() // Congela o relógio do navegador
      cy.get('#firstName').type('Tester'); // Selecting the CSS ID and typing in the field
      cy.get('#lastName').type('Júnior');  // Remember, # means ID and . means class
      cy.get('#email').type('jonathan.test@gmail.com');

      cy.get('#open-text-area').invoke('val', longText); 

      cy.contains('button', 'Enviar').click(); // Selecting the CSS CLASS 'button'. Clicking to register the informations 
      
      cy.get('.success').should('be.visible') // Selecting the CSS CLASS 'success' and asserting if it's visible 
    
      cy.tick(three_seconds) // Avança o relógio 3 segundos, exatamente o tempo que a mensagem de erro some
    
      cy.get('.success').should('not.be.visible'); // Agora quero ver se não vai ser visível
    });
    // lodash - time //
    // Vou refazer o teste da lesson02, dessa vez repetindo 5 vezes o envio, para verificar a estabilidade do teste //
    Cypress._.times(5, function(){
      it('envia o formuário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()
      });
    });
    // invoke('show') e invoke('hide')
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function(){
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
    });

    // cy.request() permite fazer requisições http com cypress //
    it('faz uma requisição HTTP', function(){
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
          const { status, statusText, body} = response
          expect(status).to.equal(200)
          expect(statusText).to.equal("OK")
          expect(body).to.include('CAC TAT')
        })
    })
    // lesson 12 - Encontre o Gato //
    // Checando se ele está no código // 
    it.only('Verificar se o gato está visível', function(){
      cy.get('#cat').should('contain', '🐈')
    })
    // Fazendo ele ficar visível e checando // 
    it.only('Verificar se o gato está visível', function(){
      cy.get('#cat')
      .invoke('show')
      .should('be.visible') 
      // Brincando com invoke e mudando coisas no site //
      cy.get('#title')
        .invoke('text', 'CAT TAT') //Invoquei o texto de título e mudei pra CAT TAT    
      cy.get('#subtitle')
        .invoke('text', 'Eu 💛 Gatos')
    })
  });


  
  