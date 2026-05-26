import React from 'react'
import Title from '../common/Title'
import { ArrowUpRight } from 'lucide-react'
import { FaRegUser } from "react-icons/fa";
import { RxCalendar } from "react-icons/rx";
import car from '@/assets/images/car1.png'
import { Link } from 'react-router-dom';
import { useApiQuery } from '@/hooks/useApiQuery';
import { motion } from 'framer-motion';

const AutoInsightsAdvice = () => {
    const { data, isLoading } = useApiQuery({
      queryKey: ["blog"],
      url: "/blog/",
    });

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
        },
      },
    };

    const cardVariants = {
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      },
    };

  return (
    <div className='section-padding-x section-padding-y overflow-hidden'>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='flex items-center justify-between'
      >
        <Title level="title40">Auto Insights & Advice</Title>
        <Link to="/blog" className="flex items-center gap-2 text-custom-primary hover:gap-3 transition-all">
          View All <ArrowUpRight className="w-4 h-4" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Title level="title20" className="mt-2 text-gray-500">
          Explore tips, reviews, and the latest trends in the automotive world to make smarter buying and selling decisions.
        </Title>
      </motion.div>

      {/* Articles Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className='mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'
      >
        {data?.data?.slice(0, 4).map((article) => (
          <Link 
            to={`/blogDetails/${article.id}/${article.slug}`} 
            key={article.id} 
            variants={cardVariants}
            className='text-[#141414] overflow-hidden group '
          >
            <div className="overflow-hidden rounded-xl">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={article?.image} 
                alt={article.title} 
                className='w-full h-64 object-cover' 
              />
            </div>

            <div className='my-5 space-y-4'>
              <div className='flex items-center gap-6 text-sm text-gray-600'>
                <p className='flex items-center gap-2'>
                 <RxCalendar className="text-custom-primary" /> {article.created_at}
                </p>
              </div>

              <Title level="title20" className="line-clamp-2 min-h-[3.5rem] group-hover:text-custom-primary transition-colors">
                <div dangerouslySetInnerHTML={{ __html: article.title }}></div>
              </Title>

              <Link to={`/blogDetails/${article.id}/${article.slug}`} className='flex items-center gap-2 font-bold text-custom-primary mb-4 group/btn'>
                Read More 
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <ArrowUpRight className='w-4 h-4'/>
                </motion.span>
              </Link>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  )
}

export default AutoInsightsAdvice;
