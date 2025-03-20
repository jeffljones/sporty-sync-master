
import React from 'react';
import { cn } from '@/lib/utils';

interface FormatCardProps {
  title: string;
  description: string;
  features: string[];
  className?: string;
  delay?: number;
}

const FormatCard: React.FC<FormatCardProps> = ({
  title,
  description,
  features,
  className,
  delay = 0,
}) => {
  return (
    <div 
      className={cn(
        'p-6 rounded-2xl border border-border bg-white hover:shadow-md transition-all duration-300',
        'appear scale-in',
        className
      )}
      style={{ animationDelay: `${delay * 0.1}s` }}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormatCard;
