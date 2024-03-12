import React from 'react'
import '../HomepageFooter/homepageFooter.css'
import {Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap'
import { Link } from 'react-router-dom'

const HomepageFooter = () => {

  const year = new Date().getFullYear()

  return (
    <footer className="homepageFooter">
      <Container>
        <Row>
          <Col lg='4'>
          <div className="logo">
                        
                        <div>
                            <h1 className='text-white'>Rent Me!</h1>
                            <p>Wypożyczalnia samochodów online</p>
                        </div>
                        
                    </div>
                    <p className="footer__text mt-5">
                    Rent Me! to rozbudowana sieć wypożyczalni, składająca się z ponad 35 oddziałów, 
                    zlokalizowanych w 29 dużych miastach Polski. Nasze biura znajdziesz na 6 kluczowych 
                    polskich lotniskach. Dzięki temu możesz podróżować po całym kraju, wypożyczając auto w 
                    jednym oddziale i oddając je w drugim.
                    </p>
          </Col>
          <Col lg='3'>
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Najpopularniejsze pojazdy</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Mercedes-Benz</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>AUDI</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>BMW</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Toyota</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Nissan</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Ford</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Hyundai</Link>
                </ListGroupItem>

              </ListGroup>
            </div>
          </Col>
          <Col lg='2'>
          <div className="footer__quick-links">
              <h4 className="quick__links-title">O nas</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/shop'>Nasza flota</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Klauzula informacyjna</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Ogólne warunki najmu pojazdów</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Reklamacje</Link>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Polityka prywatności</Link>
                </ListGroupItem>

              </ListGroup>
            </div>
          </Col>
          <Col lg='3'>
          <div className="footer__quick-links">
              <h4 className="quick__links-title">Kontakt</h4>
              <ListGroup className='footer__contact'>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span><i className="ri-map-pin-line"></i></span>
                  <p>ul. Świętej Jadwigi 22, 42-226, Częstochowa, Poland</p>
                </ListGroupItem>



                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <p>Wynajmy krótkoterminowe</p>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                <span><i className="ri-phone-line"></i></span>
                  <p>+48 123 222 111</p>
                </ListGroupItem>



                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <p>Wynajmy długoterminowe</p>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                <span><i className="ri-phone-line"></i></span>
                  <p>+48 333 111 252</p>
                </ListGroupItem>



                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                <span><i className="ri-mail-line"></i></span>
                  <p>kontakt@rentme.pl</p>
                </ListGroupItem>

              </ListGroup>
            </div>
          </Col>
          <hr className='hr__footer'></hr>
          <Col lg='12'>
            <p className="footer__copyrights">Copyright © Rentme.pl. All rights reserved {year}.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default HomepageFooter