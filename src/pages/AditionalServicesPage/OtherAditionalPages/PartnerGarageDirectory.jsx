import PartnerGarageBanner from '@/components/additionalServicesComponent/partnerGarage/PartnerGarageBanner'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'
import s9 from '@/assets/images/s9.jpg'
import ServiceBanner from '@/components/common/ServiceBanner'
const PartnerGarageDirectory = () => {
  return (
    <div >
      <ServiceBanner image={s9} title="Partner Garage Directory" subText="Find trusted partner garages near you for reliable service and support." />
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