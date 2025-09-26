import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern and is screen-reader friendly.",
  },
  {
    question: "Can I use it in my project?",
    answer: "Absolutely! You can use it in both personal and commercial projects.",
  },
  {
    question: "Is it mobile responsive?",
    answer: "Yes, it works perfectly across desktop, tablet, and mobile devices.",
  },
  {
    question: "How do I customize the styles?",
    answer: "You can easily apply your own Tailwind CSS classes to match your project’s design.",
  },
];

const Faq = () => {
  return (
    <div className="">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">
        Frequently Asked Questions
      </h2>
      <p className="text-sm text-gray-600 mb-6">Quick answers to the most common queries from runners and coaches.</p>

      <Accordion className="space-y-2 md:space-y-4" type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border rounded-lg md:rounded-2xl px-4"
          >
            <AccordionTrigger className={"font-medium text-lg sm:text-2xl"}>{faq.question}</AccordionTrigger>
            <AccordionContent className={"sm:text-lg"}>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
