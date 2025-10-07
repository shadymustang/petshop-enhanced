import { Heart, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Button } from './ui/button'

interface HeaderProps {
  currentView: string
  setCurrentView: (view: string) => void
  setCartOpen: (open: boolean) => void
}

export default function Header({ currentView, setCurrentView, setCartOpen }: HeaderProps) {
  const { state } = useCart()
  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0)

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <button 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center shadow-md">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1>My Royal Pet Care</h1>
            <div className="text-xs text-muted-foreground">Premium Pet Food Delivery</div>
          </div>
        </button>

        <nav className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView('home')} 
            className={`text-sm hover:text-primary transition-colors ${currentView === 'home' ? 'text-primary font-medium' : 'text-muted-foreground'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentView('products')} 
            className={`text-sm hover:text-primary transition-colors ${currentView === 'products' ? 'text-primary font-medium' : 'text-muted-foreground'}`}
          >
            Products
          </button>
          <Button 
            onClick={() => setCartOpen(true)} 
            className="relative bg-red-500 hover:bg-red-600 text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Button>
        </nav>
      </div>
    </header>
  )
}