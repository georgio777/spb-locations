import React from 'react';
import './ToolButton.css';

interface ToolButtonProps {
  role?: string;
  title?: string;
  ariaLabel?: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const ToolButton = ({
  children, 
  onClick = () => {},
  style = {},
  className = '',
  ariaLabel = '',
  title = '',
  role
}: ToolButtonProps) => {
  return (
    <button 
    className={`tool-button ${className}`} 
    style={style} 
    onClick={onClick} 
    aria-label={ariaLabel}
    title={title}
    role={role}
    >
      {children}
    </button>
  );
};
