
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SportCardProps {
  name: string;
  icon: LucideIcon;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

const SportCard: React.FC<SportCardProps> = ({
  name,
  icon: Icon,
  className,
  delay = 0,
  style,
}) => {
  return (
    <div 
      className={cn(
        'flex flex-col items-center p-5 rounded-xl border border-border bg-white hover:shadow-md transition-all duration-300',
        'appear scale-in',
        className
      )}
      style={{ animationDelay: `${delay * 0.1}s`, ...style }}
    >
      <div className="p-3 rounded-full bg-secondary mb-4">
        <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
      </div>
      <span className="font-medium">{name}</span>
    </div>
  );
};

export default SportCard;
