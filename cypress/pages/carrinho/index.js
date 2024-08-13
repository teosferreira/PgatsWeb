class Carrinho {
    irParaCheckout(){
        cy.get('.btn-default.check_out').should('be.visible')
        cy.get('.btn-default.check_out').click()
    }
}

export default new Carrinho()