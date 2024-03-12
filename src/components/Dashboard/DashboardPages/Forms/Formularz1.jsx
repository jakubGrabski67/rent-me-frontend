import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import jsPDF from 'jspdf'; // Importuje jsPDF
import "../../DashboardStyles/DashboardDocumentation.css";

const Formularz1 = ({ formData, handleChange, handlePrint, goBack }) => {

  const handlePrintForm1 = () => {
    const form1Labels = {
      vehicleMakeAndModel: 'Marka i model pojazdu',
    vehicleRegistrationNumber: 'Numer rejestracyjny',
    vehicleYearOfProduction: 'Rok produkcji',
    rentalStartDate: 'Data i godzina rozpoczęcia najmu',
    rentalEndDate: 'Data i godzina zakończenia najmu',
    basicFee: 'Opłata podstawowa',
    additionalFees: 'Opłaty dodatkowe',
    insuranceCosts: 'Koszty ubezpieczenia',
    fuelLevel: 'Poziom paliwa',
    returnLocation: 'Miejsce zwrotu',
    returnDate: 'Termin zwrotu',
      // Dodaj inne etykiety dla formularza 2
    };

    handlePrint('Raport o stanie pojazdu', form1Labels);
  };
    const handleSaveAsPDF = () => {
        const pdf = new jsPDF();
        pdf.text('Umowa najmu pojazdu', 10, 10); // Dodaj treść formularza do pliku PDF
        pdf.save('Umowa_najmu_pojazdu.pdf'); // Zapisz jako plik PDF o nazwie 'Formularz1.pdf'
      };
  return (
    <Container className="rental-agreement-form">
      <h1 className="mt-5 h2-documentation">UMOWA NAJMU POJAZDU</h1>

      <h2 className="mt-4 h2-documentation">Przedmiot najmu:</h2>
      <Form.Group as={Row} className="mb-3 label-form pt-3" >
        <Form.Label column sm="4">Marka i model pojazdu:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="vehicleMakeAndModel"
            value={formData.vehicleMakeAndModel}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3 ">
        <Form.Label column sm="4">Numer rejestracyjny:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="vehicleRegistrationNumber"
            value={formData.vehicleRegistrationNumber}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="4">Rok produkcji:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="vehicleYearOfProduction"
            value={formData.vehicleYearOfProduction}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <h2 className='h2-documentation pt-3'>Data i godzina rozpoczęcia najmu:</h2>
      <Form.Group as={Row} className="mb-3 pt-3">
        <Form.Label column sm="4">Data i godzina rozpoczęcia najmu:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="rentalStartDate"
            value={formData.rentalStartDate}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <h2 className='h2-documentation pt-3'>Data i godzina zakończenia najmu:</h2>
      <Form.Group as={Row} className="mb-3 pt-3">
        <Form.Label column sm="4">Data i godzina zakończenia najmu:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="rentalEndDate"
            value={formData.rentalEndDate}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <h2 className='h2-documentation pt-3'>Koszty najmu:</h2>
      <Form.Group as={Row} className="mb-3 pt-3">
        <Form.Label column sm="4">Opłata podstawowa:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="basicFee"
            value={formData.basicFee}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3 ">
        <Form.Label column sm="4">Opłaty dodatkowe:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="additionalFees"
            value={formData.additionalFees}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="4">Koszty ubezpieczenia:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="insuranceCosts"
            value={formData.insuranceCosts}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <h2 className='h2-documentation pt-3'>Warunki dotyczące zwrotu pojazdu:</h2>
      <Form.Group as={Row} className="mb-3 pt-3">
        <Form.Label column sm="4">Poziom paliwa:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="fuelLevel"
            value={formData.fuelLevel}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="4">Miejsce zwrotu:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="returnLocation"
            value={formData.returnLocation}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="4">Termin zwrotu:</Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <div className='pt-3'>
  <Button variant="primary" onClick={handlePrintForm1}>
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

export default Formularz1;
