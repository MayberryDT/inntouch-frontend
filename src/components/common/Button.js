import React from 'react';
import { Button as MuiButton } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Custom Button component that wraps Material-UI Button with consistent styling
 * 
 * @param {Object} props - Component props
 * @returns {React.ReactNode} The Button component
 */
const Button = ({ 
  children, 
  variant = 'contained', 
  color = 'primary', 
  size = 'medium',
  fullWidth = false,
  disabled = false,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
  sx = {},
  ...rest 
}) => {
  // Define base styles based on variant
  const baseStyles = {
    borderRadius: '4px',
    textTransform: 'none',
    fontWeight: 500,
    boxShadow: variant === 'contained' ? 1 : 'none',
    '&:hover': {
      boxShadow: variant === 'contained' ? 2 : 'none',
    },
  };
  
  // Define size-specific styles
  const sizeStyles = {
    small: {
      py: 0.5,
      px: 1.5,
      fontSize: '0.875rem',
    },
    medium: {
      py: 1,
      px: 2,
      fontSize: '1rem',
    },
    large: {
      py: 1.5,
      px: 3,
      fontSize: '1.125rem',
    },
  };
  
  // Combine all styles
  const combinedSx = {
    ...baseStyles,
    ...sizeStyles[size],
    ...sx,
  };
  
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      type={type}
      sx={combinedSx}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error', 'info', 'warning']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  sx: PropTypes.object,
};

export default Button; 