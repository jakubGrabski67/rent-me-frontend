describe('Test logowania pracownika do panelu dla pracowników', () => {
  it('Powinien pomyślnie zalogować pracownika', () => {
    // Dane testowe do logowania
    const loginData = {
      username: 'admin',
      password: 'admin',
    };

    // Wejście na stronę logowania
    cy.visit('localhost:3000/login');

    // Wypełnienie formularza logowania
    cy.get('#username').type(loginData.username);
    cy.get('#password').type(loginData.password);
    cy.get('form').submit();

    // Potwierdzenie poprawnego zalogowania
    cy.url().should('include', '/dash'); // Sprawdzenie czy URL panelu pracownika się pojawił
    cy.contains('RENT ME! - PANEL PRACOWNIKA').should('be.visible'); // Potwierdzenie, że widoczny jest nagłówek panelu pracownika
  });
});
