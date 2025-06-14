
import React from 'react';
import { Accordion } from "@/components/ui/accordion";
import FAQItem from './FAQItem';

const faqData = [
  {
    value: "item-1",
    question: "Is Wedder free to use?",
    answer: "Yes, Wedder is free to join, create a profile, and browse matches. We offer optional premium features for an enhanced experience.",
  },
  {
    value: "item-2",
    question: "How is Wedder different from other matrimonial apps?",
    answer: "Wedder focuses on a modern, intuitive swipe-based experience specifically for Gen Z and Millennials serious about marriage. We prioritize verified profiles and meaningful connections over casual dating.",
  },
  {
    value: "item-3",
    question: "Can families be involved?",
    answer: "While Wedder empowers individuals to find their partners, we understand the importance of family in Indian marriages. Users can choose to share profiles and involve family members at their discretion.",
  },
  {
    value: "item-4",
    question: "Is my data safe on Wedder?",
    answer: "Absolutely. We use industry-standard security measures to protect your personal information. Your privacy and data security are our top priorities.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-deep-blue text-center mb-16">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item) => (
              <FAQItem key={item.value} value={item.value} question={item.question} answer={item.answer} />
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
