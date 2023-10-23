it('testa a página da política de privacidade de forma independente',function(){
    cy.visit('../src/privacy.html')
    cy.contains('e usada para fins de ensino.').should('be.visible')
})