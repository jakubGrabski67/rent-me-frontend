import React from 'react';
import HomepageHeader from '../HomepageHeader/HomepageHeader';
import HomepageFooter from '../HomepageFooter/HomepageFooter';
import Helmet from '../Helmet/Helmet';
import heroImg1 from '../../assets/images/hero-img1.jpg';
import { Collapse } from 'antd';

import '../HomepagePages/faq.css';

const FAQ = () => {
  const { Panel } = Collapse;

  return (
    <>
      <HomepageHeader />
      <Helmet title={'FAQ'} />
      <div className="hero__container" style={{
        backgroundImage: `url(${heroImg1})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '70vh',
      }}>
      </div>

      <div className='block faqPage'>
        <div className='container'>
          <h2 className='faq__header' >FAQ</h2>
          <Collapse accordion defaultActiveKey={['0']} ghost>
            <Panel header="Czy pobieracie kaucję podczas wynajmu?" key="1">
              <p className='faq__param'>Kaucja nie jest wymagana. Istnieje możliwość wpłaty kaucji w wysokości 3000 zł, 
                w takim wypadku otrzymasz rabat od ceny wynajmu. Zachęcamy do zapoznania się z indywidualnymi cennikami samochodów.</p>
            </Panel>
            <Panel header="Czy samochody są ubezpieczone?" key="2">
              <p className='faq__param'>Nasze samochody posiadają pełne pakiety ubezpieczeń w skład których wchodzi: OC, AC, NNW, ASS.</p>
            </Panel>
            <Panel header="Jak zarezerwować samochód?" key="3">
              <p className='faq__param'>Rezerwacji można dokonać poprzez kontakt telefoniczny, wiadomość mailową, poprzez kalendarz pod samochodami na stronie internetowej oraz wiadomość na Facebooku lub Instagramie.</p>
            </Panel>
            <Panel header="Czy jest możliwość dostarczenia samochodu pod wskazany adres?" key="4">
              <p className='faq__param'>Istnieje możliwość dowozu samochodu pod wskazany adres za dodatkową opłatą, która ustalana jest indywidualnie w zależności od dystansu i długości wynajmu.</p>
            </Panel>
            <Panel header="Jakie dokumenty są wymagane podczas wynajmu?" key="5">
              <p className='faq__param'>Prawo jazdy oraz dowód osobisty to wszystko czego potrzebujesz podczas wynajmu.</p>
            </Panel>
            <Panel header="Jak można zapłacić za wynajem?" key="6">
              <p className='faq__param'>Płatności za wynajem można dokonać gotówką, kartą płatniczą lub odpowiednio wcześniej przelewem internetowym.</p>
            </Panel>
            <Panel header="Jak można się skontaktować jeśli mam pytania?" key="7">
              <p className='faq__param'>Telefonicznie lub mailowo.</p>
            </Panel>
            <Panel header="Czy istnieje limit kilometrów podczas wynajmu samochodu?" key="8">
              <p className='faq__param'>W większości przypadków oferujemy nielimitowany przebieg, ale warto się upewnić przy rezerwacji konkretnego samochodu.</p>
            </Panel>
            <Panel header="Czy istnieje możliwość przedłużenia okresu wynajmu?" key="9">
              <p className='faq__param'>Tak, jeśli potrzebujesz przedłużyć okres wynajmu, skontaktuj się z nami jak najwcześniej, abyśmy mogli to zorganizować.</p>
            </Panel>
            <Panel header="Jakie są godziny odbioru i zwrotu samochodu?" key="10">
              <p className='faq__param'>Standardowe godziny odbioru i zwrotu to od 9:00 do 18:00. W razie potrzeby można uzgodnić inne godziny z naszym zespołem obsługi.</p>
            </Panel>
          </Collapse>
        </div>
      </div>

      <HomepageFooter />
    </>
  );
};

export default FAQ;
