import React, { useState, useEffect } from 'react'
import axios from 'axios'
import axiosInstance from '../utils/axiosInstance'

const Url_Shortner_form = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [showQrCode, setShowQrCode] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)

    try {
      const data=await axiosInstance.post('/create', { fullUrl: url })
      console.log(data)
      setShortUrl(data.short_url)
      setQrCodeUrl(data.qrCode)

    } catch (error) {
      console.log('Error shortening URL:', error)
    } finally {

      setIsLoading(false)
    }
  }
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const resetForm = () => {
    setUrl('')
    setShortUrl('')
    setCopied(false)
    setQrCodeUrl('')
    setShowQrCode(false)
  }

  const downloadQrCode = () => {
    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = 'qr-code.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="url" className="block text-sm font-medium text-white/90">
                Enter your URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
                  required
                />

              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading || !url}
              className="w-full bg-white text-purple-600 font-semibold py-3 px-6 rounded-xl hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-purple-600/30 border-t-purple-600 rounded-full animate-spin"></div>
                  <span>Shortening...</span>
                </div>
              ) : (
                
                'Shorten URL'
              )}
            </button>
          </form>

 
          {shortUrl && (
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Your shortened URL</h3>
                <button
                  onClick={resetForm}
                  className="text-white/60 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                  <p className="text-white font-mono text-sm break-all">{shortUrl}</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => setShowQrCode(!showQrCode)}
                  className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                  title="Toggle QR Code"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-6a3 3 0 013-3h4a3 3 0 013 3v6zm0 0h6v-6a3 3 0 00-3-3h-4a3 3 0 00-3 3v6z" />
                  </svg>
                </button>
              </div>

              {showQrCode && qrCodeUrl && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center">
                  <h4 className="text-white font-semibold mb-3">QR Code</h4>
                  <div className="flex justify-center mb-4">
                    <div className="bg-white p-3 rounded-lg">
                      <img
                        src={qrCodeUrl}
                        alt="QR Code"
                        className="w-32 h-32"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={downloadQrCode}
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              )}
              {copied && (
                <div className="mt-3 text-center">
                  <span className="inline-flex items-center px-3 py-1 bg-green-500/20 text-green-100 text-sm rounded-full">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied to clipboard!
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
  )
}

export default Url_Shortner_form
