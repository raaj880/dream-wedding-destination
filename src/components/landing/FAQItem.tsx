
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
    <AccordionItem value={value} className="border-b border-border last:border-b-0">
      <AccordionTrigger className="py-6 text-lg font-semibold text-foreground hover:no-underline hover:text-foreground/80 text-left">
        {question}
      </AccordionTrigger>
      <AccordionContent className="pb-6 text-muted-foreground text-base">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;
