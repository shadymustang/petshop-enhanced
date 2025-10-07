import { Product } from '../lib/products'
import { useCart } from '../context/CartContext'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { motion } from 'motion/react'

interface ProductCardProps {
  product: Product
  onViewProduct: (product: Product) => void
}

export default function ProductCard({ product, onViewProduct }: ProductCardProps) {
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
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-5">
          <div className="h-40 rounded-lg overflow-hidden mb-4">
            <ImageWithFallback
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3>{product.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{product.short}</p>
            </div>
            <div className="text-right ml-3">
              <div>₹{product.price}</div>
              <div className="text-xs text-muted-foreground">{product.unit}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            {product.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-red-100 text-red-700 hover:bg-red-200"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => onViewProduct(product)}
              className="flex-1"
            >
              View Details
            </Button>
            <Button 
              onClick={addToCart}
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}