/// <reference types="cypress"/>
import cadastro from '../pages/cadastro'
import login from '../pages/login'
import menu, { MENUS } from '../pages/menu'
import contato from '../pages/contato'
import produtos from '../pages/produtos'
import home from '../pages/home'
import carrinho from '../pages/carrinho'
import checkout from '../pages/checkout'
import pagamento from '../pages/pagamento'

describe('Automation Exercise', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('Test Case 1: Register a new user', () => {
    menu.irPara(MENUS.LOGIN_CADASTRO)
    cadastro.preencherFormulario()
    cadastro.verificarSeCadastroFoiConcluido()
  })

  it('Test Case 2: Login User with correct email and password', () => {
    menu.irPara(MENUS.LOGIN_CADASTRO)
    login.preencherLogin('tester-1721346302730@mail.com', '12345')
    login.verificarSeLoginObteveSucesso('Tester QA')
  })

  it('Test Case 3: Login User with incorrect email and password', () => {
    menu.irPara(MENUS.LOGIN_CADASTRO)
    login.preencherLogin('tester-1721346302730@mail.com', '54321' )
    login.verificaMensagemDeErroLoginInvalido()
  })

  it('Test Case 4: Logout after login', () => {
    menu.irPara(MENUS.LOGIN_CADASTRO)
    login.preencherLogin('tester-1721346302730@mail.com', '12345')
    login.verificarSeLoginObteveSucesso('Tester QA')
    menu.irPara(MENUS.LOGOUT)
    login.verificaSeLogoutObteveSucesso()
  })

  it('Test Case 5: Register User with existing email', () => {
    menu.irPara(MENUS.LOGIN_CADASTRO)
    cadastro.iniciarCadastro('Tester QA', 'tester-1721346302730@mail.com')
    cadastro.validaMensagemDeUsuarioExistente()
  })

    it('Test Case 6: Contact Us Form', () => {
      menu.irPara(MENUS.CONTATO)
      contato.preencherFormularioDeContato()
      contato.verficaSeEnvioFormularioContatoObteveSucesso()
    })

    it('Test Case 8: Verify All Products and product detail page', () => {
      menu.irPara(MENUS.PRODUTOS)
      produtos.verificaSeAcessouPaginaDeProdutos()
      produtos.selecionaPrimeiroProdutoDaLista()
      produtos.verificaSeProdutoFoiExibido()
    })

    it('Test Case 9: Search Product', () => {
      menu.irPara(MENUS.PRODUTOS)
      produtos.verificaSeAcessouPaginaDeProdutos()
      produtos.pesquisaProdutoDesejado('Shirt')
      produtos.verificaSeProdutoDesejadoFoiEncontrado()
    })

    it('Test Case 10: Verify Subscription in home page', () => {
      home.navegarParaSubscription()
      home.preencherSubscription()
      home.verificaSeSubscriptionFoiConcluido()
    })

    it('Test Case 15: Place Order: Register before Checkout', () => {
      menu.irPara(MENUS.LOGIN_CADASTRO)
      cadastro.preencherFormulario()
      cadastro.verificarSeCadastroFoiConcluido()
      home.adicionarItemNoCarrinho()
      home.visualizarCarrinho()
      carrinho.irParaCheckout()
      checkout.verificaSeAcessouPaginaDeCheckout()
      checkout.verificaDetalhesEndereco()
      checkout.insereComentarioSobrePedido()
      pagamento.preencheFormularioPagamento()
      pagamento.verificaSePagamentoFoiConcluidoEPedidoCriado()
      menu.irPara(MENUS.EXCLUIR_CONTA)
      home.verificaSeContaFoiExcluida()
    })
})