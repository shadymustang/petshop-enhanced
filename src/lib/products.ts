export interface Product {
  id: string
  name: string
  short: string
  price: number
  unit: string
  tags: string[]
  img: string
  ingredients: string[]
  stock: number
}

export const PRODUCTS: Product[] = [
  {
    id: 'royal-chicken-feast',
    name: 'Royal Chicken Feast',
    short: 'High-protein, grain-free for adult dogs.',
    price: 599,
    unit: '2kg',
    tags: ['Bestseller', 'Grain-free'],
    img: 'https://images.unsplash.com/photo-1684882726821-2999db517441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZG9nJTIwY2hpY2tlbiUyMGZvb2QlMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3NTk4MzY2OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ingredients: ['Chicken', 'Brown Rice', 'Peas', 'Vitamins'],
    stock: 120
  },
  {
    id: 'silky-coat-salmon-mix',
    name: 'Silky Coat Salmon Mix',
    short: 'Omega-rich recipe for shiny coats.',
    price: 699,
    unit: '2kg',
    tags: ['Premium', 'Omega-3'],
    img: 'https://images.unsplash.com/photo-1756361946762-37ee4040f03d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBmaXNoJTIwcGV0JTIwZm9vZCUyMGhlYWx0aHl8ZW58MXx8fHwxNzU5ODM2NzAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ingredients: ['Salmon', 'Quinoa', 'Flaxseed', 'Vitamins'],
    stock: 80
  },
  {
    id: 'gentle-kitten-blend',
    name: 'Gentle Kitten Blend',
    short: 'Balanced & gentle on growing stomachs.',
    price: 499,
    unit: '1.5kg',
    tags: ['For Kittens', 'Balanced'],
    img: 'https://images.unsplash.com/photo-1759638135966-8e2f4cd5fd4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwa2l0dGVuJTIwY2F0JTIwZm9vZCUyMGJvd2x8ZW58MXx8fHwxNzU5ODM2NzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ingredients: ['Chicken', 'Rice', 'DHA', 'Calcium'],
    stock: 50
  }
]

export const getProducts = (): Product[] => {
  return PRODUCTS
}

export const getProduct = (id: string): Product | undefined => {
  return PRODUCTS.find(p => p.id === id)
}

export const mockCheckout = async (cart: any[], customer: any) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  if (!cart || cart.length === 0) {
    throw new Error('Cart is empty')
  }
  
  const total = cart.reduce((s, item) => s + item.price * item.quantity, 0)
  return {
    orderId: `ORDER-${Date.now()}`,
    total
  }
}