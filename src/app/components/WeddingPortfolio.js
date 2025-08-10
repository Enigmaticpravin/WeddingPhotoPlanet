'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Camera,
  Heart,
  Star
} from 'lucide-react'
import Image from 'next/image'
import divider from '@/../public/images/divider.webp'
import weddingImage from '@/../public/images/secondhead.jpg'
import headthree from '@/../public/images/headthree.jpg'
import headlast from '@/../public/images/headlast.jpg'
import dynamic from 'next/dynamic'

const CreativeWeddingServices = dynamic(() => import('./CreativeWeddingServices'), { ssr: false })
const MinimalGallery = dynamic(() => import('./MinimalGallery'), { ssr: false })
const AnimatedFooter = dynamic(() => import('./Footer'), { ssr: false })
const ScrollReviewCards = dynamic(() => import('./ScrollReviewCards'), { ssr: false })
const WhyChooseUs = dynamic(() => import('./WhyChooseUs'), { ssr: false })
const CandidPhotographyUI = dynamic(() => import('./CandidPhotographyUI'), { ssr: false })

export default function WeddingPortfolio () {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHeroMode, setIsHeroMode] = useState(true)
  const [isVisible, setIsVisible] = useState({})
  const heroRef = useRef(null)
  const wheelRef = useRef(null)

  const wheelAccumulator = useRef(0)
  const isTransitioning = useRef(false)
  const lastWheelTime = useRef(0)
  const exitingHeroMode = useRef(false)

  const heroImages = [
    'images/heroone.jpg',
    'images/herofour.jpg',
    'images/herothree.jpg',
    'images/herotwo.jpg',
    'images/herofive.jpg',
    'images/herosix.jpg'
  ]
  const SCROLL_THRESHOLD = 120

  useEffect(() => {
    const handleWheel = e => {
      const now = Date.now()

      if (!isHeroMode) return

      if (exitingHeroMode.current) return

      e.preventDefault()

      if (now - lastWheelTime.current < 50) return
      lastWheelTime.current = now

      if (isTransitioning.current) return

      wheelAccumulator.current += e.deltaY

      if (Math.abs(wheelAccumulator.current) >= SCROLL_THRESHOLD) {
        isTransitioning.current = true

        if (wheelAccumulator.current > 0) {
          if (currentImageIndex < heroImages.length - 1) {
            setCurrentImageIndex(prev => prev + 1)
            setTimeout(() => {
              isTransitioning.current = false
            }, 700)
          } else {
            exitingHeroMode.current = true
            setIsHeroMode(false)
            setTimeout(() => {
              isTransitioning.current = false
              exitingHeroMode.current = false
            }, 200)
          }
        } else {
          if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1)
            setTimeout(() => {
              isTransitioning.current = false
            }, 700)
          } else {
            isTransitioning.current = false
          }
        }

        wheelAccumulator.current = 0
      }
    }

    const handleScroll = () => {
      if (isHeroMode) return

      const scrolled = window.scrollY
      if (scrolled <= 5) {
        setIsHeroMode(true)
        setCurrentImageIndex(heroImages.length - 1)
        window.scrollTo(0, 0)
        return
      }

      const elements = document.querySelectorAll('[data-animate]')
      elements.forEach(el => {
        const rect = el.getBoundingClientRect()
        const id = el.getAttribute('data-animate')
        if (rect.top < window.innerHeight * 0.8) {
          setIsVisible(prev => (prev[id] ? prev : { ...prev, [id]: true }))
        }
      })
    }

    window.scrollTo(0, 0)
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [currentImageIndex, isHeroMode])

  return (
    <div className=' bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 bg-no-repeat bg-cover bg-center'>
      <nav className='fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/20'>
        <div className='max-w-7xl px-6 py-4'>
          <div className='flex justify-between items-center'>
            <Image
              src='/images/logo.png'
              alt='Wedding Planet Logo'
              width={120}
              height={40}
              className='object-contain  mix-blend-lighten'
            />

            <div className='hidden md:flex space-x-8 text-sm font-light tracking-wide'>
              {[
                'HOME',
                'IMAGES',
                'WEDDING',
                'PRE WEDDING',
                'CINEMATOGRAPHY',
                'BLOG',
                'CONTACT US'
              ].map((item, index) => (
                <a
                  key={item}
                  href='#'
                  className={`hover:text-orange-400 transition-all duration-300 relative group ${
                    item === 'HOME' ? 'text-orange-400' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300'></span>
                </a>
              ))}
            </div>

            <div className='flex space-x-4'>
              <Phone className='w-5 h-5 text-orange-400' />
              <Mail className='w-5 h-5 text-orange-400' />
            </div>
          </div>
        </div>
      </nav>

      <section
        ref={heroRef}
        className={`relative h-screen overflow-hidden transition-all duration-500 ${
          isHeroMode ? 'fixed inset-0 z-40' : 'relative z-10'
        }`}
      >
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-800 ease-out ${
              index === currentImageIndex
                ? 'opacity-100 scale-100 z-20'
                : index < currentImageIndex
                ? 'opacity-0 scale-110 z-10'
                : 'opacity-0 scale-90 z-10'
            }`}
          >
            <img
              src={image}
              alt={`Wedding ${index + 1}`}
              className='w-full h-full object-cover'
              loading={index <= 1 ? 'eager' : 'lazy'}
            />
            <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70'></div>
          </div>
        ))}

        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='text-center'>
              <span className='text-sm tracking-wider opacity-80 block'>
                {currentImageIndex + 1} / {heroImages.length}
              </span>
              <span className='text-xs tracking-widest opacity-60 block mt-1'>
                {isHeroMode
                  ? currentImageIndex === heroImages.length - 1
                    ? 'SCROLL TO EXPLORE'
                    : 'SCROLL TO CONTINUE'
                  : 'SCROLL UP TO RETURN'}
              </span>
            </div>

            <div className='relative w-px h-20 bg-white/20 rounded-full'>
              <div
                className='absolute top-0 left-0 w-full bg-gradient-to-b from-orange-400 to-orange-500 rounded-full transition-all duration-700 ease-out'
                style={{
                  height: `${
                    ((currentImageIndex + 1) / heroImages.length) * 100
                  }%`
                }}
              ></div>
            </div>

            {!isHeroMode && (
              <div className='animate-bounce mt-2'>
                <ChevronLeft className='w-4 h-4 rotate-[-90deg] text-orange-400' />
              </div>
            )}
          </div>
        </div>

        <div className='absolute bottom-8 right-8 z-30'>
          <div className='flex flex-col space-y-3'>
            {heroImages.map((_, index) => (
              <div
                key={index}
                className={`relative transition-all duration-600 ${
                  index === currentImageIndex ? 'w-3 h-3' : 'w-2 h-2'
                }`}
              >
                <div
                  className={`w-full h-full rounded-full transition-all duration-600 ${
                    index === currentImageIndex
                      ? 'bg-orange-400 scale-125 shadow-lg shadow-orange-400/50'
                      : index < currentImageIndex
                      ? 'bg-orange-400/70 scale-100'
                      : 'bg-white/30 scale-75'
                  }`}
                ></div>
                {index === currentImageIndex && (
                  <div className='absolute inset-0 w-full h-full rounded-full bg-orange-400 animate-ping opacity-20'></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {isHeroMode && (
          <div className='absolute top-1/2 right-8 transform -translate-y-1/2 z-30'>
            <div className='text-right space-y-4'>
              <div className='text-xs tracking-widest opacity-60 rotate-90 origin-center whitespace-nowrap'>
                {currentImageIndex < heroImages.length - 1
                  ? 'SCROLL FOR NEXT IMAGE'
                  : 'SCROLL TO CONTINUE'}
              </div>
            </div>
          </div>
        )}

        {currentImageIndex > 0 && isHeroMode && (
          <div className='absolute top-1/2 left-8 transform -translate-y-1/2 z-30'>
            <div className='text-left space-y-4'>
              <div className='text-xs tracking-widest opacity-60 rotate-[-90deg] origin-center whitespace-nowrap'>
                SCROLL UP FOR PREVIOUS
              </div>
            </div>
          </div>
        )}
      </section>

      {isHeroMode && <div className='h-screen'></div>}
      <section className='py-32'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='flex flex-col text-center items-center'>
            <div
              data-animate='about-text'
              className={`transform transition-all duration-1000 ${
                isVisible['about-text']
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-20 opacity-0'
              }`}
            >
              <h2
                className='text-5xl font-extralight tracking-wide my-class'
                style={{
                  background:
                    'linear-gradient(90deg, #a88a00 0%, #ffd700 25%, #fffacd 50%, #ffd700 75%, #a88a00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  fontWeight: 'bold'
                }}
              >
                our story of Passion
              </h2>

              <Image
                src={divider}
                className='w-20 h-30 invert mx-auto'
                width={800}
                height={600}
              />
              <p className='text-lg leading-relaxed text-justify text-gray-300'>
                At{' '}
                <span
                  className='italic font-bold'
                  style={{
                    background:
                      'linear-gradient(90deg, #a88a00 0%, #ffd700 25%, #fffacd 50%, #ffd700 75%, #a88a00 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    fontWeight: 'bold'
                  }}
                >
                  Wedding Photo Planet
                </span>
                , we take pride in being the top wedding photographers in Delhi,
                capturing your precious moments with unparalleled artistry and
                creativity. As the go-to photographer for weddings and special
                occasions, we are always near you, ready to make your
                celebrations even more memorable. Our team of best Wedding
                Photographers in Delhi brings a perfect blend of professionalism
                and passion to every project. Whether it is a grand wedding, an
                intimate pre-wedding shoot, ceremonies, or family functions, we
                have the expertise to create magical memories that will be
                cherished forever. Our head office is located in New Delhi, but
                our reach extends across the country. We are dedicated to
                providing the best Candid wedding photography services wherever
                your special moments take place. In recent years, we have had
                the privilege of capturing hundreds of plus memorable
                professional photo shoots, including heart-warming Pre-wedding
                shoots of countless lovely couples. Moreover, our reputation as
                the best destination pre-wedding photographer has made us the
                preferred choice for couples seeking dreamy captures in
                picturesque locations. At Wedding Photo Planet, we keep things
                simple and convenient for our clients. Reach out to us through
                the contact numbers on our website, and our experts will assist
                you with a personalized booking, ensuring your satisfaction at
                every step. Your vision and expectations are at the core of our
                photography. We strive to provide you with the most Cinematic
                and lovely photographs and videos, reflecting the essence of
                your precious and beautiful moments. With our quality
                photographs, you will be able to relive those special moments
                forever. Seeing the smiles on our client&apos;s faces when they see
                the result of our professional photography skills is what
                motivates us to keep going further. It is the joy we derive from
                capturing your happiness that drives us to deliver excellence in
                every project. Let Wedding Photo Planet be a part of your
                journey, weaving the magic of cinematic wedding videography and
                candid captures into your celebrations. Get in touch with us
                today and let us create timeless memories together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Image
        src={weddingImage}
        alt='Wedding Photography'
        className='w-full h-96 object-cover'
        width={1200}
        height={600}
      />

      <section className='py-32 '>
        <div className='max-w-6xl mx-auto px-6'>
          <div
            data-animate='hero-title'
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible['hero-title']
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h2
              className='text-5xl font-extralight tracking-wide my-class'
              style={{
                background:
                  'linear-gradient(90deg, #a88a00 0%, #ffd700 25%, #fffacd 50%, #ffd700 75%, #a88a00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                fontWeight: 'bold'
              }}
            >
              The visionary behind Wedding Photo Planet
            </h2>

            <Image
              src={divider}
              className='w-20 h-30 invert mx-auto'
              width={800}
              height={600}
            />
            <p className='text-lg leading-relaxed text-justify text-gray-300'>
              Meet{' '}
              <span
                className='italic font-bold'
                style={{
                  background:
                    'linear-gradient(90deg, #a88a00 0%, #ffd700 25%, #fffacd 50%, #ffd700 75%, #a88a00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  fontWeight: 'bold'
                }}
              >
                Mr. Rajat Verma
              </span>
              , the creative force behind Wedding Photo Planet, one of the
              finest and most highly professional photography ventures. With his
              love and passion for photography, he has earned the esteemed title
              of the best wedding photographer in Delhi. Together with a team of
              exceptional candid professional photographers, Mr. Rajat Verma has
              crafted a vision for our company that revolves around promoting
              professional photography services with unmatched quality, honesty,
              and exceptional results. At Wedding Photo Planet, our mission is
              to create a grand identity in the photography profession,
              presenting global standards of excellence similar to those seen at
              red-carpet events and grand celebrity weddings worldwide. Whether
              your wedding is an intimate affair or a lavish celebration, we aim
              to make you feel like a true celebrity, capturing your special
              moments with our best photography skills and boundless passion.
            </p>
          </div>
        </div>
      </section>
      <section className=''>
        <div className=' mx-auto'>
          <div
            data-animate='services-title'
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible['services-title']
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h2
              className='text-5xl font-extralight tracking-wide my-class'
              style={{
                background:
                  'linear-gradient(90deg, #a88a00 0%, #ffd700 25%, #fffacd 50%, #ffd700 75%, #a88a00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                fontWeight: 'bold'
              }}
            >
              Services We Offer
            </h2>
            <Image
              src={divider}
              className='w-20 h-40 -mb-20 invert mx-auto'
              width={800}
              height={600}
            />
          </div>
          <CreativeWeddingServices />
        </div>
      </section>

      <section className='py-32'>
        <div className=' mx-auto'>
          <div
            data-animate='services-title'
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible['services-title']
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }`}
          >
            <h2
              className='text-5xl font-extralight tracking-wide my-class'
              style={{
                background:
                  'linear-gradient(90deg, #a88a00 0%, #ffd700 25%, #fffacd 50%, #ffd700 75%, #a88a00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                fontWeight: 'bold'
              }}
            >
              Explore our Gallery
            </h2>
            <Image
              src={divider}
              className='w-20 h-40 -mb-20 invert mx-auto'
              width={800}
              height={600}
            />
          </div>
          <MinimalGallery />
        </div>
      </section>

      <ScrollReviewCards />
      <WhyChooseUs />
      <Image
        src={headthree}
        alt='Wedding Photography'
        className='w-full h-96 object-cover'
        width={1200}
        height={600}
      />
      <CandidPhotographyUI />
      <section className='py-32'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='flex flex-col text-center items-center'>
            <div
              data-animate='about-text'
              className={`transform transition-all duration-1000 ${
                isVisible['about-text']
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-20 opacity-0'
              }`}
            >
              <h2
                className='text-5xl font-extralight tracking-wide my-class'
                style={{
                  background:
                    'linear-gradient(90deg, #a88a00 0%, #ffd700 25%, #fffacd 50%, #ffd700 75%, #a88a00 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  fontWeight: 'bold'
                }}
              >
                candid photography is the new trend
              </h2>

              <Image
                src={divider}
                className='w-20 h-30 invert mx-auto'
                width={800}
                height={600}
              />
              <p className='text-lg leading-relaxed text-justify text-gray-300'>
                <span
                  className='italic font-bold'
                  style={{
                    background:
                      'linear-gradient(90deg, #a88a00 0%, #ffd700 25%, #fffacd 50%, #ffd700 75%, #a88a00 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    fontWeight: 'bold'
                  }}
                >
                  Candid photography
                </span>{' '}
                is an art that celebrates the beauty of spontaneity and genuine
                emotions. It goes beyond posed shots, capturing moments as they
                unfold naturally, without any interference. At Wedding Photo
                Planet, we take pride in being the best candid photographer in
                Delhi, adept at freezing the fleeting moments of joy, love, and
                laughter. We take immense pride in our Top-Rated Wedding
                Photographers, who work diligently to deliver extraordinary
                results. Our goal is to make your memories eternal, with each
                photograph reflecting the love and joy of your precious moments.
                Whether you are seeking the best candid photographer in Delhi or
                a talented wedding videographer near you, Wedding Photo Planet
                is here to turn your dreams into reality. Our dedicated team
                ensures that your journey with us is effortless, enjoyable, and
                filled with memories that will last a lifetime.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Image
        src={headlast}
        alt='Wedding Photography'
        className='w-full h-96 object-cover'
        width={1200}
        height={600}
      />
      <AnimatedFooter />
    </div>
  )
}
