import React, { useState, useEffect } from 'react'
import './FuzzyText.css'

const FuzzyText = ({ text, className = '', delay = 0 }) => {
  const [displayText, setDisplayText] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true)
      animateText()
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay])

  const animateText = () => {
    let iteration = 0
    const targetText = text
    
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            
            if (index < iteration) {
              return targetText[index]
            }
            
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join('')
      )
      
      if (iteration >= targetText.length) {
        clearInterval(interval)
        setIsAnimating(false)
      }
      
      iteration += 1 / 3
    }, 30)
  }

  return (
    <span className={`fuzzy-text ${isAnimating ? 'animating' : ''} ${className}`}>
      {displayText || text}
    </span>
  )
}

export default FuzzyText