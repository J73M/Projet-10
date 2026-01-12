describe('Connexion utilisateur - fonctionnalités critiques', () => {
  const baseUrl = 'http://localhost:8080/#'

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`)
  })

  it('Connexion réussie avec des identifiants valides', () => {
    cy.get('#username').type('test2@test.fr')
    cy.get('#password').type('testtest')
    cy.get('[data-cy="login-submit"]').click()

    cy.url().should('eq', `${baseUrl}/`)
    cy.get('[data-cy="nav-link-logout"]').should('be.visible')
  })

  it('Connexion échouée avec des identifiants invalides', () => {
    cy.get('#username').type('faux@openclassrooms.fr')
    cy.get('#password').type('abcdefgh')
    cy.get('[data-cy="login-submit"]').click()

    cy.get('[data-cy="login-errors"]')
      .should('be.visible')
      .and('contain', 'Identifiants incorrects')

    cy.url().should('include', '/login')
  })
})
