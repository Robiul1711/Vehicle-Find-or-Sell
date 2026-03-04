import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useApiQuery } from "@/hooks/useApiQuery";


const Faq = () => {
    const { data, isLoading } = useApiQuery({
      queryKey: ["faq"],
      url: "/support/faq/",

    });
  
  return (
    <div className="">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">
        Frequently Asked Questions
      </h2>
      <p className="text-sm text-gray-600 mb-6">Quick answers to the most common queries from runners and coaches.</p>

    <Accordion className="space-y-2 md:space-y-4" type="single" collapsible>
  {data?.data?.map((faq, index) => (
    <div key={index} className="border rounded-lg md:rounded-xl overflow-hidden px-4">
      <AccordionItem value={`item-${index}`} className="border-none">
        <AccordionTrigger className="font-medium text-lg sm:text-2xl">
          {faq.question}
        </AccordionTrigger>
        <AccordionContent className="sm:text-lg">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    </div>
  ))}
</Accordion>

    </div>
  );
};

export default Faq;
