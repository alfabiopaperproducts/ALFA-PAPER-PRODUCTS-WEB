import React from 'react';

interface FloatingContactProps {
  onOpenQuote?: () => void;
}

export const FloatingContact: React.FC<FloatingContactProps> = () => {
  const whatsappUrl =
    'https://wa.me/919895667040?text=Hello%20ALFA%20Paper%20Products%2C%20I%20am%20interested%20in%20your%20paper%20packaging%20products.';

  return (
    <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 group">
      {/* Hover Tooltip / Pill on Desktop */}
      <div className="hidden lg:flex items-center absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <div className="bg-charcoal-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap flex items-center gap-1.5 border border-charcoal-700">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>Chat on WhatsApp</span>
        </div>
      </div>

      {/* Main Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect directly with ALFA Paper Products on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Soft pulse ripple ring */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none group-hover:opacity-0"
          style={{ animationDuration: '2.5s' }}
        />

        {/* Authentic WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-xs"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.72.78 5.26 2.14 7.42L2.5 29.5l6.32-1.62C10.9 29.14 13.38 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.64c-2.3 0-4.46-.68-6.28-1.84l-.46-.28-4.22 1.08 1.12-4.1-.3-.48C4.58 20.14 4 18.12 4 16 4 9.38 9.38 4 16 4s12 5.38 12 12-5.38 11.64-12 11.64zm6.6-8.74c-.36-.18-2.14-1.06-2.48-1.18-.32-.12-.56-.18-.8.18-.24.36-.92 1.18-1.14 1.42-.2.24-.42.28-.78.1-.36-.18-1.52-.56-2.9-1.8-1.08-.96-1.8-2.14-2.02-2.5-.2-.36-.02-.56.16-.74.16-.16.36-.42.54-.62.18-.2.24-.36.36-.6.12-.24.06-.44-.02-.62-.1-.18-.8-1.92-1.1-2.64-.3-.7-.58-.6-.8-.62-.2-.02-.44-.02-.68-.02-.24 0-.62.1-.94.44-.32.36-1.24 1.22-1.24 2.96s1.28 3.44 1.46 3.68c.18.24 2.5 3.82 6.06 5.36.84.36 1.5.58 2.02.74.86.28 1.64.24 2.26.14.7-.1 2.14-.88 2.44-1.72.3-.84.3-1.56.22-1.72-.1-.14-.3-.24-.66-.42z" />
        </svg>
      </a>
    </aside>
  );
};
