'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ChevronUp, ChevronDown } from 'lucide-react';

export default function ScrollReviewCards() {
  const SCROLL_THRESHOLD = 80;
  const TRANSITION_DURATION = 600;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('down');
  const [isInView, setIsInView] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const wheelAccumulator = useRef(0);
  const lastWheelTime = useRef(0);
  const touchStartY = useRef(0);

  const reviews = [
    { id: 1, name: "Sarah Chen", role: "Creative Director", company: "Design Studio",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612c9a8?w=150&h=150&fit=crop&crop=face",
      rating: 5, text: "Absolutely incredible work! The team delivered beyond our expectations and created something truly remarkable that exceeded every metric we had hoped for." },
    { id: 2, name: "Marcus Johnson", role: "Tech CEO", company: "Innovation Labs",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5, text: "The level of professionalism and technical expertise is outstanding. They transformed our vision into reality with precision and creativity that blew us away." },
    { id: 3, name: "Emma Rodriguez", role: "Marketing Manager", company: "Global Brands",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5, text: "Working with this team was a game-changer for our brand. Their innovative approach and attention to detail resulted in outcomes that surpassed our wildest dreams." },
    { id: 4, name: "David Kim", role: "Product Owner", company: "Tech Ventures",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5, text: "Exceptional quality and service! They understood our requirements perfectly and delivered a solution that not only met but exceeded every expectation we had." },
    { id: 5, name: "Lisa Thompson", role: "UX Director", company: "Digital Agency",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5, text: "The most professional and talented team I've ever worked with. Their expertise and dedication resulted in a product that truly stands out in the market." }
  ];

  const triggerAnimation = useCallback((direction, newIndex) => {
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    setAnimationDirection(direction);
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => {
        setIsAnimating(false);
        isAnimatingRef.current = false;
      }, 50);
    }, TRANSITION_DURATION / 2);
  }, [TRANSITION_DURATION]);

  const navigateReviews = useCallback((direction) => {
    if (isAnimatingRef.current) return;
    
    const currentIdx = currentIndex;
    if (direction === 'next' && currentIdx < reviews.length - 1) {
      triggerAnimation('down', currentIdx + 1);
    } else if (direction === 'prev' && currentIdx > 0) {
      triggerAnimation('up', currentIdx - 1);
    }
  }, [currentIndex, reviews.length, triggerAnimation]);

  // Intersection Observer to detect when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.5);
      },
      { threshold: [0.5] }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const handleTouchStart = (e) => {
      if (!containerRef.current) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (!containerRef.current) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          navigateReviews('next');
        } else {
          navigateReviews('prev');
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isInView, navigateReviews]);

  // Keyboard navigation
  useEffect(() => {
    if (!isInView) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        navigateReviews('next');
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateReviews('prev');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isInView, navigateReviews]);

  return (
    <section 
      ref={containerRef}
      className="bg-gradient-to-br flex items-center justify-center mb-20 px-8 overflow-hidden relative"
    >
      <div className="w-full max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
         <h2
              className='text-5xl font-extralight mb-5 tracking-wide my-class'
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
              What our clients say
            </h2>
     
          <div className="text-white/40 text-sm mb-8 flex items-center justify-center gap-4">
            <span>Review {currentIndex + 1} of {reviews.length}</span>
            {isInView && (
              <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                Use scroll, arrows, or buttons to navigate
              </span>
            )}
          </div>
        </div>
        
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={() => navigateReviews('prev')}
            disabled={currentIndex === 0 || isAnimating}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 p-3 rounded-full 
              bg-white/10 backdrop-blur-sm border border-white/20 text-white
              hover:bg-white/20 hover:scale-110 transition-all duration-300
              ${(currentIndex === 0 || isAnimating) ? 'opacity-30 cursor-not-allowed' : 'opacity-70 hover:opacity-100'}`}
          >
            <ChevronUp className="w-6 h-6" />
          </button>

          <button
            onClick={() => navigateReviews('next')}
            disabled={currentIndex === reviews.length - 1 || isAnimating}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 p-3 rounded-full 
              bg-white/10 backdrop-blur-sm border border-white/20 text-white
              hover:bg-white/20 hover:scale-110 transition-all duration-300
              ${(currentIndex === reviews.length - 1 || isAnimating) ? 'opacity-30 cursor-not-allowed' : 'opacity-70 hover:opacity-100'}`}
          >
            <ChevronDown className="w-6 h-6" />
          </button>

          <ReviewCard 
            key={`${reviews[currentIndex].id}-${currentIndex}`}
            review={reviews[currentIndex]} 
            isAnimating={isAnimating}
            animationDirection={animationDirection}
          />
        </div>
        
        <div className="mt-8 flex justify-center space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index !== currentIndex && !isAnimating) {
                  const direction = index > currentIndex ? 'down' : 'up';
                  triggerAnimation(direction, index);
                }
              }}
              disabled={isAnimating}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125 shadow-lg shadow-white/30' 
                  : 'bg-white/30 hover:bg-white/50 hover:scale-110'
              } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            />
          ))}
        </div>
        
   
      </div>
    </section>
  );
}

function ReviewCard({ review, isAnimating, animationDirection }) {
  const getTransformClass = () => {
    if (!isAnimating) return 'translate-y-0 opacity-100 scale-100';
    
    if (animationDirection === 'down') {
      return 'translate-y-12 opacity-0 scale-95';
    } else {
      return '-translate-y-12 opacity-0 scale-95';
    }
  };

  return (
    <div className={`
      bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-3xl mx-auto 
      transition-all duration-600 ease-out transform
      ${getTransformClass()}
      hover:bg-white/15 hover:border-white/30 hover:scale-[1.02]
      hover:shadow-2xl hover:shadow-white/10
    `}>
      <div className="flex items-center mb-6">
        <div className="relative">
          <img 
            src={review.image} 
            alt={review.name} 
            className="w-20 h-20 rounded-2xl object-cover transition-transform duration-500 hover:scale-110" 
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white/20 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="ml-6 text-left flex-1">
          <h3 className="text-white text-2xl font-semibold transition-colors duration-300 mb-1">
            {review.name}
          </h3>
          <p className="text-white/70 transition-colors duration-300 font-medium">{review.role}</p>
          <p className="text-white/50 text-sm transition-colors duration-300">{review.company}</p>
        </div>
        <div className="flex space-x-1">
          {[...Array(review.rating)].map((_, i) => (
            <Star 
              key={i} 
              className="w-5 h-5 text-yellow-400 fill-current transition-all duration-300 hover:scale-125" 
              style={{
                animationDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>
      </div>
      <blockquote className="text-white/90 text-lg leading-relaxed transition-colors duration-300 italic">
        &quot;{review.text}&quot;
      </blockquote>
    </div>
  );
}