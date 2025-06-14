
import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // shadcn/ui component

interface FAQItemProps {
  value: string;
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ value, question, answer }) => {
  return (
    <AccordionItem value={value} className="border-b border-gray-300 last:border-b-0">
      <AccordionTrigger className="py-6 text-lg font-semibold text-deep-blue hover:no-underline hover:text-deep-blue/80 text-left">
        {question}
      </AccordionTrigger>
      <AccordionContent className="pb-6 text-gray-700 text-base">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;
