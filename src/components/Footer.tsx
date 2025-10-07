import { Button } from './ui/button'
import { Input } from './ui/input'

export default function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock subscription logic
    alert('Thanks for subscribing! You\'ll receive updates about new products and special offers.')
  }

  return (
    <footer className="bg-red-600 text-white mt-12 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-8">
          <div className="md:col-span-1">
            <h4>Ready to treat your pet like royalty?</h4>
            <p className="mt-2 text-sm opacity-90">
              Subscribe and save 12% on your first 3 deliveries.
            </p>
          </div>

          <div className="md:col-span-2">
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-xl md:ml-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white text-slate-900"
                required
              />
              <Button 
                type="submit"
                className="bg-white text-red-600 hover:bg-gray-100"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="text-sm opacity-90 text-center md:text-left">
          © {new Date().getFullYear()} My Royal Pet Care — All rights reserved.
        </div>
      </div>
    </footer>
  )
}