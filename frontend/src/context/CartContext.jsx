import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Error parsing saved cart:', err);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (attraction) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.attractionId === (attraction._id || attraction.id));
      
      if (existingItem) {
        // Item already in cart, return existing items
        return prevItems;
      }
      
      // Add new item with default ticket counts
      return [...prevItems, {
        attractionId: attraction._id || attraction.id,
        attraction: attraction,
        tickets: {
          adult: 2,
          child: 0,
          seniorCitizen: 0,
          foreignNationals: 0
        },
        price: attraction.price || 0,
        selectedDate: null
      }];
    });
  };

  const removeFromCart = (attractionId) => {
    setCartItems(prevItems => prevItems.filter(item => item.attractionId !== attractionId));
  };

  const updateTicketCount = (attractionId, ticketType, count) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.attractionId === attractionId
          ? {
              ...item,
              tickets: {
                ...item.tickets,
                [ticketType]: Math.max(0, count)
              }
            }
          : item
      )
    );
  };

  const setSelectedDate = (attractionId, date) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.attractionId === attractionId
          ? { ...item, selectedDate: date }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Calculate price based on ticket types and base price
      const basePrice = item.price || 0;
      const ticketCount = item.tickets.adult + item.tickets.child + 
                         item.tickets.seniorCitizen + item.tickets.foreignNationals;
      
      // Simple calculation: base price per ticket
      // You can adjust this based on your pricing logic
      return total + (basePrice * ticketCount || 200); // Default to 200 if no price
    }, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateTicketCount,
        setSelectedDate,
        calculateTotal,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

