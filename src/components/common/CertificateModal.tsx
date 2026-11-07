import React, { useEffect, useState } from 'react';
import { X, FileText, Loader2, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: {
    title: string;
    url: string;
  } | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setLoading(true);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !certificate) return null;

  const encodedUrl = encodeURI(certificate.url);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl z-10 overflow-hidden my-4 max-h-[92vh] flex flex-col border border-charcoal-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header - Only Title and Close (X) button */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-charcoal-100 bg-kraft-50/70">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 block">
                Official Compliance Certificate
              </span>
              <h2 id="certificate-modal-title" className="text-base sm:text-lg font-bold text-charcoal-900 truncate">
                {certificate.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-charcoal-400 hover:text-charcoal-700 hover:bg-charcoal-100 transition-colors"
              aria-label="Close certificate viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body with hidden toolbars to restrict download/print options */}
        <div className="relative flex-1 bg-charcoal-900/5 min-h-[60vh] sm:min-h-[72vh] flex flex-col">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 z-10 backdrop-blur-xs">
              <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
              <p className="text-xs font-semibold text-charcoal-600">Loading certificate preview...</p>
            </div>
          )}

          <iframe
            src={`${encodedUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            title={certificate.title}
            className="w-full flex-1 border-0"
            onLoad={() => setLoading(false)}
          />
        </div>

        {/* Footer info - Protected document notice */}
        <div className="px-5 py-3 border-t border-charcoal-100 bg-white flex items-center justify-between gap-2 text-xs text-charcoal-500">
          <span className="flex items-center gap-1.5 font-medium text-charcoal-600">
            <ShieldCheck className="w-4 h-4 text-brand-600 flex-shrink-0" />
            <span>Protected Official Document • View Only</span>
          </span>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-charcoal-200 text-charcoal-700 hover:bg-charcoal-100 font-semibold transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
