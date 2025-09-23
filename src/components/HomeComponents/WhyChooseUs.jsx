import React from 'react'
import Title from '../common/Title'
import { AllUserIcon, EasyAdPostingIcon, SecureTrustedIcon, SmartPromotionsIcon } from '../common/SVGicons/MySvg'

const WhyChooseUsData = [
{
  id: 1,
  icon: <EasyAdPostingIcon />,
  title: "Easy Ad Posting",
  desc: "List your vehicle with photos, videos & documents in minutes."
},
{  id: 2,
  icon: <AllUserIcon />,
  title: "For All Users",
  desc: "Designed for both private sellers and professional dealers."
},{  id: 3,
  icon: <SmartPromotionsIcon />,
  title: "Smart Promotions",
  desc: "Boost your ad’s visibility with featured and top listings."
},
{  id: 4,
  icon: <SecureTrustedIcon />,
  title: "Secure & Trusted",
  desc: "Safe messaging, verified users, and full data protection."
},
]
const WhyChooseUs = () => {
  return (
    <div className='section-padding-x section-padding-y bg-custom-primary text-white'>
      <Title level="title40">Why Choose Us?</Title>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-16'>
{
        WhyChooseUsData.map(item=>(
          <div key={item.id} className='flex flex-col gap-6'>
            {item.icon}
            <Title level="title24">{item.title}</Title>
            <Title level="title18">{item.desc}</Title>
          </div>
        ))
}
      </div>

    </div>
  )
}

export default WhyChooseUs