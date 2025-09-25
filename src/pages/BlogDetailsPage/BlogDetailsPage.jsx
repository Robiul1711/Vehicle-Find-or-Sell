import BlogDetailsBanner from '@/components/blogComponents/blogDetails/BlogDetailsBanner'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import React from 'react'

const BlogDetailsPage = () => {
  return (
    <div className=''>
      <CommonPageWrapper>
        <BlogDetailsBanner />
      </CommonPageWrapper>
    </div>
  )
}

export default BlogDetailsPage