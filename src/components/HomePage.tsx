import { useState } from 'react'
import { motion } from 'motion/react'
import { getProducts, Product } from '../lib/products'
import ProductCard from './ProductCard'
import QuizModal from './QuizModal'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Truck, Heart, Shield, Clock } from 'lucide-react'

interface HomePageProps {
  setCurrentView: (view: string) => void
  setSelectedProduct: (product: Product) => void
}

export default function HomePage({ setCurrentView, setSelectedProduct }: HomePageProps) {
  const [quizOpen, setQuizOpen] = useState(false)
  const products = getProducts().slice(0, 3) // Show first 3 products on homepage

  const heroProduct = products[0]

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setCurrentView('product')
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <h1 className="text-4xl md:text-5xl leading-tight mb-6">
            Premium meals for royally happy pets
          </h1>
          <p className="text-muted-foreground mb-8">
            Tailored recipes, delivered fresh. Nutritionally balanced meals created by pet nutritionists and loved by pets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              onClick={() => setCurrentView('products')}
              className="bg-red-500 hover:bg-red-600"
            >
              Shop Bestsellers
            </Button>
            <Button 
              variant="outline"
              onClick={() => setQuizOpen(true)}
            >
              Get a Free Sample
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Truck className="w-8 h-8 text-red-500" />
                <div>
                  <h4>Fast Delivery</h4>
                  <p className="text-xs text-muted-foreground">Get fresh food before mealtime</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Heart className="w-8 h-8 text-red-500" />
                <div>
                  <h4>Tailored Nutrition</h4>
                  <p className="text-xs text-muted-foreground">Recipes for life stages & allergies</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <Card className="shadow-2xl">
            <CardContent className="p-6">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1695023264743-7f1448deb7f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlciUyMGRvZyUyMGZvb2QlMjBib3dsfGVufDF8fHx8MTc1OTgzNjY5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Happy golden retriever with food bowl"
                className="w-full h-64 object-cover rounded-xl mb-4"
              />

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3>{heroProduct.name}</h3>
                  <p className="text-xs text-muted-foreground">{heroProduct.short}</p>
                </div>
                <div className="text-right">
                  <div>₹{heroProduct.price}</div>
                  <div className="text-xs text-muted-foreground">/ {heroProduct.unit}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button className="bg-red-500 hover:bg-red-600">
                  Add to Cart
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleViewProduct(heroProduct)}
                >
                  Quick View
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="absolute -left-4 -bottom-4 bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg">
            <div className="text-sm font-medium">Free delivery over ₹799</div>
          </div>
        </motion.div>
      </section>

      {/* Popular Picks */}
      <section className="mb-16">
        <h2 className="mb-6">Popular Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewProduct={handleViewProduct}
            />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-r from-background via-red-50 to-background p-8 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="mb-6">How it works</h3>
            <ol className="space-y-4 text-muted-foreground mb-8">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-white text-sm flex items-center justify-center">1</span>
                <div>
                  <strong className="text-foreground">Tell us about your pet</strong> — Age, weight, allergies & preferences.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-white text-sm flex items-center justify-center">2</span>
                <div>
                  <strong className="text-foreground">Get a tailored plan</strong> — We recommend the best meals and portion sizes.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-white text-sm flex items-center justify-center">3</span>
                <div>
                  <strong className="text-foreground">Delivered to your door</strong> — Regular deliveries, flexible pause or cancel options.
                </div>
              </li>
            </ol>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => setQuizOpen(true)}
                className="bg-red-500 hover:bg-red-600"
              >
                Take the Nutrition Quiz
              </Button>
              <Button variant="outline">
                Talk to a Nutritionist
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h4 className="mb-2">Quick quiz — 3 questions</h4>
              <p className="text-sm text-muted-foreground mb-6">
                Get a recommended plan in 30 seconds.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-4 h-4 text-red-500" />
                  <span>Personalized nutrition plan</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span>Takes less than 1 minute</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Recommended by pet nutritionists</span>
                </div>
              </div>

              <Button 
                onClick={() => setQuizOpen(true)}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <QuizModal open={quizOpen} setOpen={setQuizOpen} />
    </main>
  )
}