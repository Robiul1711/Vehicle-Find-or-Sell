import BlogBanner from '@/components/blogComponents/BlogBanner'
import LookingFor from '@/components/HomeComponents/LookingFor'
import React from 'react'
import BlogGrid from './BlogGrid'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'

const BlogPage = () => {
  return (
    <div className='mt-20'>
      <BlogBanner />
      <CommonPageWrapper>
        <BlogGrid />
      </CommonPageWrapper>
      <LookingFor />
    </div>
  )
}

export default BlogPage