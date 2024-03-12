describe('Test zmiany statusu rezerwacji pojazdu przez pracownika', () => {
  it('Powinien pomyślnie zmienić status rezerwacji', () => {
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



   // Kliknięcie w przycisk 'Przejdź do dashboardu' przenoszącego do dashboardu
   cy.contains("a", "Przejdź do dashboardu").click();

   // Kliknięcie w przycisk 'Zarządzanie rezerwacjami' przenoszącego do listy złożonych rezerwacji
   cy.contains("a.nav__link__dashboard", "Zarządzanie rezerwacjami").click();

   // Kliknięcie w przycisk 'Edytuj rezerwację' przenoszącego do edycji rezerwacji
   cy.contains("a.btn.btn-primary", "Edytuj rezerwację").click();



     // Znalezienie etykiety "Wybierz status rezerwacji" i zaznaczenie innego niż aktualnie zaznaczony checkbox - czyli aktualny status rezerwacji
     cy.contains('label', 'Wybierz status rezerwacji:')
     .next() // Przejście do checkboxów według etykiety
     .find('input[type="checkbox"]') // Znalezenie checkboxów
     .not('[checked]') // Wybór checkboxa, który aktualnie nie jest zaznaczony - zmiana statusu rezerwacji na inny
     .check(); // Zaznaczenie wybranego checkboxa jako nowy status rezerwacji

     // Kliknięcie w przycisk zapisu zmienionego statusu rezerwacji
     cy.get('svg[data-icon="floppy-disk"]').click();
  });
});
