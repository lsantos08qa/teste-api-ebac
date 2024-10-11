Cypress.Commands.add('token', (email, senha) => { 
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha
        }
      }).then( response => {
        return response.body.authorization
      })
})

 Cypress.Commands.add('cadastrarProduto' , (token, produto, preco, descricao, quantidade) =>{
    cy.request({
        method: 'POST', 
        url: 'produtos',
        headers: {authorization: token}, 
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
          }, 
          failOnStatusCode: false
    })
 })

 Cypress.Commands.add('cadastrarUsuário', (faker, aluno)=>{
  cy.request({
        method: 'POST',
        url: 'usuarios',
        body: {
          "nome": aluno,
          "email": (faker.internet.email()),
          "password": (faker.internet.password()),
          "administrador": "true"
        }
      })
 })
