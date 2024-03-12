import React, { useState } from "react";
import "../DashboardStyles/DashboardSettings.css";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import DashboardNavbarLeft from "../DashboardNavbarLeft/DashboardNavbarLeft";



const DashboardSettings = () => {
  const [activeTab, setActiveTab] = useState("Twoje dane");

  const {username, status,name, surname, dateOfBirth, nationality}=useState('');

  return (
    <>
      {/*Importuje DashboarNavbar i NavbarLeft do Dashboard/Renting*/}
      <DashboardNavbar />
      <DashboardNavbarLeft />

      <div className="settings">
        <div className="settings__wrapper">
          <h2 className="settings__title">Ustawienia</h2>

          <div className="settings__top">
            <button
              className={`setting__btn ${
                activeTab === "Twoje dane" ? "active__btn" : ""
              }`}
              onClick={() => setActiveTab("Twoje dane")}
            >
              Twoje dane
            </button>
            <button
              className={`setting__btn ${
                activeTab === "Hasło" ? "active__btn" : ""
              }`}
              onClick={() => setActiveTab("Hasło")}
            >
              Hasło
            </button>
            <button
              className={`setting__btn ${
                activeTab === "E-mail" ? "active__btn" : ""
              }`}
              onClick={() => setActiveTab("E-mail")}
            >
              E-mail
            </button>
            <button
              className={`setting__btn ${
                activeTab === "Powiadomienia" ? "active__btn" : ""
              }`}
              onClick={() => setActiveTab("Powiadomienia")}
            >
              Powiadomienia
            </button>
          </div>

          {activeTab === "Twoje dane" && (
            <div className="details__form">
              <p className="profile__desc">
                Tutaj możesz zaktualizować swoje dane.
              </p>
              <form>
                <div className="form__group">
                  <div>
                    <label>Nazwa użytkownika:</label>
                    <input type="text" placeholder={username} />
                  </div>

                  <div>
                    <label>Twoja rola:</label>
                    <span style={{color: "Highlight"}} contentEditable="false">{status}</span>
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label>Imię:</label>
                    <input type="text" placeholder={name} />
                  </div>

                  <div>
                    <label>Nazwisko:</label>
                    <input type="text" placeholder={surname} />
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label>Data urodzenia:</label>
                    <input type="date" placeholder={dateOfBirth} />
                  </div>

                  <div>
                    <label>Płeć:</label>
                    <select>
                      <option value="Mężczyzna">Mężczyzna</option>
                      <option value="Kobieta">Kobieta</option>
                    </select>
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label>Kraj:</label>
                    <input type="text" placeholder={nationality} />
                  </div>

                  <div>
                    <label>Adres:</label>
                    <input type="text" placeholder="Twój adres" />
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label>Numer telefonu:</label>
                    <input type="tel" placeholder="Twój numer telefonu" />
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label>Zdjęcie profilowe:</label>
                    <p className="profile-img__desc">
                      To zdjęcie będzie wyświetlone w Twoim profilu.
                    </p>
                    <input type="file" placeholder="Wybierz plik..." />
                  </div>

                  <div className="profile__img-btns">
                    <button className="update__btn">Zapisz</button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {activeTab === "Hasło" && (
            <div className="details__form">
              <p className="profile__desc">
                Tutaj możesz zaktualizować swoje hasło.
              </p>
              <form>
                <div className="form__group">
                  <div>
                    <label>Aktualne hasło:</label>
                    <input
                      type="password"
                      placeholder="Wprowadź aktualne hasło"
                    />
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label>Nowe hasło:</label>
                    <input type="password" placeholder="Wprowadź nowe hasło" />
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label>Powtórz nowe hasło:</label>
                    <input type="password" placeholder="Powtórz nowe hasło" />
                  </div>
                </div>

                <div className="form__group">
                  <button className="update__btn">Zapisz</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "E-mail" && (
            <div className="details__form">
              <h2 className="profile__title">E-mail</h2>
              <p className="profile__desc">
                Tutaj możesz zaktualizować swój adres e-mail.
              </p>
              <form>
                <div className="form__group">
                  <div>
                    <label>Aktualny adres e-mail:</label>
                    <input
                      type="email"
                      placeholder="Twój aktualny adres e-mail"
                    />
                  </div>

                  <div>
                    <label>Nowy adres e-mail:</label>
                    <input
                      type="email"
                      placeholder="Wprowadź nowy adres e-mail"
                    />
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label>Potwierdź nowy adres e-mail:</label>
                    <input
                      type="email"
                      placeholder="Potwierdź nowy adres e-mail"
                    />
                  </div>
                </div>

                <div className="profile__img-btns">
                  <button className="update__btn">Zapisz</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "Powiadomienia" && (
            <div className="details__form">
              <h2 className="profile__title">Powiadomienia</h2>
              <p className="profile__desc">
                Tutaj możesz zarządzać ustawieniami powiadomień.
              </p>
              <form>
                <div className="form__group">
                  <div>
                    <label>Powiadomienia e-mail:</label>
                    <input
                      type="checkbox"
                      id="emailNotificationsYes"
                      name="emailNotificationsYes"
                    />
                    <label htmlFor="emailNotificationsYes">Tak</label>
                    <input
                      type="checkbox"
                      id="emailNotificationsNo"
                      name="emailNotificationsNo"
                    />
                    <label htmlFor="emailNotificationsNo">Nie</label>
                  </div>

                  <div>
                    <label>Powiadomienia SMS:</label>
                    <input
                      type="checkbox"
                      id="smsNotificationsYes"
                      name="smsNotificationsYes"
                    />
                    <label htmlFor="smsNotificationsYes">Tak</label>
                    <input
                      type="checkbox"
                      id="smsNotificationsNo"
                      name="smsNotificationsNo"
                    />
                    <label htmlFor="smsNotificationsNo">Nie</label>
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label>Powiadomienia push:</label>
                    <input
                      type="checkbox"
                      id="pushNotificationsYes"
                      name="pushNotificationsYes"
                    />
                    <label htmlFor="pushNotificationsYes">Tak</label>
                    <input
                      type="checkbox"
                      id="pushNotificationsNo"
                      name="pushNotificationsNo"
                    />
                    <label htmlFor="pushNotificationsNo">Nie</label>
                  </div>

                  <div>
                    <label>Nowe wiadomości:</label>
                    <input
                      type="checkbox"
                      id="newMessagesYes"
                      name="newMessagesYes"
                    />
                    <label htmlFor="newMessagesYes">Tak</label>
                    <input
                      type="checkbox"
                      id="newMessagesNo"
                      name="newMessagesNo"
                    />
                    <label htmlFor="newMessagesNo">Nie</label>
                  </div>
                </div>

                <div className="profile__img-btns">
                  <button className="update__btn">Zapisz</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardSettings;
