"use client"

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { mockCheckout } from '../lib/products'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react'
import { toast } from 'sonner'

interface CheckoutPageProps {
  setCurrentView: (view: string) => void
  setOrderId: (orderId: string) => void
}

interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
}

export default function CheckoutPage({ setCurrentView, setOrderId }: CheckoutPageProps) {
  const { state, dispatch } = useCart()
  const [loading, setLoading] = useState(false)
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const subtotal = state.items.reduce((s, i) => s + i.price * i.quantity, 0)
  const deliveryFee = subtotal >= 799 ? 0 : 50
  const total = subtotal + deliveryFee

  const updateCustomer = (field: keyof CustomerInfo, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }))
  }

  const isFormValid = customer.name && customer.email && customer.phone && customer.address

  const placeOrder = async () => {
    if (!isFormValid) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const orderData = await mockCheckout(state.items, customer)
      dispatch({ type: 'CLEAR' })
      setOrderId(orderData.orderId)
      setCurrentView('order-success')
      toast.success('Order placed successfully!')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (state.items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h2 className="mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Add some products to your cart before proceeding to checkout.
        </p>
        <Button onClick={() => setCurrentView('products')}>
          Browse Products
        </Button>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Button 
        variant="ghost" 
        onClick={() => setCurrentView('home')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>

      <h2 className="mb-8">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={customer.name}
                onChange={(e) => updateCustomer('name', e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={customer.email}
                onChange={(e) => updateCustomer('email', e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={customer.phone}
                onChange={(e) => updateCustomer('phone', e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea
                id="address"
                value={customer.address}
                onChange={(e) => updateCustomer('address', e.target.value)}
                className="mt-1"
                rows={4}
                required
              />
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-4 h-4 text-amber-500" />
                <span>Free delivery on orders over ₹799</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-4 h-4 text-amber-500" />
                <span>Secure payment processing</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CreditCard className="w-4 h-4 text-amber-500" />
                <span>Multiple payment options</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {state.items.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <ImageWithFallback
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h4>{item.name}</h4>
                  <div className="text-xs text-muted-foreground">{item.unit}</div>
                </div>
                <div className="text-right">
                  <div>₹{item.price} × {item.quantity}</div>
                  <div>₹{item.price * item.quantity}</div>
                </div>
              </div>
            ))}

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <Button
              onClick={placeOrder}
              disabled={loading || !isFormValid}
              className="w-full bg-amber-500 hover:bg-amber-600 mt-6"
            >
              {loading ? 'Placing Order...' : `Place Order - ₹${total}`}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By placing this order, you agree to our terms and conditions.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}