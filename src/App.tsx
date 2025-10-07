import { useState } from 'react'
import { CartProvider } from './context/CartContext'
import { Product } from './lib/products'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import HomePage from './components/HomePage'
import ProductsPage from './components/ProductsPage'
import ProductDetailPage from './components/ProductDetailPage'
import CheckoutPage from './components/CheckoutPage'
import OrderSuccessPage from './components/OrderSuccessPage'
import { Toaster } from './components/ui/sonner'

type View = 'home' | 'products' | 'product' | 'checkout' | 'order-success'

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [orderId, setOrderId] = useState('')

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage setCurrentView={setCurrentView} setSelectedProduct={setSelectedProduct} />
      case 'products':
        return <ProductsPage setCurrentView={setCurrentView} setSelectedProduct={setSelectedProduct} />
      case 'product':
        return selectedProduct ? (
          <ProductDetailPage product={selectedProduct} setCurrentView={setCurrentView} />
        ) : null
      case 'checkout':
        return <CheckoutPage setCurrentView={setCurrentView} setOrderId={setOrderId} />
      case 'order-success':
        return <OrderSuccessPage orderId={orderId} setCurrentView={setCurrentView} />
      default:
        return <HomePage setCurrentView={setCurrentView} setSelectedProduct={setSelectedProduct} />
    }
  }

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          setCartOpen={setCartOpen} 
        />
        
        <div className="flex-1">
          {renderCurrentView()}
        </div>
        
        <Footer />
        
        <CartDrawer 
          open={cartOpen} 
          setOpen={setCartOpen} 
          setCurrentView={setCurrentView} 
        />
        
        <Toaster />
      </div>
    </CartProvider>
  )
}