import { forwardRef } from 'react';
import './Divider.css';

// Типизируем: <ТипЭлемента, ТипПропсов>
export const Divider = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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
);

Divider.displayName = 'Divider'; 
