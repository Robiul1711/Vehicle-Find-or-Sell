import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need an account to browse listings?",
    answer: "No, you can browse freely. An account is only required to post ads or contact sellers.",
  },
  {
    question: "Are the listings verified?",
    answer: "Yes, we encourage verified sellers and professional dealers, but private users can also post.",
  },
  {
    question: "Can I compare vehicles?",
    answer: "Yes, you can select up to 2 listings and compare their details side by side.",
  },
  {
    question: "What kind of vehicles can I list?",
    answer: "You can easily apply your own Tailwind CSS classes to match your project’s design.",
  },
  {
    question: "Can I edit my ad after publishing?",
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
