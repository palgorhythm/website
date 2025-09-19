import '../styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Add custom cursor effect
    const cursor = document.createElement('div')
    cursor.className = 'fixed w-6 h-6 rounded-full bg-neon-cyan opacity-50 pointer-events-none z-50 mix-blend-screen transition-transform duration-150 ease-out'
    cursor.style.transform = 'translate(-50%, -50%)'
    document.body.appendChild(cursor)

    const moveCursor = (e) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    document.addEventListener('mousemove', moveCursor)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      document.body.removeChild(cursor)
    }
  }, [])

  return <Component {...pageProps} />
}