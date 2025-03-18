import React, { createContext, useContext, useReducer } from 'react';

// Create context
const CartContext = createContext();

// Initial state
const initialState = {
  items: [],
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Check if item already exists in cart
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return { ...state, items: updatedItems };
      } else {
        // Item doesn't exist, add new item
        return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
      }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        )
      };
    
    case 'UPDATE_NOTES':
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id 
            ? { ...item, notes: action.payload.notes } 
            : item
        )
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Actions
  const addToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  
  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };
  
  const updateQuantity = (itemId, quantity) => {
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id: itemId, quantity: parseInt(quantity, 10) } 
    });
  };
  
  const updateNotes = (itemId, notes) => {
    dispatch({ 
      type: 'UPDATE_NOTES', 
      payload: { id: itemId, notes } 
    });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateNotes,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext; 