import { faker } from '@faker-js/faker'
describe('Tests API Eco Bliss Bath', () => {
  let apiUrl
  before(() => {
    cy.apiLogin()
    apiUrl = Cypress.env('apiUrl')
  })

  it('POST /login - utilisateur valide', () => {
    cy.fixture('user').then((user) => {
      cy.request({
        method: 'POST',
        url : apiUrl+"/login",
        body: {
          username: user.validUser.username,
          password: user.validUser.password
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('token')
      })
    })
  })

  it('POST /login - utilisateur invalide', () => {
    cy.fixture('user').then((user) => {
      cy.request({
        method: 'POST',
        url: apiUrl+"/login",
        failOnStatusCode: false,
        body: {
          username: user.invalidUser.username,
          password: user.invalidUser.password
        }
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })
  })

  it('GET /orders sans authentification', () => {
    cy.request({
      method: 'GET',
      url: apiUrl+"/orders",
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401)
    })
  })

  it('GET /orders avec authentification', () => {
    cy.request({
      method: 'GET',
      url: apiUrl+"/orders",
      headers: {
        Authorization: `Bearer ${Cypress.env('token')}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('address')
    })
  })

  it('GET /products/{id}', () => {
    cy.request(apiUrl+"/products/9",)
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('price')
      })
  })

  it('PUT /orders/add - ajout produit disponible', () => {
      cy.request(apiUrl+"/products",)
        .then((res) => {
          const product = res.body[0]
          cy.request({
            method: 'PUT',
            url: apiUrl+"/orders/add",
            headers: {
              Authorization: `Bearer ${Cypress.env('token')}`
            },
            body: {
              product: product.id,
              quantity: 1
            }
          }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('address')
          })
        })
    })

  it('POST /reviews - ajout commentaire', () => {
    cy.request(apiUrl+"/products",).then((res) => {
      const product = res.body[0]
      cy.request({
        method: 'POST',
        url: apiUrl+"/reviews",
        headers: {
          Authorization: `Bearer ${Cypress.env('token')}`
        },
        body: {
          title: product.name,
          rating: 5,
          comment: 'Très bon produit'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('rating')
      })
    })
  })

  it('POST /register - création nouvel utilisateur', () => {
    const user = {
      email: faker.internet.email({ provider: 'test.fr' }),
      plainPassword: {
        first: 'testtest',
        second: 'testtest'
      },
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName()
    }

    cy.request({
      method: 'POST',
      url: apiUrl+"/register",
      body: user
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
    })
  })
})

