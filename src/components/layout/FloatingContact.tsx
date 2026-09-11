import React, { useState } from 'react';
import { MessageSquare, Phone, X, ArrowUpRight } from 'lucide-react';

interface FloatingContactProps {
  onOpenQuote?: () => void;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({ onOpenQuote }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      {/* Expanded Quick Contact Popover */}
      {isOpen && (
        <div className="mb-3 bg-white rounded-2xl shadow-premium border border-charcoal-200/80 p-4 w-[calc(100vw-2rem)] max-w-xs sm:w-72 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-charcoal-100">
            <div>
              <p className="text-xs font-bold text-charcoal-900">Direct Sales Desk</p>
              <p className="text-[11px] text-charcoal-500">ALFA PAPER PRODUCTS</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-charcoal-400 hover:text-charcoal-700 p-1 rounded-full"
              aria-label="Close contact widget"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/919895667040?text=Hello%2C%20I%20am%20interested%20in%20ALFA%20Paper%20Products."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-medium text-xs transition-colors"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat on WhatsApp
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Direct Call */}
            <a
              href="tel:+919895667040"
              className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-charcoal-50 hover:bg-charcoal-100 text-charcoal-800 font-medium text-xs transition-colors"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-600" />
                Call +91 9895667040
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Quote modal trigger */}
            {onOpenQuote && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenQuote();
                }}
                className="w-full text-center py-2 text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                Request Quotation Form →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        aria-label="Contact ALFA Paper Products"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">Enquire Now</span>
      </button>
    </div>
  );
};
