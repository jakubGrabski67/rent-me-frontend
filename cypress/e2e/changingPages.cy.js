describe('Test nawigacji między stronami', () => {
  it('Powinien poprawnie nawigować między podstronami', () => {
    const pages = ['/', '/shop', '/voucher', '/faq', '/kontakt']; // Tablica ze ścieżkami podstron

    // Test nawigacji między podstronami z opóźnieniem
    pages.forEach((page, index) => {
      cy.visit(`localhost:3000${page}`);
      cy.url().should('include', page);

      // Dodanie opóźnienia 2 sekundy poza ostatnią iteracją
      if (index !== pages.length - 1) {
        cy.wait(2000); // Opóźnienie 2 sekundy między nawigacją
      }
    });
  });
});


//yarn cypress open
//npx cypress run --spec "cypress/e2e/**/*.cy.js" - odpalenie wszystkich testów
