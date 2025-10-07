import '../styles/globals.css'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

function MyApp({ Component, pageProps, router }) {
  // Optional: prevent layout shift during route change on first load
  useEffect(()=>{ if(typeof window !== 'undefined'){ document.documentElement.style.scrollBehavior = 'auto'; setTimeout(()=>{ document.documentElement.style.scrollBehavior = '' },50)} },[])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={router.route}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.32 }}
        style={{ minHeight: '100vh' }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  )
}

export default MyApp
