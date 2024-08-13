import { faker } from "@faker-js/faker"

class Cadastro {
    iniciarCadastro(usuario, email){
        cy.get('[data-qa="signup-name"]').type(usuario)
        cy.get('[data-qa="signup-email"]').type(email)
        cy.contains('button', 'Signup').click()
    }

    preencherFormulario(){
        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const fakeNome = `${firstName} ${lastName}`

        Cypress.env('fakeNome', fakeNome)
        
        cy.get('[data-qa="signup-name"]').type(Cypress.env('fakeNome'))
        cy.get('[data-qa="signup-email"]').type(faker.internet.email())
        cy.get('[data-qa="signup-button"]').click()
        cy.get('#id_gender2').check()
        cy.get('[data-qa="password"]').type('password')
        cy.get('[data-qa="days"]').select('6')
        cy.get('[data-qa="months"]').select('July')
        cy.get('[data-qa="years"]').select('2006')
        cy.get('input[name="newsletter"]').check()
        cy.get('input[type=checkbox]#optin').check()
        cy.get('[data-qa="first_name"]').type(firstName)
        cy.get('[data-qa="last_name"]').type(lastName)
        cy.get('[data-qa="company"]').type('Automation Ltda.')
        cy.get('input[name="address1"]').type(faker.location.streetAddress())
        cy.get('input[name="address2"]').type(faker.location.streetAddress())
        cy.get('[data-qa="country"]').type(faker.location.country())
        cy.get('[data-qa="state"]').type(faker.location.state())
        cy.get('[data-qa="city"]').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type(faker.phone.number())
        cy.contains('Create Account').click()
    }

    verificarSeCadastroFoiConcluido(){
        cy.url().should('includes', 'account_created')
        cy.get('[data-qa="account-created"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
        cy.get('i.fa-user').parent().should('contain', Cypress.env('fakeNome'))
    }

    validaMensagemDeUsuarioExistente() {
        cy.get(`.signup-form form p`).should('be.visible').and('contain', 'Email Address already exist!')
    }
}

export default new Cadastro()