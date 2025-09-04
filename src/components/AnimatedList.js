import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import './MagicBento.css'

const MagicBentoCard = ({ node, index, isVisible }) => {
  const cardRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const rafRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isHovered) return
    
    // Cancel previous animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
    
    // Use requestAnimationFrame for smooth updates
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return
      
      const rect = cardRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      
      setMousePosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
    })
  }

  const handleMouseEnter = (e) => {
    setIsHovered(true)
    handleMouseMove(e)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 50, y: 50 })
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
    }
  }

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div
      className={`transform transition-all duration-700 ease-out ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      }`}
      style={{
        transitionDelay: `${index * 50}ms`
      }}
    >
      <article 
        ref={cardRef}
        className="mb-12 w-full max-w-3xl magic-bento rounded-2xl"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`,
        }}
      >
        <div className="magic-bento-content p-4 rounded-2xl">
          <div className="magic-shimmer"></div>
          <Link to={node.fields.slug} className="no-underline">
            <div className="transition relative z-10">
              <time className="text-gray-400 text-sm text-center block uppercase">
                {node.frontmatter.date}
              </time>
              <h2 className="text-3xl font-bold text-white mt-1 mb-3 text-center hover:text-gray-200 transition-colors">
                {node.frontmatter.title}
              </h2>
              <p className="text-gray-300 mb-3 text-left text-lg">
                {node.excerpt}
              </p>
              <div className="flex justify-end">
                <span className="text-gray-400 hover:text-white transition-all uppercase text-sm font-medium flex items-center">
                  READ MORE
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </article>
    </div>
  )
}

const AnimatedList = ({ posts }) => {
  const [visibleItems, setVisibleItems] = useState([])

  useEffect(() => {
    // Animate items in with staggered delay
    posts.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index])
      }, index * 150) // 150ms delay between each item
    })
  }, [posts])

  return (
    <div className="space-y-6">
      {posts.map(({ node }, index) => (
        <MagicBentoCard 
          key={node.id}
          node={node}
          index={index}
          isVisible={visibleItems.includes(index)}
        />
      ))}
    </div>
  )
}

export default AnimatedList