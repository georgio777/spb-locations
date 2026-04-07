import { forwardRef, memo } from 'react';
import './Divider.css';

export const Divider = memo(forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div 
        {...props}
        ref={ref} 
        className='divider'
      >
      </div>
    );
  }
));

Divider.displayName = 'Divider'; 
