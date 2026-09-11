import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { EnquiryForm } from '../forms/EnquiryForm';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultProduct,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto" data-lenis-prevent>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-10 overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal-100 bg-kraft-50/50">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 block">
              Direct Manufacturer Enquiry
            </span>
            <h2 className="text-lg font-bold text-charcoal-900">Request a Commercial Quote</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-charcoal-400 hover:text-charcoal-700 hover:bg-charcoal-100 transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto" data-lenis-prevent>
          <EnquiryForm
            defaultProduct={defaultProduct}
            sourcePage="modal_quote"
            className="border-0 p-0 shadow-none"
            onSuccess={() => {
              setTimeout(() => {
                onClose();
              }, 2500);
            }}
          />
        </div>
      </div>
    </div>
  );
};
