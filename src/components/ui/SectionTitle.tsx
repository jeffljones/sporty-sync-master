
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  subtitle,
  title,
  description,
  centered = true,
  className,
}) => {
  return (
    <div className={cn(
      'mb-12 space-y-3',
      centered && 'text-center',
      className
    )}>
      {subtitle && (
        <p className="text-sm font-medium uppercase tracking-wider text-primary">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
