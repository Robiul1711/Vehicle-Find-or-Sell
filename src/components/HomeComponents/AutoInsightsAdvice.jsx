import React from 'react'
import Title from '../common/Title'
import { ArrowUpRight } from 'lucide-react'
import { FaRegUser } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import car from '@/assets/images/car1.png'

// JSON Data
const articles = [
  {
    id: 1,
    author: "admin",
    date: "5 Aug, 2025",
    title: "How to Prepare Your Car for Sale and Get More Offers",
  },
  {
    id: 2,
    author: "john_doe",
    date: "10 Aug, 2025",
    title: "Top 5 Fuel-Efficient Cars to Buy in 2025",
  },
  {
    id: 3,
    author: "car_expert",
    date: "15 Aug, 2025",
    title: "Electric vs Hybrid: Which One Should You Choose?",
  },
  {
    id: 4,
    author: "auto_guru",
    date: "20 Aug, 2025",
    title: "The Future of Autonomous Cars in Everyday Life",
  },
]

const AutoInsightsAdvice = () => {
  return (
    <div className='section-padding-x section-padding-y'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <Title level="title40">Auto Insights & Advice</Title>
        <button className="flex items-center gap-2 text-custom-primary">
          View All <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <Title level="title20" className="mt-2">
        Explore tips, reviews, and the latest trends in the automotive world to make smarter buying and selling decisions.
      </Title>

      {/* Articles Grid */}
      <div className='mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {articles.map((article) => (
          <div key={article.id} className='text-[#141414] overflow-hidden'>
            <img 
              src={car} 
              alt={`Article ${article.id}`} 
              className='w-full h-68 object-cover rounded-lg' 
            />

            <div className='my-5 space-y-4'>
              <div className='flex items-center gap-6 text-sm text-gray-600'>
                <p className='flex items-center gap-2'>
                  <FaRegUser /> {article.author}
                </p>
                <p className='flex items-center gap-2'>
                  <FaCalendarAlt /> {article.date}
                </p>
              </div>

              <Title level="title20">{article.title}</Title>

              <button className='flex items-center gap-2 text-custom-primary mb-4'>
                Read More <ArrowUpRight className='w-4 h-4'/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AutoInsightsAdvice
