 
 let apiUrl
  before(() => {
    cy.apiLogin()
    apiUrl = Cypress.env('apiUrl')
  })

Cypress.Commands.add('apiLogin', () => {
  cy.fixture('user').then((user) => {
    cy.request({
      method: 'POST',
      url: apiUrl+"/login",
      body: {
        username: user.validUser.username,
        password: user.validUser.password
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      Cypress.env('token', response.body.token)
    })
  })
})
