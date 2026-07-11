import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useApiQuery } from "@/hooks/useApiQuery";
import Title from '../common/Title';
import { motion } from 'framer-motion';

const HomeFaq = () => {
  const { data, isLoading } = useApiQuery({
    queryKey: ["faq"],
    url: "/support/faq/",
  });

  if (isLoading) {
    return (
      <div className="section-padding-x section-padding-y max-w-7xl mx-auto animate-pulse space-y-4">
        <div className="h-10 w-1/3 bg-gray-200 rounded-lg"></div>
        <div className="h-6 w-1/2 bg-gray-200 rounded-lg"></div>
        <div className="space-y-3 pt-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 w-full bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const faqs = data?.data || [];
  if (faqs.length === 0) return null;

  return (
    <div className="section-padding-x section-padding-y bg-gray-50/50">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start w-full">
        
        {/* Left Column: Heading & Intro */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 bg-custom-primary/10 text-custom-primary px-4 py-1.5 rounded-full text-sm font-semibold">
              FAQ
            </div>
            <Title level="title48" className="text-gray-900 leading-tight">
              Frequently Asked Questions
            </Title>
            <p className="text-gray-600 text-lg leading-relaxed">
              Find quick answers to the most common queries about buying, selling, and leasing vehicles on our platform.
            </p>
            <div className="pt-4">
              <p className="text-sm text-gray-500">
                Still have questions? Feel free to contact our support team.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Accordion */}
        <div className="w-full lg:w-2/3">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion className="space-y-4" type="single" collapsible>
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-gray-100 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 px-6 py-2"
                >
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="font-semibold text-lg text-left text-gray-900 hover:text-custom-primary hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-600 leading-relaxed pt-2 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </motion.div>
        </div>
        
      </div>
    </div>
  );
};

export default HomeFaq;
