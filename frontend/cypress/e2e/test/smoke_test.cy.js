// =======================
// SMOKE TESTS UI
// =======================
describe('Smoke test des fonctionnalités essentielles', () => {
  const baseUrl = 'http://localhost:8080/#'
  let apiUrl

  before(() => {
    cy.apiLogin()
    apiUrl = Cypress.env('apiUrl')
  })

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`)
    cy.get('#username').type('test2@test.fr')
    cy.get('#password').type('testtest')
    cy.get('[data-cy="login-submit"]').click()
    cy.url().should('eq', `${baseUrl}/`)
  })

  it('Le site est accessible', () => {
    cy.visit(baseUrl)
    cy.url().should('include', '/')
  })

  it('La page de connexion est accessible', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
  })

  it('Connexion utilisateur possible', () => {
    cy.visit(`${baseUrl}/login`)
    cy.get('#username').type('test2@test.fr')
    cy.get('#password').type('testtest')
    cy.get('[data-cy="login-submit"]').click()
    cy.url().should('eq', `${baseUrl}/`)
  })

  it('Le menu de navigation est visible après connexion', () => {
    cy.get('[data-cy="nav-link-products"]').should('exist')
    cy.get('[data-cy="nav-link-cart"]').should('exist')
    cy.get('[data-cy="nav-link-logout"]').should('exist')
  })

  it('La liste des produits est accessible', () => {
    cy.visit(`${baseUrl}/products`)
    cy.get('[data-cy="product"]').should('exist')
  })

  it('Une page produit est accessible', () => {
    cy.visit(`${baseUrl}/products/3`)
    cy.get('[data-cy="detail-product-name"]').should('exist')
  })

  it('Les informations essentielles du produit sont présentes', () => {
    cy.visit(`${baseUrl}/products/3`)
    cy.get('[data-cy="detail-product-name"]').should('exist')
    cy.get('[data-cy="detail-product-price"]').should('exist')
    cy.get('[data-cy="detail-product-stock"]').should('exist')
  })

  it('Le bouton de déconnexion est fonctionnel', () => {
    cy.get('[data-cy="nav-link-logout"]').click()
    cy.visit(`${baseUrl}/login`)
    cy.get('[data-cy="login-submit"]').should('exist')
  })

  it('Accès direct à une URL inexistante géré correctement', () => {
    cy.visit(`${baseUrl}/page-inexistante`)
    cy.get('body').should('exist')
  })

  it('Injection XSS non exécutée dans le champ commentaire', () => {
    const xssPayload = '<script>alert("xss")</script>'

    cy.visit(`${baseUrl}/reviews`)
    cy.url().should('include', '/reviews')

    cy.get('[data-cy="review-input-rating-images"] img')
      .eq(3)
      .click()

    cy.get('[data-cy="review-input-title"]')
      .type('XSS security test')

    cy.get('[data-cy="review-input-comment"]')
      .type(xssPayload)

    cy.on('window:alert', () => {
      throw new Error('Faille XSS détectée')
    })

    cy.get('[data-cy="review-submit"]').click()
    cy.get('body').should('not.contain.html', '<script>')
  })
})


// =======================
// TESTS ANOMALIES API
// =======================
describe('Anomalies relevées dans la campagne de test initiale', () => {
  let apiUrl

  before(() => {
    apiUrl = Cypress.env('apiUrl')
    cy.apiLogin()
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

  it('Ajout au panier accepté en PUT au lieu de POST', () => {
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
