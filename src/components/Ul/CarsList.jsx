import React from 'react'

import CarCard from './CarCard'

const CarsList = ({data}) => {
  return (
    <>
    {
        data?.map(item=>(
            <CarCard item={item}/>
        ))
    }
    </>
  )
}

export default CarsList