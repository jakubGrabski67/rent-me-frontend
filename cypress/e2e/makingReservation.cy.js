describe("Test składania rezerwacji przez klienta", () => {
  it("Powinien poprawnie złożyć rezerwację", () => {
    cy.viewport(1240, 860);
    // Przechodzenie na stronę startową
    cy.visit("localhost:3000");

    // Kliknięcie na link przenoszący podstrony z ofertą floty
    cy.contains("Nasza flota").click();

    // Potwierdzenie, czy przeniesiono na odpowiednią podstronę
    cy.url().should("include", "/shop");

    // Sprawdzanie czy na podstronie z ofertą floty znajdują się pojazdy do wypożyczenia
    cy.get(".custom-card-container-flota").should("be.visible");

    // Sprawdzanie funkcjonalności rozwijania opisu pojazdu
    cy.get("button.btn.btn-link.toggle-button.bounce").eq(0).click();

    // Sprawdzanie funkcjonalności zwijania opisu pojazdu
    cy.get("button.btn.btn-link.toggle-button.bounce").eq(0).click();

    // Kliknięcie na odnośnik 'Pokaż ofertę' przenoszącego do szczegółowego opisu pojazdu
    cy.get("a.btn.btn-primary").eq(0).click();

    // Kliknięcie w przycisk 'Zarezerwuj teraz' aby przenieść do formularza rezerwacji
    cy.contains("button.btn.btn-primary", "Zarezerwuj teraz").click();

    // Kliknięcie w pole tekstowe, aby wywołać wybór daty i godziny początku okresu wypożyczenia
    cy.get("#startDate").click();

    // Wybór daty - dzień
    cy.contains(".react-datepicker__day", "10").click();

    // Wybór daty - godzina
    cy.get(".react-datepicker__time-list-item").contains("09:30").click();

   // Kliknięcie w pole tekstowe, aby wywołać wybór daty i godziny zakończenia okresu wypożyczenia
    cy.get("#endDatePicker").click();

    // Wybór daty - dzień
    cy.contains(".react-datepicker__day", "12").click();

    // Wybór daty - godzina
    cy.get(".react-datepicker__time-list-item").contains("16:15").click();

    // Kliknięcie w przycisk 'Przejdź dalej' przenoszącego do kolejnego etapu rezerwacji
    cy.contains("button.btn.btn-primary", "Przejdź dalej").click();

    // Wybór pakietu ochronnego
    cy.contains("h3.h3__details", "PLATINIUM").click();

    // Kliknięcie w przycisk 'Przejdź dalej' przenoszącego do kolejnego etapu rezerwacji
    cy.contains("button.btn.btn-primary", "Przejdź dalej").click();

    // Wybór dodatkowych opcji #1
    cy.contains("div.option-content", "Fotelik: podkładka").click();

    // Wybór dodatkowych opcji #2
    cy.contains("div.option-content", "Końcowe mycie pojazdu").click();

    // Kliknięcie w przycisk 'Przejdź dalej' przenoszącego do kolejnego etapu rezerwacji - formularza danych osobowych
    cy.contains("button.btn.btn-primary", "Przejdź dalej").click();



    // Wprowadzenie imienia
    cy.get("#firstName")
      .type("Jan");

    // Wprowadzenie nazwiska
    cy.get("#lastName")
      .type("Kowalski");

    // Wprowadzenie kraju
    cy.get("#country")
      .type("Polska");

    // Wprowadzenie nazwy ulicy
    cy.get("#street")
      .type("Wesoła");

    // Wprowadzenie numeru domu
    cy.get("#houseNumber")
      .type("4/3");

    // Wprowadzenie nazwy miasta
    cy.get("#city")
      .type("Katowice");

    // Wprowadzenie numeru kodu pocztowego
    cy.get("#postalCode")
      .type("11-222");

    // Wprowadzenie numeru prawa jazdy
    cy.get("#driverLicenseNumber")
      .type("ABC2220481");

    // Wprowadzenie adresu email
    cy.get("#email")
      .type("kowalski.jan@gmail.com");

    // Wprowadzenie numeru telefonu
    cy.get("#phoneNumber")
      .type("132 390 954");



    // Kliknięcie w przycisk 'Przejdź dalej' przenoszącego do kolejnego etapu rezerwacji
    cy.contains("button.btn.btn-primary", "Przejdź dalej").click();

       // Kliknięcie w przycisk 'Przejdź do płatności' przenoszącego do ostatniego etapu rezerwacji - płatności
    cy.contains("button.btn.btn-primary", "Przejdź do płatności").click();
  });
});
