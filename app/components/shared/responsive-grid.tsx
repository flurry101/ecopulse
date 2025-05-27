import { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

interface GridCols {
  default: number;
  sm?: number;
  md: number;
  lg: number;
  xl?: number;
}

interface ResponsiveGridProps {
  children: ReactNode;
  cols?: GridCols;
  gap?: number;
  className?: string;
}

export function ResponsiveGrid({ 
  children, 
  cols = { default: 1, md: 2, lg: 3 }, 
  gap = 4, 
  className = "" 
}: ResponsiveGridProps) {
  return (
    <div
      className={cn(
        "grid",
        `grid-cols-${cols.default}`,
        cols.sm && `sm:grid-cols-${cols.sm}`,
        `md:grid-cols-${cols.md}`,
        `lg:grid-cols-${cols.lg}`,
        cols.xl && `xl:grid-cols-${cols.xl}`,
        `gap-${gap}`,
        className
      )}
    >
      {children}
    </div>
  );
}
