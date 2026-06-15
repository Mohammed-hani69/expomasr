import { useState } from 'react';
import { FAQS } from '../data';
import { FAQItem } from '../types';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("1"); // Open first FAQ by default

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {FAQS.map((faq: FAQItem) => {
        const isOpen = openId === faq.id;
        return (
          <div
            id={`faq-accordion-item-${faq.id}`}
            key={faq.id}
            className="rounded-2xl border border-brand-blue-light/60 bg-brand-blue-medium/50 overflow-hidden transition-all duration-300"
          >
            {/* Question head */}
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full p-5 text-right flex items-start justify-between gap-4 focus:outline-none cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg shrink-0 ${
                  isOpen ? 'bg-brand-gold text-brand-blue-dark' : 'bg-brand-blue-light/50 text-slate-400'
                }`}>
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h4 className={`text-sm sm:text-base font-extrabold text-right leading-relaxed ${
                  isOpen ? 'text-brand-gold' : 'text-slate-100 hover:text-white'
                }`}>
                  {faq.question}
                </h4>
              </div>
              
              <div className="shrink-0 mt-1">
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-brand-gold" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </button>

            {/* Answer body */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? 'max-h-[300px] border-t border-brand-blue-light/40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 text-xs sm:text-sm text-slate-300 leading-relaxed text-justify bg-brand-blue-dark/20">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
