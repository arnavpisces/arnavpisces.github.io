import React from 'react'
import { Helmet } from 'react-helmet'
import '../styles/global.css'
import '../styles/prism-theme.css'

export default function Layout({ children }) {
  return (
    <>
      <Helmet>
        <html lang='en' />
        <meta charSet='utf-8' />
        <title>Arnav Kumar</title>
        <meta name="description" content="i just need a place to write" />
        <meta name="keywords" content="arnav kumar, arnav pisces, personal blog" />
        <meta name="author" content="@arnavpisces" />
      </Helmet>
      <div className="min-h-screen" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
        {children}
      </div>
    </>
  )
}