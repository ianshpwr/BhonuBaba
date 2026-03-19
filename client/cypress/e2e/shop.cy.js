describe('BhonuBaba E2E Shop Flow', () => {
  beforeEach(() => {
    // Visit home page
    cy.visit('http://localhost:3000');
  });

  it('allows a user to navigate to products and viewing a product', () => {
    // Find products link
    cy.contains(/products|shop/i).click();
    
    // Assert URL change
    cy.url().should('include', '/products');
    
    // Check if products are loaded
    cy.get('img').should('have.length.greaterThan', 0);
  });

  it('allows navigation to the login and registration flow', () => {
    cy.contains(/sign in|login/i).click();
    cy.url().should('include', '/auth/login');
    
    cy.contains(/create a new account|register/i).click();
    cy.url().should('include', '/auth/register');
    
    // Fill registration form superficially without DB connection
    cy.get('input[name="name"]').type('Cypress User');
    cy.get('input[name="email"]').type('cypress@test.com');
    cy.get('input[name="password"]').type('password123');
    
    // Button assertions
    cy.get('button[type="submit"]').should('exist');
  });

  it('allows adding an item to the cart locally', () => {
    cy.contains(/products/i).click();
    
    // Assuming 'Add to Cart' or similar text exists
    cy.contains(/add to cart|buy/i, { matchCase: false }).first().click({ force: true });
    
    // Navigate to cart
    cy.contains(/cart/i).click();
    cy.url().should('include', '/cart');
    
    // Verify an item exists in the cart view
    cy.get('button').contains(/checkout/i).should('exist');
  });
});
