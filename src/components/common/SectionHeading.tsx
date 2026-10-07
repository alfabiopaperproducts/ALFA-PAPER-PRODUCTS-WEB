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
