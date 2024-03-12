import React from 'react'

import { motion } from 'framer-motion'

import './car-card.css'

import { Col } from 'reactstrap'

import { Link } from 'react-router-dom'

const CarCard = ({item}) => {
  return (
    <Col lg='3' md='4' className='mb-2'>
        <div className="car__item">
        <div className="car__img">
            <motion.img whileHover={{scale: 0.9}} src={item.imgUrl} alt="" />
        </div>
        <div className='p-2 car__info'>
        <h3 className="car__name"><Link to={`/shop/${item.id}`}>{item.productName}</Link></h3>
        <span>{item.category}</span>
        </div>
        <div className="car__card-bottom d-flex align-items-center justify-content-between p-2">
            <span className="price">${item.price}/Day</span>
            <motion.span whileTap={{scale: 1.2}}>
                <i class="ri-add-line"></i>
            </motion.span>
        </div>
    </div>
    </Col>
  )
}

export default CarCard