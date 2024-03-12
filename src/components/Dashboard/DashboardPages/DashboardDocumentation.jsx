import React, { useState } from 'react';
import {
  Container,
  Button,
} from 'react-bootstrap';
import DashboardNavbarLeft from '../DashboardNavbarLeft/DashboardNavbarLeft';
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar';
import Formularz1 from './Forms/Formularz1';
import Formularz2 from './Forms/Formularz2';
import Formularz3 from './Forms/Formularz3';
import "../DashboardStyles/DashboardDocumentation.css";
import jsPDF from 'jspdf';

const DashboardDocumentation = () => {
  const goBack = () => {
    setSelectedForm(null);
  };

  const [formData, setFormData] = useState({
    // vehicleMakeAndModel: '',
    // vehicleRegistrationNumber: '',
    // vehicleYearOfProduction: '',
    // rentalStartDate: '',
    // rentalEndDate: '',
    // basicFee: '',
    // additionalFees: '',
    // insuranceCosts: '',
    // fuelLevel: '',
    // returnLocation: '',
    // returnDate: '',
    // client: '',
    // date: '',
    // damage1: '',
    // damage2: '',
    // damage3: '',
    // clientSignature: '',
    // rentalRepresentativeSignature: '',
    // insuranceStartDate: '',
    // insuranceEndDate: '',
    // policyNumber: '',
    // coverageScope: '',

  });

  const [selectedForm, setSelectedForm] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePrint = (title, formLabels) => {
    const pdf = new jsPDF();
  
    pdf.text(title, 10, 10);
  
    let yPos = 30;
  
    Object.keys(formLabels).forEach((fieldName) => {
      const label = formLabels[fieldName];
      const value = formData[fieldName] !== undefined ? formData[fieldName] : 'Brak danych';
  
      pdf.text(`${label}: ${value}`, 10, yPos);
      yPos += 10;
    });
  
    // Drukuj bezpośrednio
    pdf.autoPrint();
    pdf.output('dataurlnewwindow');
    
  };
  const handleFormSelect = (formId) => {
    setSelectedForm(formId);
  };

 

  const handlePrintForm1= () => {
    const form1Labels = {
      vehicleMakeAndModel: 'Marka i model pojazdu',
      vehicleRegistrationNumber: 'Numer rejestracyjny',
      vehicleYearOfProduction: 'Rok produkcji',
      rentalStartDate: 'Data i godzina rozpoczecia najmu',
      rentalEndDate: 'Data i godzina zakonczenia najmu',
      basicFee: 'Oplata podstawowa',
      additionalFees: 'Oplaty dodatkowe',
      insuranceCosts: 'Koszty ubezpieczenia',
      fuelLevel: 'Poziom paliwa',
      returnLocation: 'Miejsce zwrotu',
      returnDate: 'Termin zwrotu',
      // Dodaj inne etykiety dla formularza 3
    };
  
    handlePrint('Umowa najmu pojazdu', form1Labels);
  };




  const handlePrintForm2 = () => {
    const form2Labels = {
      client: 'Klient',
      date: 'Data',
      damage1: 'Uszkodzenie 1',
      damage2: 'Uszkodzenie 2',
      damage3: 'Uszkodzenie 3',
      clientSignature: 'Podpis klienta',
      rentalRepresentativeSignature: 'Podpis przedstawiciela wypozyczalni'
      // Dodaj inne etykiety dla formularza 3
    };
  
    handlePrint('Raport o stanie pojazdu', form2Labels);
  };
  

  const handlePrintForm3 = () => {
    const form3Labels = {
      vehicleMakeAndModel: 'Marka i model',
      vehicleRegistrationNumber: 'Numer rejestracyjny',
      insuranceStartDate: 'Data rozpoczecia ochrony',
      insuranceEndDate: 'Data zakonczenia ochrony',
      policyNumber: 'Numer polisy',
      coverageScope: 'Zakres ochrony',
      contactNumber: 'Numer kontaktowy'
      // Dodaj inne etykiety dla formularza 3
    };
  
    handlePrint('Potwierdzenie ubezpieczenia', form3Labels);
  };

  return (
    <>
      <DashboardNavbar />
      <DashboardNavbarLeft />
      <Container className="rental-agreement-form">
        {selectedForm !== null ? (
          selectedForm === 1 ? (
            <Formularz1
              formData={formData}
              handleChange={handleChange}
              handlePrint={handlePrintForm1}
              goBack={goBack}
            />
          ) : selectedForm === 2 ? (
            <Formularz2
              formData={formData}
              handleChange={handleChange}
              handlePrint={handlePrintForm2}
              goBack={goBack}
            />
          ) : selectedForm === 3 ? (
            <Formularz3
              formData={formData}
              handleChange={handleChange}
              handlePrint={handlePrintForm3}
              goBack={goBack}
            />
          ) : null
        ) : (
          <div className='documentation-forms'>
            <h2 className='mb-5 h2-documentation'>Wybierz formularz, który chcesz wypełnić lub wydrukować:</h2>
            <Button variant="primary" onClick={() => handleFormSelect(1)}>
              Umowa najmu pojazdu
            </Button>
            <Button variant="primary" onClick={() => handleFormSelect(2)}>
              Raport o stanie pojazdu
            </Button>
            <Button variant="primary" onClick={() => handleFormSelect(3)}>
              Potwierdzenie ubezpieczenia
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default DashboardDocumentation;