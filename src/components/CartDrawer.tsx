"use client"

import { useCart } from '../context/CartContext'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Minus, Plus, Trash2 } from 'lucide-react'

import { View } from '@/types'

interface CartDrawerProps {
  open: boolean
  setOpen: (open: boolean) => void
  setCurrentView: React.Dispatch<React.SetStateAction<View>>
}

export default function CartDrawer({ open, setOpen, setCurrentView }: CartDrawerProps) {
  const { state, dispatch } = useCart()

  const total = state.items.reduce((s, i) => s + i.price * i.quantity, 0)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE', payload: id })
    } else {
      dispatch({ type: 'UPDATE_QTY', payload: { id, quantity: newQuantity } })
    }
  }

  const goToCheckout = () => {
    setOpen(false)
    setCurrentView('checkout')
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-96">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {state.items.length === 0 && (
            <div className="text-sm text-muted-foreground text-center py-8">
              Your cart is empty.
            </div>
          )}
          
          {state.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <ImageWithFallback 
                src={item.img} 
                alt={item.name}
                className="w-16 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <h4>{item.name}</h4>
                <div className="text-xs text-muted-foreground">{item.unit}</div>
                <div className="text-sm">₹{item.price}</div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 p-0"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 p-0"
                >
                  <Plus className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => dispatch({ type: 'REMOVE', payload: item.id })}
                  className="w-8 h-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {state.items.length > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={goToCheckout} 
                className="w-full bg-red-500 hover:bg-red-600"
                disabled={state.items.length === 0}
              >
                Checkout
              </Button>
              <Button 
                variant="outline" 
                onClick={() => dispatch({ type: 'CLEAR' })}
                className="w-full"
              >
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}