import React, { useState } from 'react'
import Url_Shortner_form from './Url_Shortner_form'
import Login from './Login'
import Register from './Register'

const Home = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  if (showLogin) {
    return <Login />
  }
  if (showRegister) {
    return <Register />
  }

  return (
     <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4 relative">
      <div className="absolute top-6 right-8 flex gap-4 z-10">
        <button
          className="bg-white/20 text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-white/30 transition-all duration-200"
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
        <button
          className="bg-white/20 text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-white/30 transition-all duration-200"
          onClick={() => setShowRegister(true)}
        >
          Register
        </button>
      </div>
      <div className="relative w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">URL Shortener</h1>
          <p className="text-white/80">Transform your long URLs into short, shareable links</p>
        </div>
        <Url_Shortner_form/>
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            Fast, secure, and reliable URL shortening service
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home