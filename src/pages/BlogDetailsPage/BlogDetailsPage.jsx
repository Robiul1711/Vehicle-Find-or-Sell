import BlogDetailsBanner from '@/components/blogComponents/blogDetails/BlogDetailsBanner'
import { CommonPageWrapper } from '@/components/common/CommonPageWrapper'
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlogCommentSection from '@/components/blogComponents/blogDetails/BlogCommentSection';
import { ScrollRestoration } from 'react-router-dom';
import BlogCommonForm from '@/components/blogComponents/blogDetails/BlogCommonForm';
import RelatedPostsSection from '@/components/blogComponents/blogDetails/RelatedPostsSection';

const BlogDetailsPage = () => {

  const descriptionRef = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: 200 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
          markers: false
        }
      }
    )
  }, [])

  return (
    <div className=''>
      <ScrollRestoration />
      <CommonPageWrapper>
        <BlogDetailsBanner />
        {/* Details section  */}
        <div ref={descriptionRef} className="space-y-4">
          <p className="lg:text-2xl">Introduction</p>
          <p className="lg:text-lg">
            Keep your car running smoothly and looking great by following these essential maintenance tips. Whether you're a new car owner or an experienced driver, proper care can extend your vehicle’s life and save you money.
          </p>
          <p className="lg:text-lg">
            Owning a car is a significant investment, and keeping it in excellent condition requires regular care and attention. Whether you drive a brand-new vehicle or a well-used one, following a consistent maintenance routine can save you from costly repairs and ensure your safety on the road. Many car owners overlook basic upkeep tasks, which can lead to engine troubles, decreased fuel efficiency, or even accidents. To help you avoid these issues, we’ve compiled a comprehensive list of essential car maintenance tips that every driver should know. Implementing these simple practices will not only extend the lifespan of your vehicle but also maintain its value and performance for years to come.
          </p>
          <p className="lg:text-lg">
            One of the most important aspects of car maintenance is regular oil changes. Engine oil lubricates all the moving parts inside your engine, reducing friction and preventing overheating. Over time, oil breaks down and becomes less effective, allowing dirt and debris to accumulate, which can severely damage engine components. Most manufacturers recommend changing the oil every 5,000 to 7,500 miles, but this can vary based on your vehicle model and driving conditions. Using the right type and grade of oil is also crucial. Neglecting this simple task can lead to expensive engine repairs and reduce your car’s overall efficiency.
          </p>
          <p className="lg:text-lg">
            Another critical maintenance task is checking your tires frequently. Proper tire pressure is essential for safety, fuel economy, and comfort. Under-inflated tires cause poor handling and increase the risk of blowouts, while over-inflated tires can lead to uneven wear. Besides pressure, you should inspect the tread depth regularly. Tires with worn-out treads have less grip, especially in wet conditions, increasing the chances of skidding. Rotating your tires every 6,000 to 8,000 miles helps ensure even wear and extends their lifespan. Remember, your tires are the only contact points between your car and the road, so keeping them in good shape is non-negotiable.
          </p>
          <p className="lg:text-lg">
            Keeping your car clean may seem like a cosmetic task, but it plays a significant role in maintenance. Regular washing removes dirt, salt, and other corrosive substances that can damage your car’s paint and cause rust. Applying wax after washing adds a protective layer against environmental elements and keeps your car looking shiny. Don’t forget the interior — vacuum carpets, clean the dashboard, and condition leather seats if you have them. A clean interior prevents wear and tear and maintains the vehicle’s resale value. Plus, a tidy car makes your driving experience more enjoyable.
          </p>
          <p className="lg:text-lg">
            Brake inspection is another vital part of car maintenance that should not be overlooked. Your brakes are crucial for safety, and any issues can be dangerous. Pay attention to any unusual sounds like squeaking or grinding when you apply the brakes. These noises often indicate worn brake pads or rotors that need replacement. Also, if you notice a spongy feeling when pressing the brake pedal, it could mean air in the brake lines or fluid leaks. Regular brake checks by a professional mechanic help ensure your braking system is responsive and safe, giving you peace of mind on the road.
          </p>
        </div>

        {/* Comment Section  */}
        <BlogCommentSection />

        {/* Comment Form  */}
        <BlogCommonForm />

        {/* Related Post section  */}
        <RelatedPostsSection />

      </CommonPageWrapper>
    </div>
  )
}

export default BlogDetailsPage