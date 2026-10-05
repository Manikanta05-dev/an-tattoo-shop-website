import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FAQItem } from '@/types';

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="divide-y divide-white/10">
      {items.map((item, index) => (
        <div key={index} className="border-b border-white/10 last:border-b-0">
          <button
            className="w-full flex justify-between items-center py-4 text-left text-white min-h-[44px] hover:text-gray-200 transition-colors duration-200"
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
            id={`faq-question-${index}`}
          >
            <span className="font-medium pr-4">{item.question}</span>
            <span
              className="text-xl flex-shrink-0 transition-transform duration-200"
              aria-hidden="true"
              style={{
                transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
              }}
            >
              +
            </span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <p className="pb-4 text-gray-300 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
