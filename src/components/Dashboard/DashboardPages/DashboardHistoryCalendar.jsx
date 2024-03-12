import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/pl";
import "../DashboardStyles/DashboardHistoryCalendar.css";

moment.locale("pl");

const localizer = momentLocalizer(moment);

const DashboardHistoryCalendar = () => {
  const customMessages = {
    today: "Dzisiaj",
    previous: "Poprzedni miesiąc",
    next: "Następny miesiąc",
  };
  const [events, setEvents] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const vehicles = [
    { id: 0, name: "Wszystkie pojazdy" },
    { id: 1, name: "BMW X5" },
    { id: 2, name: "Mercedes W203" },
  ];

  const fetchEvents = async (vehicleId) => {
    // Symulacja pobierania zdarzeń dla konkretnego pojazdu
    const eventsForVehicle1 = [
      {
        id: 1,
        title: "Wymiana opon",
        description: "Wymiana opon letnich na zimowe",
        start: new Date("2024-02-15T10:00:00"),
        end: new Date("2024-02-15T12:00:00"),
      },
      {
        id: 2,
        title: "Konserwacja wnętrza",
        description: "Konserwacja wnętrza",
        start: new Date("2024-02-23T10:00:00"),
        end: new Date("2024-02-23T12:00:00"),
      },
      {
        id: 3,
        title: "Wymiana części",
        description: "Wymiana sondy lambda",
        start: new Date("2024-02-17T10:00:00"),
        end: new Date("2024-02-17T12:00:00"),
      },
      {
        id: 4,
        title: "Wymiana części",
        description: "Wymiana tarcz, klocków i szczęk hamulcowych. Wymiana wahacza (PT).",
        start: new Date("2024-02-27T10:00:00"),
        end: new Date("2024-02-27T12:00:00"),
      },
    ];

    const eventsForVehicle2 = [
      {
        id: 1,
        title: "Wymiana opon",
        description: "Wymiana opon letnich na zimowe",
        start: new Date("2024-02-14T10:00:00"),
        end: new Date("2024-02-14T12:00:00"),
      },
      {
        id: 2,
        title: "Konserwacja wnętrza",
        description: "Konserwacja wnętrza",
        start: new Date("2024-02-22T10:00:00"),
        end: new Date("2024-02-22T12:00:00"),
      },
      {
        id: 3,
        title: "Wymiana części",
        description: "Wymiana sondy lambda",
        start: new Date("2024-02-16T10:00:00"),
        end: new Date("2024-02-16T12:00:00"),
      },
      {
        id: 4,
        title: "Wymiana części",
        description: "Wymiana tarcz, klocków i szczęk hamulcowych. Wymiana wahacza (PT).",
        start: new Date("2024-02-26T10:00:00"),
        end: new Date("2024-02-26T12:00:00"),
      },
    ];

    const eventsForAllVehicles = [...eventsForVehicle1, ...eventsForVehicle2];

    setEvents(vehicleId === 0 ? eventsForAllVehicles : vehicleId === 1 ? eventsForVehicle1 : eventsForVehicle2);
  };

  useEffect(() => {
    fetchEvents(selectedVehicle ? selectedVehicle.id : 0);
  }, [selectedVehicle]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div
      style={{
        marginLeft: "260px",
        paddingTop: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Form style={{ width: "350px", marginBottom: "20px", right: "67vh", position: "relative" }}>
        <Form.Group controlId="formVehicle">
          <Form.Label style={{ marginLeft: "15px" }}>Wybierz pojazd, który chcesz wyświetlić</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) =>
              setSelectedVehicle(
                vehicles.find((v) => v.id === +e.target.value)
              )
            }
          >
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>

      <div style={{ width: "170vh" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: "55vh",
            backgroundColor: "#fff",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
          views={["month"]}
          selectable
          onSelectEvent={handleSelectEvent}
          messages={customMessages}
        />
      </div>

      {selectedEvent && (
        <div style={{ marginTop: "3vh", paddingRight: "3vh", paddingTop: "1vh", border: "var(--bs-border-width) var(--bs-border-style) var(--bs-border-color)" }}>
          <ul>
            <li>
              <strong style={{ color: "#fff" }}>{selectedEvent.title}</strong>
              <p>Termin od: {moment(selectedEvent.start).format("LLLL")}</p>
              <p>Termin do: {moment(selectedEvent.end).format("LLLL")}</p>
              {selectedEvent.description && (
                <p>Opis: {selectedEvent.description}</p>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DashboardHistoryCalendar;
