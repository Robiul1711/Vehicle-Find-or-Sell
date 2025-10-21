import CompareTable from '@/components/additionalServicesComponent/VehiclePurchase/CompareTable'
import FinancingSimulator from '@/components/additionalServicesComponent/VehiclePurchase/FinancingSimulator'
import VehiclePurchaseBanner from '@/components/additionalServicesComponent/VehiclePurchase/VehiclePurchaseBanner'
import VehiclePurchaseKeypoints from '@/components/additionalServicesComponent/VehiclePurchase/VehiclePurchaseKeypoints'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import { CustomAutoLoan, CustomCash, CustomCheck, CustomCompare, CustomLOA } from '@/utils/IconProvider'
import { ImageProvider } from '@/utils/ImageProvider'
import React from 'react'
import s2 from '@/assets/images/s2.jpg'
import ServiceBanner from '@/components/common/ServiceBanner'
const VehiclePurchase = () => {
  return (
    <div >
      <ServiceBanner image={s2} title="Vehicle Purchase Options" subText="Explore different ways to buy a vehicle—cash, loans, leasing, or rental—and choose the option that suits your budget and lifestyle." />
      <CommonPageWrapper>
        <VehiclePurchaseKeypoints />
        <CompareTable />
        <FinancingSimulator />
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4  py-10 lg:py-20">
            <div className="">
              <img src={ImageProvider.purchase4} alt="" />
            </div>

            <div className="space-y-4">
              <p className="lg:text-3xl font-bold">
                Expert Tips
              </p>
              <p className="lg:text-xl">
                Choose the best option based on budget and preferences.
              </p>
              <div className="space-y-3">
                <p className=" flex items-center gap-2">
                  <CustomCheck /> Evaluate your monthly budget before choosing.
                </p>
                <p className=" flex items-center gap-2">
                  <CustomCheck /> Long-term car holders → Cash or Auto Loan.
                </p>
                <p className=" flex items-center gap-2">
                  <CustomCheck /> Frequent changers → LOA or LLD.
                </p>
                <p className=" flex items-center gap-2">
                  <CustomCheck /> Always compare rates and conditions (Cetelem, Cofidis, Sofinco, banks).
                </p>
                <p className=" flex items-center gap-2">
                  <CustomCheck /> Watch for additional fees (insurance, excess mileage).
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10 items-center">
            <div className="space-y-4 lg:space-y-10">
              <p className="lg:text-3xl font-bold">
                Summary of Warranty Options
              </p>
              <p className="lg:text-xl">
                Legal, contractual, and external warranties ensure better protection for your car purchase.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                  <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                    <CustomCash />
                  </div>

                  <p className="lg:text-2xl font-medium">
                    Cash
                  </p>
                  <p className="">full independence.</p>
                </div>
                <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                  <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                    <CustomAutoLoan />
                  </div>

                  <p className="lg:text-2xl font-medium">
                    Auto Loan
                  </p>
                  <p className="">Spread payments, immediate ownership.</p>
                </div>
                <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                  <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                    <CustomLOA />
                  </div>

                  <p className="lg:text-2xl font-medium">
                    LOA & LLD
                  </p>
                  <p className="">Flexibility with controlled monthly budget.</p>
                </div>
                <div className="bg-custom-primary  rounded p-5 text-white space-y-4">
                  <div className="w-12 h-12 bg-white text-white  rounded flex items-center justify-center mr-4">
                    <CustomCompare />
                  </div>

                  <p className="lg:text-2xl font-medium">
                    Compare Partner Offers
                  </p>
                 <p>Find the best financing options quickly.</p>
                </div>
              </div>
            </div>
            <div className="">
              <img className='w-full' src={ImageProvider.purchase5} alt="" />
            </div>
          </div>
        </div>
      </CommonPageWrapper>
    </div>
  )
}

export default VehiclePurchase