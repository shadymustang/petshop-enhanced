"use client"

import { Product } from '../lib/products'
import { useCart } from '../context/CartContext'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { ArrowLeft, Star, Shield, Truck } from 'lucide-react'
import { toast } from 'sonner'

interface ProductDetailPageProps {
  product: Product
  setCurrentView: (view: string) => void
}

export default function ProductDetailPage({ product, setCurrentView }: ProductDetailPageProps) {
  const { dispatch } = useCart()

  const addToCart = () => {
    dispatch({
      type: 'ADD',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        unit: product.unit,
        quantity: 1
      }
    })
    toast.success('Added to cart!')
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <Button 
        variant="ghost" 
        onClick={() => setCurrentView('products')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ImageWithFallback
            src={product.img}
            alt={product.name}
            className="rounded-2xl w-full h-96 object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-4">{product.short}</p>
            
            <div className="flex items-center gap-2 mb-4">
              {product.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-red-100 text-red-700"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="text-3xl mb-6">
              ₹{product.price} 
              <span className="text-sm text-muted-foreground ml-2">/ {product.unit}</span>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <h4 className="mb-3">Ingredients</h4>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Star className="w-4 h-4 text-amber-500" />
              <span>Nutritionist approved recipe</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-4 h-4 text-amber-500" />
              <span>No artificial preservatives</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Truck className="w-4 h-4 text-amber-500" />
              <span>Free delivery on orders over ₹799</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={addToCart}
              className="flex-1 bg-amber-500 hover:bg-amber-600"
            >
              Add to Cart
            </Button>
            <Button variant="outline" className="flex-1">
              Subscribe & Save 15%
            </Button>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Stock available</span>
                <span className="text-sm text-muted-foreground">{product.stock} units</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}