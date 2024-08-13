import { faker } from '@faker-js/faker' 

class Home {
    navegarParaSubscription(){
        cy.get('input#susbscribe_email').scrollIntoView()
    }

    preencherSubscription(){
        cy.get('input#susbscribe_email').type(faker.internet.email())
        cy.get('button#subscribe').click()
    }

    verificaSeSubscriptionFoiConcluido(){
        cy.contains('You have been successfully subscribed!').should('be.visible')
    }

    adicionarItemNoCarrinho(){
        cy.contains("Add to cart").click()
    }

    visualizarCarrinho(){
        cy.contains("View Cart").click()
    }

    verificaSeContaFoiExcluida(){
        cy.get('b').should('contain', 'Account Deleted!')
        cy.get('[data-qa="continue-button"]').click()
    }
}

export default new Home()