
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  style?: React.CSSProperties;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  className,
  iconClassName,
  style,
}) => {
  return (
    <div 
      className={cn(
        'p-6 rounded-2xl transition-all duration-300 hover:shadow-md bg-white border border-border',
        'appear scale-in',
        className
      )}
      style={style}
    >
      <div className={cn(
        'flex-center h-12 w-12 rounded-xl mb-5 bg-primary/10',
        iconClassName
      )}>
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
