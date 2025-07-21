import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-foreground">{question}</span>
        <svg
          className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-45' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-muted-foreground leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
