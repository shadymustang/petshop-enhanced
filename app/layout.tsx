import './globals.css'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Royal Pet Care'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
