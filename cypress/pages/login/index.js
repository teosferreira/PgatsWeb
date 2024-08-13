class Login {
    preencherLogin(usuario, senha){
        cy.get('[data-qa="login-email"]').type(usuario);
        cy.get('[data-qa="login-password"]').type(senha, { log: false });
        cy.get('[data-qa="login-button"]').click();
    }

    verificarSeLoginObteveSucesso(usuario){
        cy.get('i.fa-user').parent().should('contain', usuario)
    }

    verificaSeLogoutObteveSucesso(){
        cy.url().should('contain', 'login')
        cy.contains("Login to your account").should("be.visible")
    }

    verificaMensagemDeErroLoginInvalido(){
        cy.get('.login-form form p').parent().should('contain', 'Your email or password is incorrect!')
    }
}

export default new Login()