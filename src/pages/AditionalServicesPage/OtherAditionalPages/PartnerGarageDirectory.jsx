import PartnerGarageBanner from '@/components/additionalServicesComponent/partnerGarage/PartnerGarageBanner'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'

const PartnerGarageDirectory = () => {
  return (
    <div className='mt-20'>
      <PartnerGarageBanner />
      <CommonPageWrapper>

        <div className="grid grid-cols-1  gap-4 lg:gap-10 ">
          <div className="space-y-4">
            <p className="lg:text-3xl font-bold">
              Garages On LaBonneRoute.fr, you won't only find private listings. Garages also advertise their vehicles and offer you their services:
            </p>

            <ul className='list-disc pl-4'>
              <li>
                Sale of used vehicles with a full service history and warranty
              </li>
              <li>
                Trade-in of your old vehicle
              </li>
              <li>
                Maintenance and repairs
              </li>
              <li>
                Pre-sale preparation and technical inspection
              </li>
              <li>
                Financing solutions and mechanical warranties
              </li>

            </ul>
            <p className="">
              By choosing a garage, you benefit from the security of a professional and peace of mind for your purchase or sale.
            </p>


          </div>

        </div>
      </CommonPageWrapper>
    </div>
  )
}

export default PartnerGarageDirectory