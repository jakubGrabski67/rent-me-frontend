import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import jsPDF from 'jspdf'; // Importuje jsPDF
import "../../DashboardStyles/DashboardDocumentation.css";

const Formularz2 = ({ formData, handleChange, handlePrint, goBack }) => {

  const handlePrintForm2 = () => {
    const form2Labels = {
      client: 'Klient',
      date: 'Data',
      damage1: 'Uszkodzenie 1',
      damage2: 'Uszkodzenie 2',
      damage3: 'Uszkodzenie 3',
      // Dodaj inne etykiety dla formularza 2
    };

    handlePrint('Raport o stanie pojazdu', form2Labels);
  };

  const handleSaveAsPDF = () => {
    const pdf = new jsPDF();
    pdf.text('Raport o stanie pojazdu', 10, 10); // Dodaj treść formularza do pliku PDF
    pdf.save('Raport_o_stanie_pojazdu.pdf'); // Zapisz jako plik PDF o nazwie 'Formularz1.pdf'
  };

  return (
    <Container className="rental-agreement-form">
      <h1 className="mt-5 h2-documentation">RAPORT O STANIE POJAZDU</h1>

      <Form.Group as={Row} className="mb-3 pt-3">
        <Form.Label column sm="4">
          Klient:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3 ">
        <Form.Label column sm="4">
          Data:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <h2 className="h2-documentation pt-3">Opis istniejących uszkodzeń pojazdu przed wypożyczeniem:</h2>
      <Form.Group as={Row} className="mb-3 pt-3">
        <Form.Label column sm="4">
          Uszkodzenie 1:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="damage1"
            value={formData.damage1}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="4">
          Uszkodzenie 2:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="damage2"
            value={formData.damage2}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="4">
          Uszkodzenie 3:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="damage3"
            value={formData.damage3}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <h2 className="h2-documentation pt-3">Zdjęcia uszkodzeń:</h2>
      <Form.Group as={Row} className="mb-3 pt-3">
        <Form.Label column sm="4">
          Miejsce na zdjęcia:
        </Form.Label>
        <Col sm="8">{/* Tu można dodać obszar na zdjęcia */}</Col>
      </Form.Group>

      <h2 className="h2-documentation pt-3">Podpisy:</h2>
      <Form.Group as={Row} className="mb-3 pt-3">
        <Form.Label column sm="4">
          Podpis klienta:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="clientSignature"
            value={formData.clientSignature}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="4">
          Podpis przedstawiciela wypożyczalni:
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="rentalRepresentativeSignature"
            value={formData.rentalRepresentativeSignature}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <div className="pt-3">
        <Button variant="primary" onClick={handlePrintForm2}>
          Drukuj
        </Button>
        <Button variant="primary" onClick={handleSaveAsPDF}>
          Zapisz plik jako PDF
        </Button>
        <Button variant="secondary" onClick={goBack}>
          Wróć
        </Button>
      </div>
    </Container>
  );
};

export default Formularz2;
