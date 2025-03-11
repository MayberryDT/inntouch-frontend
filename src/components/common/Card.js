import React from 'react';
import { 
  Card as MuiCard, 
  CardContent, 
  CardHeader, 
  CardActions, 
  CardMedia,
  Typography,
  Divider
} from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Custom Card component that wraps Material-UI Card with consistent styling
 * 
 * @param {Object} props - Component props
 * @returns {React.ReactNode} The Card component
 */
const Card = ({ 
  children,
  title,
  subheader,
  headerAction,
  media,
  mediaHeight = 140,
  actions,
  elevation = 2,
  sx = {},
  ...rest 
}) => {
  // Define base styles
  const baseStyles = {
    borderRadius: '8px',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };
  
  // Combine all styles
  const combinedSx = {
    ...baseStyles,
    ...sx,
  };
  
  return (
    <MuiCard elevation={elevation} sx={combinedSx} {...rest}>
      {title && (
        <>
          <CardHeader
            title={title}
            subheader={subheader}
            action={headerAction}
            titleTypographyProps={{ variant: 'h6' }}
            subheaderTypographyProps={{ variant: 'body2' }}
          />
          <Divider />
        </>
      )}
      
      {media && (
        <CardMedia
          component="img"
          height={mediaHeight}
          image={media}
          alt={title || 'Card media'}
        />
      )}
      
      <CardContent sx={{ flexGrow: 1 }}>
        {children}
      </CardContent>
      
      {actions && (
        <>
          <Divider />
          <CardActions>
            {actions}
          </CardActions>
        </>
      )}
    </MuiCard>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
  subheader: PropTypes.node,
  headerAction: PropTypes.node,
  media: PropTypes.string,
  mediaHeight: PropTypes.number,
  actions: PropTypes.node,
  elevation: PropTypes.number,
  sx: PropTypes.object,
};

export default Card; 