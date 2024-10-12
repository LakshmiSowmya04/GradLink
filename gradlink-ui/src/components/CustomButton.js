import React from 'react';
import * as LucideIcons from 'lucide-react';
import '../styles/CustomButton.css';

const Button = ({ children, variant = 'default', size = 'default', ...props }) => {
  const className = `button ${variant} ${size}`;
  
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

const CustomButton = ({ icon, ...props }) => {
  const IconComponent = LucideIcons[icon];

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in Lucide icons`);
    return null;
  }

  return (
    <Button variant="ghost" size="icon" {...props}>
      <IconComponent className="icon" />
    </Button>
  );
};

export default CustomButton;