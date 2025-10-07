import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  img: string
  unit: string
  quantity: number
}

interface CartState {
  items: CartItem[]
}

interface CartContextType {
  state: CartState
  dispatch: React.Dispatch<CartAction>
}

type CartAction =
  | { type: 'HYDRATE'; payload: CartState }
  | { type: 'ADD'; payload: CartItem }
  | { type: 'REMOVE'; payload: string }
  | { type: 'UPDATE_QTY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR' }

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i => 
            i.id === action.payload.id 
              ? { ...i, quantity: i.quantity + action.payload.quantity } 
              : i
          )
        }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        )
      }
    case 'CLEAR':
      return { items: [] }
    default:
      throw new Error('Unknown action')
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('royal_cart')
      if (raw) {
        dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) })
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e)
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('royal_cart', JSON.stringify(state))
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e)
    }
  }, [state])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}