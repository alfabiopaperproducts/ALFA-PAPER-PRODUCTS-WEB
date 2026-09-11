import React from 'react';

interface SectionHeadingProps {
  pill?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  pill,
  title,
  subtitle,
  align = 'left',
  dark = false,
  className = '',
}) => {
  return (
    <div
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
    >
      {pill && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-3.5 ${
          dark ? 'bg-brand-900/60 text-brand-300 border border-brand-700/50' : 'bg-brand-50 text-brand-700 border border-brand-200'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          {pill}
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight ${
          dark ? 'text-white' : 'text-charcoal-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3.5 text-base sm:text-lg leading-relaxed ${
            dark ? 'text-charcoal-300' : 'text-charcoal-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
