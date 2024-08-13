const MENUS = {
    PRODUTOS: 'Products',
    LOGIN_CADASTRO: 'Signup',
    CONTATO: 'Contact us',
    LOGOUT: 'Logout',
    EXCLUIR_CONTA: 'Delete Account'
}

class Menu {
    irPara(menu){
        cy.contains(menu).click()
    }
}

export default new Menu()
export { MENUS }