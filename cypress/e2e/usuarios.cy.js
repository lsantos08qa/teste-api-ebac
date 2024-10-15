/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import contrato from '../contracts/usuario.contract'

describe('Testes da Funcionalidade Usuários', () => {

  let token
  beforeEach(() => {
    cy.token('lucas@teste.com.br', 'teste123').then(tkn => {
      token = tkn
    })
  });

  it('Deve validar contrato de usuários com sucesso', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados - GET', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso - POST', () => {
    cy.cadastrarUsuário(faker)
      .should((response) => {
        expect(response.body.message).equal('Cadastro realizado com sucesso')
        expect(response.status).equal(201)
      });
  })

  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      failOnStatusCode: false,
      body: {
        "nome": "Rafael Melo",
        "email": "rafa@qa.combz",
        "password": "teste000",
        "administrador": "true"
      }
    }).should((response) => {
      expect(response.status).to.equal(400)
      expect(response.body.email).to.equal('email deve ser um email válido')
    })
  });

  it('Deve editar um usuário previamente cadastrado - PUT', () => {
    cy.cadastrarUsuário(faker)
      .then(response => {
        let id = response.body._id
        let usuario = 'Aluno Editado ' + Math.floor(Math.random() * 10000000000)
        cy.request({
          method: 'PUT',
          url: `usuarios/${id}`,
          headers: { authorization: token },
          body: {
            "nome": usuario,
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": "true"
          }
        }).should((response) => {
          expect(response.body.message).equal('Registro alterado com sucesso')
          expect(response.status).equal(200)
        })
      })
  });

  it('Deve deletar um usuário previamente cadastrado - DELETE', () => {
    cy.cadastrarUsuário(faker)
      .then(response => {
        let id = response.body._id
        cy.request({
          method: 'DELETE',
          url: `usuarios/${id}`,
          headers: { authorization: token }
        }).should((response) => {
          expect(response.body.message).equal('Registro excluído com sucesso')
          expect(response.status).equal(200)
        })
      })
  });
});
