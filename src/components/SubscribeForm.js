import React, { useState } from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'

const SubscribeForm = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await addToMailchimp(email)
      console.log('Mailchimp result:', result)
      
      if (result.result === 'success') {
        setStatus('✨ Successfully subscribed!')
        setEmail('')
      } else {
        if (result.msg.includes('already subscribed')) {
          setStatus('This email is already subscribed!')
        } else if (result.msg.includes('invalid')) {
          setStatus('Please enter a valid email address.')
        } else {
          setStatus('Something went wrong. Please try again.')
        }
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setStatus('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <p className="text-center text-xs text-gray-400 mb-2">
        Subscribe to get future posts via email
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md 
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-gray-600 focus:border-transparent"
            disabled={isLoading}
            required
          />
          
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 text-white rounded-md whitespace-nowrap transition-colors
              ${isLoading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gray-700 hover:bg-gray-600'
              }`}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>

        {status && (
          <div className={`text-center text-sm p-2 rounded mt-2 ${
            status.includes('Successfully')
              ? 'text-green-400'
              : 'text-red-400'
          }`}>
            {status}
          </div>
        )}
      </form>
    </div>
  )
}

export default SubscribeForm