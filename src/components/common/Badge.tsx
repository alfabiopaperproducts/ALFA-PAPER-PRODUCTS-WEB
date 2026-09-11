import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'kraft' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'green',
  size = 'md',
  icon,
  className = '',
}) => {
  const variantStyles = {
    green: 'bg-brand-50 text-brand-700 border-brand-200/80',
    kraft: 'bg-kraft-100 text-kraft-900 border-kraft-300/80',
    neutral: 'bg-charcoal-50 text-charcoal-700 border-charcoal-200',
    outline: 'bg-transparent text-charcoal-700 border-charcoal-300',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
