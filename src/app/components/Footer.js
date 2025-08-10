'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ArrowUp
} from 'lucide-react'
import Image from 'next/image'

const AnimatedFooter = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const footerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer
      ref={footerRef}
      className='relative bg-black text-white overflow-hidden'
    >
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900'>
        <div
          className={`absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 transition-opacity duration-2000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className='absolute inset-0 overflow-hidden'>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white/20 rounded-full transition-all duration-1000 ${
              isVisible ? 'animate-pulse' : 'opacity-0'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 py-20'>
        <div
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className='text-4xl font-light mb-4 bg-white bg-clip-text text-transparent'>
            Stay Connected
          </h2>
          <p className='text-slate-200 mb-8 max-w-md mx-auto'>
            Subscribe to our newsletter for the latest updates and exclusive
            content.
          </p>

          <div className='flex max-w-md mx-auto gap-3 border rounded-full'>
            <div className='flex-1 relative group'>
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Enter your email'
                className='w-full px-6 py-4  rounded-full text-white transition-all duration-300 backdrop-blur-sm'
              />
            </div>
            <button
              onClick={handleSubmit}
              style={{
                background:
                  'linear-gradient(90deg, #a88a00 0%, #ffd700 25%, #fffacd 50%, #ffd700 75%, #a88a00 100%)'
              }}
              className='px-8 m-2 py-2 rounded-full text-black font-medium transition-all duration-300 transform hover:scale-105 shadow-lg'
            >
              Subscribe
            </button>
          </div>
        </div>

        <div
          className={`w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          }`}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16'>
          <div
            className={`transition-all duration-1000 delay-500 transform ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            <Image
              src='/images/logo.png'
              alt='Wedding Planet Logo'
              width={120}
              height={40}
              className='object-contain  mix-blend-lighten'
            />
            <p className='text-slate-400 mb-6 leading-relaxed'>
              Capturing your best moments under your budget but along with
              delivering results beyond your expectations.
            </p>
            <div className='flex space-x-4'>
              {[Github, Linkedin, Twitter, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href='#'
                  className='w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-purple-500/20 hover:scale-110 transition-all duration-300 group'
                >
                  <Icon className='w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300' />
                </a>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-700 transform ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            <h3 className='text-lg font-semibold mb-6 text-white'>
              Quick Links
            </h3>
            <ul className='space-y-3'>
              {['Images', 'Blog', 'Contact Us'].map((link, index) => (
                <li key={index}>
                  <a
                    href='#'
                    className='text-slate-400 hover:text-white transition-colors duration-300 relative group'
                  >
                    {link}
                    <span className='absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300' />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`transition-all duration-1000 delay-900 transform ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            <h3 className='text-lg font-semibold mb-6 text-white'>Services</h3>
            <ul className='space-y-3'>
              {['Wedding', 'Pre-wedding', 'Cinematography'].map(
                (service, index) => (
                  <li key={index}>
                    <a
                      href='#'
                      className='text-slate-400 hover:text-white transition-colors duration-300 relative group'
                    >
                      {service}
                      <span className='absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300' />
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div
            className={`transition-all duration-1000 delay-1100 transform ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            <h3 className='text-lg font-semibold mb-6 text-white'>
              Get in Touch
            </h3>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3 group'>
                <Mail className='w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300' />
                <span className='text-slate-400 group-hover:text-white transition-colors duration-300'>
                  weddingphotoplanet@gmail.com
                </span>
              </div>
              <div className='flex items-center space-x-3 group'>
                <Phone className='w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300' />
                <span className='text-slate-400 group-hover:text-white transition-colors duration-300'>
                  9990905195
                </span>
              </div>
              <div className='flex items-center space-x-3 group'>
                <MapPin className='w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300' />
                <span className='text-slate-400 group-hover:text-white transition-colors duration-300'>
                  D-14, Old No.12-A Third Floor, Back Side Main, near Royal
                  Enfield Bike Showroom, Uttam nagar, Madhu Vihar, New Delhi,
                  Delhi, 110059
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`border-t border-white/10 pt-8 transition-all duration-1000 delay-1300 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-slate-400 text-sm mb-4 md:mb-0'>
              © 2025 Wedding Photo Planet. All rights reserved.
            </p>
            <div className='flex space-x-6 text-sm'>
              <a
                href='#'
                className='text-slate-400 hover:text-white transition-colors duration-300'
              >
                Privacy Policy
              </a>
              <a
                href='#'
                className='text-slate-400 hover:text-white transition-colors duration-300'
              >
                Terms of Service
              </a>
              <a
                href='#'
                className='text-slate-400 hover:text-white transition-colors duration-300'
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r border from-slate-900 to-slate-950 rounded-full flex items-center cursor-pointer justify-center text-white hover:from-slate-700 hover:to-slate-800 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-purple-500/25 z-20 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
        style={{ transitionDelay: '1500ms' }}
      >
        <ArrowUp className='w-5 h-5' />
      </button>
    </footer>
  )
}

export default AnimatedFooter
