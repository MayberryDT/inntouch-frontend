import React from 'react';
import { TextField as MuiTextField } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Custom TextField component that wraps Material-UI TextField with consistent styling
 * 
 * @param {Object} props - Component props
 * @returns {React.ReactNode} The TextField component
 */
const TextField = ({ 
  id,
  name,
  label,
  value,
  onChange,
  type = 'text',
  variant = 'outlined',
  size = 'medium',
  fullWidth = true,
  required = false,
  disabled = false,
  error = false,
  helperText = '',
  placeholder = '',
  autoComplete = '',
  autoFocus = false,
  multiline = false,
  rows = 1,
  sx = {},
  InputProps = {},
  ...rest 
}) => {
  // Define base styles
  const baseStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: '2px',
        },
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: size === 'small' ? '0.875rem' : '1rem',
    },
    '& .MuiInputBase-input': {
      fontSize: size === 'small' ? '0.875rem' : '1rem',
    },
  };
  
  // Combine all styles
  const combinedSx = {
    ...baseStyles,
    ...sx,
  };
  
  return (
    <MuiTextField
      id={id}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      required={required}
      disabled={disabled}
      error={error}
      helperText={helperText}
      placeholder={placeholder}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      multiline={multiline}
      rows={rows}
      sx={combinedSx}
      InputProps={InputProps}
      {...rest}
    />
  );
};

TextField.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  type: PropTypes.string,
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  size: PropTypes.oneOf(['small', 'medium']),
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  sx: PropTypes.object,
  InputProps: PropTypes.object,
};

export default TextField; 