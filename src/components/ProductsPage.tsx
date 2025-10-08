import { getProducts, Product } from '../lib/products'
import ProductCard from './ProductCard'
import { View } from '@/types'

interface ProductsPageProps {
  setCurrentView: React.Dispatch<React.SetStateAction<View>>
  setSelectedProduct: (product: Product) => void
}

export default function ProductsPage({ setCurrentView, setSelectedProduct }: ProductsPageProps) {
  const products = getProducts()

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setCurrentView('product')
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="mb-4">All Products</h1>
        <p className="text-muted-foreground">
          Premium, nutritionally balanced meals for your beloved pets. Each recipe is crafted by pet nutritionists using high-quality ingredients.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onViewProduct={handleViewProduct}
          />
        ))}
      </div>
    </main>
  )
}