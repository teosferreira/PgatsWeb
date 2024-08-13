/// <reference types="cypress"/>
import { faker } from '@faker-js/faker' 

describe('Automation Exercise', () => {
    it('Test Case 1: Cadastrar um usuário', () => {
        const timestamp = new Date().getTime()
        const fakeNome = 'QA Tester'

        cy.visit('https://automationexercise.com/')
        cy.contains('Signup').click()
        cy.get('[data-qa="signup-name"]').type(fakeNome)
        cy.get('[data-qa="signup-email"]').type(`tester-${timestamp}@mail.com`)
        cy.get('[data-qa="signup-button"]').click()
        cy.get('#id_gender2').check()
        cy.get('[data-qa="password"]').type('password')
        cy.get('[data-qa="days"]').select('6')
        cy.get('[data-qa="months"]').select('July')
        cy.get('[data-qa="years"]').select('2006')
        cy.get('input[name="newsletter"]').check()
        cy.get('input[type=checkbox]#optin').check()
        cy.get('[data-qa="first_name"]').type('QA')
        cy.get('[data-qa="last_name"]').type('Tester')
        cy.get('[data-qa="company"]').type('Automation Ltda.')
        cy.get('input[name="address1"]').type('Rua Ficticia 1, Nº 123')
        cy.get('input[name="address2"]').type('Rua Ficticia 2, Nº 456')
        cy.get('[data-qa="country"]').select('Australia')
        cy.get('[data-qa="state"]').type('Victoria')
        cy.get('[data-qa="city"]').type('Melbourne')
        cy.get('[data-qa="zipcode"]').type('987654321')
        cy.get('[data-qa="mobile_number"]').type('011999998888')
        cy.contains('Create Account').click()
        cy.url().should('includes', 'account_created')
        cy.get('[data-qa="account-created"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
        cy.get('i.fa-user').parent().should('contain', fakeNome)
    })


    it('Test Case 2: Login User with correct email and password', () => {
        cy.visit('https://automationexercise.com');
        cy.contains('Signup').click();
        cy.get('[data-qa="login-email"]').type('tester-1721346302730@mail.com');
        cy.get('[data-qa="login-password"]').type('12345', { log: false });
        cy.get('[data-qa="login-button"]').click();
        cy.get('i.fa-user').parent().should('contain', 'Tester QA');
    })

    it('Test Case 3: Login User with incorrect email and password', () => {
        cy.visit('https://automationexercise.com');
        cy.contains('Signup').click();
        cy.get('[data-qa="login-email"]').type('tester-1721346302730@mail.com');
        cy.get('[data-qa="login-password"]').type('54321', { log: false });
        cy.get('[data-qa="login-button"]').click();
        cy.get('.login-form form p').parent().should('contain', 'Your email or password is incorrect!');
    })

    it('Test Case 4: Logout after login', () => {
        cy.visit('https://automationexercise.com');
        cy.contains('Signup').click();
        cy.get('[data-qa="login-email"]').type('tester-1721346302730@mail.com');
        cy.get('[data-qa="login-password"]').type('12345', { log: false });
        cy.get('[data-qa="login-button"]').click();
        cy.contains('Logout').click()
        cy.url().should('contain', 'login')
        cy.contains("Login to your account").should("be.visible")
    })

    it('Test Case 5: Register User with existing email', () => {
        cy.visit('https://automationexercise.com');
        cy.contains('Signup').click()
        cy.get('[data-qa="signup-name"]').type(`Tester QA`)
        cy.get('[data-qa="signup-email"]').type(`tester-1721346302730@mail.com`)
        cy.contains('button', 'Signup').click()
        cy.get(`.signup-form form p`)
          .should('be.visible')
          .and('contain', 'Email Address already exist!')
      });

      it('Test Case 6: Contact Us Form', () => {
        cy.visit('https://automationexercise.com')
        cy.contains(`Contact us`).click()
        cy.get(`.contact-form h2`)
          .should('be.visible')
          .and('have.text', 'Get In Touch')
        cy.get('[data-qa="name"]').type(`Tester`)
        cy.get('[data-qa="email"]').type(`tester-qa@mail.com`)
        cy.get('[data-qa="subject"]').type(`Test Automation`)
        cy.get('[data-qa="message"]').type(`Learning Test Automation`)
        cy.fixture('example.json').as('arquivo')
        cy.get('input[name="upload_file"]').selectFile('@arquivo')
        cy.get('[data-qa="submit-button"]').click()
        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
      });

      it('Test Case 8: Verify All Products and product detail page', () => {
        cy.visit('https://automationexercise.com')
        cy.contains(`Products`).click()
        cy.url().should('contain', 'products')
        cy.get('.title').should('be.visible').and('contain', 'All Products')
        cy.get('.single-products')
          .should('be.visible')
          .and('have.length.at.least', 1)
          .first()
          .parent()
          .contains('View Product')
          .click()
        cy.get('.product-information > h2').should('be.visible')
        cy.get('.product-information p').should('be.visible').and('have.length', 4)
        cy.get('.product-information span span').should('be.visible')
      });

      it('Test Case 9: Search Product', () => {
        cy.visit('https://automationexercise.com')
        cy.contains(`Products`).click()
        cy.url().should('contain', 'products')
        cy.get('.title').should('be.visible').and('contain', 'All Products')
        cy.get('input#search_product').type('Shirt')
        cy.get('button#submit_search').click()
        cy.get('.title').should('be.visible').and('contain', 'Searched Products')
        cy.get('.single-products')
          .should('be.visible')
          .and('have.length.at.least', 1)
      });

      it('Test Case 10: Verify Subscription in home page', () => {
        cy.visit('https://automationexercise.com')
        cy.get('input#susbscribe_email')
          .scrollIntoView()
          .type('tester-qa@mail.com')
        cy.get('button#subscribe').click()
        cy.contains('You have been successfully subscribed!').should('be.visible')
      });

      it('Test Case 15: Place Order: Register before Checkout', () => {
        const timestamp = new Date().getTime()
        const nome = "Iron Man"
        cy.visit('https://automationexercise.com')
        cy.get('[href$=login]').click()
        cy.get('[data-qa="signup-name"]').type(nome)
        cy.get('[data-qa=signup-email]').type(`ironman${timestamp}@qa.com.br`)
        cy.get('[data-qa="signup-button"]').click()
        cy.get('input[type=radio]').eq(0).check();
        cy.get('[data-qa="password"]').type('5r4s15sd5f1', { log: false });
        cy.get('[data-qa=days]').select(25)
        cy.get('[data-qa="months"]').select(5)
        cy.get('[data-qa="years"]').select('1989')
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()
        cy.get('[data-qa="first_name"]').type('Tony')
        cy.get('[data-qa="last_name"]').type('Stark')
        cy.get('[data-qa="company"]').type('Stark Industries')
        cy.get('[data-qa="address"]').type('XXXX')
        cy.get('[data-qa="country"]').select('United States')
        cy.get('[data-qa="state"]').type('California')
        cy.get('[data-qa="city"]').type('Los Angeles')
        cy.get('[data-qa="zipcode"]').type('8789498')
        cy.get('[data-qa="mobile_number"]').type('378 98562-8781')
        cy.get('[data-qa="create-account"]').click()
        cy.get('b')
          .should('contain', 'Account Created!')
        cy.url().should('includes', 'account_created')
        cy.get('[data-qa="account-created"]')
          .should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
        cy.get('b').should('contain', nome)
        cy.contains("Add to cart").click()
        cy.contains("View Cart").click()
        cy.get('.btn-default.check_out').should('be.visible')
        cy.get('.btn-default.check_out').click()
        cy.get('.heading').first().should('have.text', 'Address Details')
        cy.get('.heading').last().should('have.text', 'Review Your Order')
        cy.get('.form-control').type('378 98562-8781')
        cy.get('.btn-default.check_out').click()
        cy.get('[data-qa="name-on-card"]').type(faker.person.fullName())
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').type(12)
        cy.get('[data-qa="expiry-year"]').type(2035)
        cy.get('[data-qa="pay-button"]').click()
        cy.get('[data-qa="order-placed"]').should('be.visible')
        cy.get('[href *="delete"]').click()
        cy.get('b').should('contain', 'Account Deleted!')
        cy.get('[data-qa="continue-button"]').click()
      });
})