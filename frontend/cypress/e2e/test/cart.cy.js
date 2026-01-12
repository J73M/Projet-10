describe('Panier - test stock avec availableStock', () => {
  const baseUrl = 'http://localhost:8080/#'
  const productIds = [3, 4, 5, 6]


  function emptyCart() {
    cy.get('body').then($body => {
      const $btn = $body.find('[data-cy="cart-line-delete"]').first()
      if ($btn.length) {
        cy.wrap($btn).click()
        cy.wait(500)
        emptyCart()
      }
    })
  }

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`)
    cy.get('#username').type('test2@test.fr')
    cy.get('#password').type('testtest')
    cy.get('[data-cy="login-submit"]').click()
    cy.url().should('eq', `${baseUrl}/`)
  })

  afterEach(() => {
    cy.visit(`${baseUrl}/cart`)
    emptyCart()
  })

  productIds.forEach((id) => {
    it(`Ajouter au panier le produit id = ${id}`, () => {
      cy.intercept('GET', `/products/${id}`).as('getProduct')
      cy.visit(`${baseUrl}/products/${id}`)
      cy.wait('@getProduct').then((interception) => {
        const stock = interception.response.body.availableStock
        cy.get('[data-cy="detail-product-quantity"]').clear().type('1')
        cy.get('[data-cy="detail-product-add"]').click()
        if (stock <= 0) {
          cy.visit(`${baseUrl}/cart`)
          cy.get('[data-cy="cart-line"]').then(($lines) => {
            if ($lines.length > 0) {
              throw new Error(
                `Produit id=${id} a été ajouté au panier alors que son stock est à ${stock}`
              )
            } else {
              cy.log(`Produit ${id} en rupture de stock, ajout impossible`)
            }
          })
        }
      })
    })
  })

it('Modifie la quantité des produits dans le panier et suppresion des produits', () => {
    cy.visit(`${baseUrl}/cart`)
    cy.url().should('include', '/cart')
    cy.get('[data-cy="cart-line-quantity"]').first()
      .focus()
      .type('{selectall}')
      .type('2')
      .blur()
    cy.get('[data-cy="cart-line-quantity"]').first().should('have.value', '2')
    emptyCart()
  })

  it('Verification que le panier est bien vide', () => {
    cy.visit(`${baseUrl}/cart`)
    cy.url().should('include', '/cart')
    cy.get('[data-cy="cart-line"]').should('not.exist')
  })

  
})
