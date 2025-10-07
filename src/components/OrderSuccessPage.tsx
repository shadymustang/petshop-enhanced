import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { CheckCircle, Home, Package, Truck } from 'lucide-react'

interface OrderSuccessPageProps {
  orderId: string
  setCurrentView: (view: string) => void
}

export default function OrderSuccessPage({ orderId, setCurrentView }: OrderSuccessPageProps) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        
        <div>
          <h2 className="mb-4">Order Placed Successfully!</h2>
          <p className="text-muted-foreground">
            Thanks for your order! Your order <strong>{orderId}</strong> is being prepared. 
            We'll message you when it's out for delivery.
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <h4 className="mb-4">What happens next?</h4>
            <div className="space-y-4 text-sm text-left">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>We'll prepare your order with fresh ingredients</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>Your order will be dispatched within 24 hours</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span>You'll receive tracking information via SMS/email</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => setCurrentView('home')}
            className="bg-amber-500 hover:bg-amber-600"
          >
            <Home className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
          <Button variant="outline">
            Track Order
          </Button>
        </div>
      </div>
    </main>
  )
}