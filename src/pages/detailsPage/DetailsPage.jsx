import FeaturesComponent from '@/components/admin/CarDetails/FeaturesComponent'
import CarOverView from '@/components/details/CarOverView'
import DetailsRowOne from '@/components/details/DetailsRowOne'
import React from 'react'

const DetailsPage = () => {
  return (
    <div className='  section-padding-x section-padding-y flex flex-col gap-10 '>
        <DetailsRowOne/>
        <CarOverView/>
        <FeaturesComponent/>
    </div>
  )
}

export default DetailsPage