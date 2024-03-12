import React, { useState } from "react";
import { Form, Tab, Nav } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DashboardNavbar from "../DashboardNavbar/DashboardNavbar";
import DashboardNavbarLeft from "../DashboardNavbarLeft/DashboardNavbarLeft";
import DashboardHistoryCalendar from "./DashboardHistoryCalendar";// Import nowej zakładki

const DashboardServiceHistory = () => {
  const [tiresData, setTiresData] = useState({
    vehicleId: "1",
    summerTiresSize: "",
    winterTiresSize: "",
    summerTiresBrand: "",
    winterTiresBrand: "",
    wheelType: "",
  });

  const [inspectionsInsuranceData, setInspectionsInsuranceData] = useState({
    lastInspectionDate: "",
    nextInspectionDate: "",
    insuranceExpirationDate: "",
  });

  const [additionalInfoData, setAdditionalInfoData] = useState({
    carUsageInfo: "",
    additionalComments: "",
  });

  const [activeTab, setActiveTab] = useState("serviceTab");

  const handleSaveTiresData = () => {
    // Obsługa zapisu danych o oponach
  };

  const [oilFiltersData, setOilFiltersData] = useState({
    // ... pozostałe pola dla danych o oleju i filtrach
  });

  const handleSaveOilFiltersData = () => {
    // Obsługa zapisu danych o oleju i filtrach
  };

  const handleSaveInspectionsInsuranceData = () => {
    // Obsługa zapisu danych o przeglądach i ubezpieczeniu
  };

  const handleSaveAdditionalInfoData = () => {
    // Obsługa zapisu dodatkowych informacji
  };

  const [damageData, setDamageData] = useState({
    // ... pozostałe pola dla danych o szkodach
  });

  const handleSaveDamagesData = () => {
    // Obsługa zapisu danych o szkodach
  };

  const [repairData, setRepairData] = useState({
    // ... pozostałe pola dla danych o naprawach
  });

  const handleSaveRepairsData = () => {
    // Obsługa zapisu danych o naprawach
  };

  return (
    <>
      <DashboardNavbarLeft />
      <DashboardNavbar />
      <Tab.Container
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
      >
        <Nav variant="tabs" style={{ marginLeft: "260px", paddingTop: "15px" }}>
          <Nav.Item>
            <Nav.Link eventKey="serviceTab">Dane serwisowe</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="inspectionsInsuranceTab">
              Przeglądy i ubezpieczenie
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="additionalInfoTab">
              Informacje dodatkowe
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="damagesTab">Szkody</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="repairsTab">Naprawy</Nav.Link>
          </Nav.Item>
          {/* Dodaj nową zakładkę "Kalendarz" */}
          <Nav.Item>
            <Nav.Link eventKey="dashboardHistoryCalendar">Kalendarz</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
        <Tab.Pane eventKey="dashboardHistoryCalendar">
    {/* Wyświetl zawartość kalendarza */}
    <DashboardHistoryCalendar />
  </Tab.Pane>
          <Tab.Pane
            eventKey="serviceTab"
            style={{ marginLeft: "260px", paddingTop: "15px" }}
          >
            {/* Formularz dla danych opon */}
            <Form
              style={{
                display: "inline-block",
                marginRight: "20px",
                padding: "15px",
                backgroundColor: "#f0f0f0", // Dodane tło
                borderRadius: "8px", // Zaokrąglenie rogów
                width: "55vh",
                height: "66vh",
              }}
            >
              <Form.Group controlId="formCurrentlyInstalledTires">
                <Form.Label>Wybrany pojazd:</Form.Label>
                <Form.Control
                  style={{ margin: "0px" }}
                  as="select"
                  value={tiresData.currentlyInstalledTires}
                  onChange={(e) =>
                    setTiresData({
                      ...tiresData,
                      currentlyInstalledTires: e.target.value,
                    })
                  }
                >
                  <option value="summer">BMW X5</option>
                  <option value="winter">Mercedes W203</option>
                  <option value="allSeason">AUDI S4</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formCurrentlyInstalledTires">
                <Form.Label>Aktualnie założone opony</Form.Label>
                <Form.Control
                  style={{ margin: "0px" }}
                  as="select"
                  value={tiresData.currentlyInstalledTires}
                  onChange={(e) =>
                    setTiresData({
                      ...tiresData,
                      currentlyInstalledTires: e.target.value,
                    })
                  }
                >
                  <option value="summer">Letnie</option>
                  <option value="winter">Zimowe</option>
                  <option value="allSeason">Całoroczne</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formSummerTireSize">
                <Form.Label>Rozmiar opon letnich</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wprowadź rozmiar opon letnich"
                  value={tiresData.summerTireSize}
                  onChange={(e) =>
                    setTiresData({
                      ...tiresData,
                      summerTireSize: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formWinterTireSize">
                <Form.Label>Rozmiar opon zimowych</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wprowadź rozmiar opon zimowych"
                  value={tiresData.winterTireSize}
                  onChange={(e) =>
                    setTiresData({
                      ...tiresData,
                      winterTireSize: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formSummerTireBrand">
                <Form.Label>Marka opon letnich</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wprowadź markę opon letnich"
                  value={tiresData.summerTireBrand}
                  onChange={(e) =>
                    setTiresData({
                      ...tiresData,
                      summerTireBrand: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formWinterTireBrand">
                <Form.Label>Marka opon zimowych</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wprowadź markę opon zimowych"
                  value={tiresData.winterTireBrand}
                  onChange={(e) =>
                    setTiresData({
                      ...tiresData,
                      winterTireBrand: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formWheelType">
                <Form.Label>Rodzaj felg</Form.Label>
                <Form.Control
                  style={{ margin: "0px" }}
                  as="select"
                  value={tiresData.wheelType}
                  onChange={(e) =>
                    setTiresData({ ...tiresData, wheelType: e.target.value })
                  }
                >
                  <option value="alloy">Aluminiowe</option>
                  <option value="steel">Stalowe</option>
                </Form.Control>
              </Form.Group>

              <button
                className="btn btn-primary mt-3"
                onClick={handleSaveTiresData}
              >
                Zapisz dane
              </button>
            </Form>
            {/* Formularz dla danych oleju i filtrów */}
            <Form
              style={{
                display: "inline-block",
                padding: "15px",
                backgroundColor: "#f9f9f9", // Dodane tło
                borderRadius: "8px", // Zaokrąglenie rogów
                position: "relative",
                bottom: "157px",
                height: "66vh",
                width: "55vh",
              }}
            >
              <Form.Group controlId="formCurrentlyInstalledTires">
                <Form.Label>Wybrany pojazd:</Form.Label>
                <Form.Control
                  style={{ margin: "0px" }}
                  as="select"
                  value={tiresData.currentlyInstalledTires}
                  onChange={(e) =>
                    setTiresData({
                      ...tiresData,
                      currentlyInstalledTires: e.target.value,
                    })
                  }
                >
                <option value="summer">BMW X5</option>
                  <option value="winter">Mercedes W203</option>
                  <option value="allSeason">AUDI S4</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formOilChangeDate">
                <Form.Label>Data ostatniej wymiany oleju</Form.Label>
                <DatePicker
                  selected={oilFiltersData.lastOilChangeDate}
                  onChange={(date) =>
                    setOilFiltersData({
                      ...oilFiltersData,
                      lastOilChangeDate: date,
                    })
                  }
                  dateFormat="Pp"
                  locale="pl"
                  placeholderText="Wybierz datę"
                />
              </Form.Group>

              <Form.Group controlId="formMileageAtLastOilChange">
                <Form.Label>Przebieg przy ostatniej wymianie oleju</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wprowadź przebieg"
                  value={oilFiltersData.mileageAtLastOilChange}
                  onChange={(e) =>
                    setOilFiltersData({
                      ...oilFiltersData,
                      mileageAtLastOilChange: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formNextOilChangeMileage">
                <Form.Label>Następna wymiana oleju (km)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wprowadź przewidywany przebieg"
                  value={oilFiltersData.nextOilChangeMileage}
                  onChange={(e) =>
                    setOilFiltersData({
                      ...oilFiltersData,
                      nextOilChangeMileage: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formNextOilChangeDate">
                <Form.Label>Następna wymiana oleju (data)</Form.Label>
                <DatePicker
                  selected={oilFiltersData.nextOilChangeDate}
                  onChange={(date) =>
                    setOilFiltersData({
                      ...oilFiltersData,
                      nextOilChangeDate: date,
                    })
                  }
                  dateFormat="Pp"
                  locale="pl"
                  placeholderText="Wybierz datę"
                />
              </Form.Group>

              <button
                className="btn btn-primary mt-3"
                onClick={handleSaveOilFiltersData}
                style={{
                  top: "158px",
                  position: "relative",
                }}
              >
                Zapisz dane
              </button>
            </Form>
          </Tab.Pane>
          <Tab.Pane
            eventKey="inspectionsInsuranceTab"
            style={{ marginLeft: "260px", paddingTop: "15px" }}
          >
            <Form
              style={{
                display: "inline-block",
                padding: "15px",
                backgroundColor: "#f9f9f9", // Dodane tło
                borderRadius: "8px", // Zaokrąglenie rogów
                height: "66vh",
                width: "55vh",
              }}
            >
              <Form.Group controlId="formCurrentlyInstalledTires">
                <Form.Label>Wybrany pojazd:</Form.Label>
                <Form.Control
                  style={{ margin: "0px" }}
                  as="select"
                  value={tiresData.currentlyInstalledTires}
                  onChange={(e) =>
                    setTiresData({
                      ...tiresData,
                      currentlyInstalledTires: e.target.value,
                    })
                  }
                >
                   <option value="summer">BMW X5</option>
                  <option value="winter">Mercedes W203</option>
                  <option value="allSeason">AUDI S4</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formInspectionDate">
                <Form.Label>Data ostatniego przeglądu</Form.Label>
                <DatePicker
                  selected={inspectionsInsuranceData.lastInspectionDate}
                  onChange={(date) =>
                    setInspectionsInsuranceData({
                      ...inspectionsInsuranceData,
                      lastInspectionDate: date,
                    })
                  }
                  dateFormat="Pp"
                  locale="pl"
                  placeholderText="Wybierz datę"
                />
              </Form.Group>

              <Form.Group controlId="formInsuranceExpirationDate">
                <Form.Label>Data ważności ubezpieczenia</Form.Label>
                <DatePicker
                  selected={inspectionsInsuranceData.insuranceExpirationDate}
                  onChange={(date) =>
                    setInspectionsInsuranceData({
                      ...inspectionsInsuranceData,
                      insuranceExpirationDate: date,
                    })
                  }
                  dateFormat="Pp"
                  locale="pl"
                  placeholderText="Wybierz datę"
                />
              </Form.Group>

              <Form.Group controlId="formInsuranceCompany">
                <Form.Label>Ubezpieczyciel</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wprowadź nazwę ubezpieczyciela"
                  value={inspectionsInsuranceData.insuranceCompany}
                  onChange={(e) =>
                    setInspectionsInsuranceData({
                      ...inspectionsInsuranceData,
                      insuranceCompany: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <button
                className="btn btn-primary mt-3"
                onClick={handleSaveInspectionsInsuranceData}
              >
                Zapisz dane
              </button>
            </Form>
          </Tab.Pane>
          <Tab.Pane
            eventKey="additionalInfoTab"
            style={{ marginLeft: "260px", paddingTop: "15px" }}
          >
            <Form
              style={{
                display: "inline-block",
                padding: "15px",
                backgroundColor: "#f9f9f9", // Dodane tło
                borderRadius: "8px", // Zaokrąglenie rogów
                height: "66vh",
                width: "55vh",
              }}
            >
              <Form.Group controlId="formCurrentlyInstalledTires">
                <Form.Label>Wybrany pojazd:</Form.Label>
                <Form.Control
                  style={{ margin: "0px" }}
                  as="select"
                  value={tiresData.currentlyInstalledTires}
                  onChange={(e) =>
                    setTiresData({
                      ...tiresData,
                      currentlyInstalledTires: e.target.value,
                    })
                  }
                >
                   <option value="summer">BMW X5</option>
                  <option value="winter">Mercedes W203</option>
                  <option value="allSeason">AUDI S4</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formAdditionalInfo1">
                <Form.Label>Numer rejestracyjny pojazdu</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wprowadź numer rejestracyjny pojazdu"
                  value={additionalInfoData.additionalInfo1}
                  onChange={(e) =>
                    setAdditionalInfoData({
                      ...additionalInfoData,
                      additionalInfo1: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formAdditionalInfo1">
                <Form.Label>Dodatkowa informacja 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wprowadź dodatkową informację"
                  value={additionalInfoData.additionalInfo1}
                  onChange={(e) =>
                    setAdditionalInfoData({
                      ...additionalInfoData,
                      additionalInfo1: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formAdditionalInfo2">
                <Form.Label>Dodatkowa informacja 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wprowadź dodatkową informację"
                  value={additionalInfoData.additionalInfo2}
                  onChange={(e) =>
                    setAdditionalInfoData({
                      ...additionalInfoData,
                      additionalInfo2: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <button
                className="btn btn-primary mt-3"
                onClick={handleSaveAdditionalInfoData}
              >
                Zapisz dane
              </button>
            </Form>
          </Tab.Pane>
          <Tab.Pane
            eventKey="damagesTab"
            style={{ marginLeft: "260px", paddingTop: "15px" }}
          >
            <Form
              style={{
                display: "inline-block",
                padding: "15px",
                backgroundColor: "#f9f9f9", // Dodane tło
                borderRadius: "8px", // Zaokrąglenie rogów
                height: "66vh",
                width: "55vh",
              }}
            >
              <Form.Group controlId="formCurrentlyInstalledTires">
                <Form.Label>Wybrany pojazd:</Form.Label>
                <Form.Control
                  style={{ margin: "0px" }}
                  as="select"
                  value={tiresData.currentlyInstalledTires}
                  onChange={(e) =>
                    setTiresData({
                      ...tiresData,
                      currentlyInstalledTires: e.target.value,
                    })
                  }
                >
                <option value="summer">BMW X5</option>
                  <option value="winter">Mercedes W203</option>
                  <option value="allSeason">AUDI S4</option>
                </Form.Control>
              </Form.Group>
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              >
                <Form.Group controlId="formDamages1">
                  <Form.Label>Opis szkody 1</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Wprowadź opis szkody"
                    value={damageData.damage1}
                    onChange={(e) =>
                      setDamageData({ ...damageData, damage1: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="formDamages1">
                  <Form.Label>Zdjęcie szkody 1</Form.Label>
                  <input type="file" placeholder="Wybierz plik..." />
                </Form.Group>
              </div>

              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              >
                <Form.Group controlId="formDamages2">
                  <Form.Label>Opis szkody 2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Wprowadź opis szkody"
                    value={damageData.damage2}
                    onChange={(e) =>
                      setDamageData({ ...damageData, damage1: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="formDamages2">
                  <Form.Label>Zdjęcie szkody 2</Form.Label>
                  <input type="file" placeholder="Wybierz plik..." />
                </Form.Group>
              </div>

              <button
                className="btn btn-primary mt-3"
                onClick={handleSaveDamagesData}
              >
                Zapisz dane
              </button>
            </Form>
          </Tab.Pane>
          <Tab.Pane
            eventKey="repairsTab"
            style={{ marginLeft: "260px", paddingTop: "15px" }}
          >
            <Form
              style={{
                display: "inline-block",
                padding: "15px",
                backgroundColor: "#f9f9f9", // Dodane tło
                borderRadius: "8px", // Zaokrąglenie rogów
                height: "66vh",
                width: "55vh",
              }}
            >
              <Form.Group controlId="formCurrentlyInstalledTires">
                <Form.Label>Wybrany pojazd:</Form.Label>
                <Form.Control
                  style={{ margin: "0px" }}
                  as="select"
                  value={tiresData.currentlyInstalledTires}
                  onChange={(e) =>
                    setTiresData({
                      ...tiresData,
                      currentlyInstalledTires: e.target.value,
                    })
                  }
                >
                  <option value="summer">BMW X5</option>
                  <option value="winter">Mercedes W203</option>
                  <option value="allSeason">AUDI S4</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formRepairs1">
                <Form.Label>Opis naprawy 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wprowadź opis naprawy"
                  value={repairData.repair1}
                  onChange={(e) =>
                    setRepairData({ ...repairData, repair1: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formRepairs2">
                <Form.Label>Opis naprawy 2</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Wprowadź opis naprawy"
                  value={repairData.repair2}
                  onChange={(e) =>
                    setRepairData({ ...repairData, repair2: e.target.value })
                  }
                />
              </Form.Group>
              <button
                className="btn btn-primary mt-3"
                onClick={handleSaveRepairsData}
              >
                Zapisz dane
              </button>
            </Form>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

export default DashboardServiceHistory;
