describe('Sécurité - Test XSS sur les commentaires', () => {
  let apiUrl
  before(() => {
    cy.apiLogin()
    apiUrl = Cypress.env('apiUrl')
  })

it('GET /orders sans authentification retourne 401 au lieu de 403', () => {
  cy.request({
    method: 'GET',
    url: apiUrl + '/orders',
    failOnStatusCode: false
  }).then((response) => {
    if (response.status !== 403) {
      throw new Error(
        `Anomalie API : la réponse reçue est ${response.status} au lieu de 403`
      )
    }
  })
})
it('Ajout au panier accepté en PUT au lieu de POST (anomalie API)', () => {
  cy.request({
    method: 'PUT',
    url: apiUrl + '/orders/add',
    headers: {
      Authorization: `Bearer ${Cypress.env('token')}`
    },
    body: {
      product: 3,
      quantity: 1
    },
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 200 || response.status === 201) {
      throw new Error(
        "Anomalie API : l’ajout au panier est accepté en PUT alors qu’un POST est attendu"
      )
    }
  })
})

})
