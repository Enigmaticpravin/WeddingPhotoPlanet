// components/CandidPhotographyUI.js
import React, { useState } from 'react';
import Image from 'next/image';

const images = [
  '/images/sliderone.jpg',
  '/images/slidertwo.jpg',
  '/images/sliderthree.jpg',
];

const CandidPhotographyUI = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="min-h-screen py-16 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
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
              Embracing the essence of moments
            </h2>
          <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
            Our candid professional photographers have a keen eye for those precious moments that make your celebrations truly special.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20  p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">The Beauty of Being Unscripted</h3>
              <p className="text-gray-100 leading-relaxed">
                Candid photography brings out the true essence of every occasion, reflecting the raw emotions, laughter, and tears that define your special moments.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20  p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">Every Frame, A Story Untold</h3>
              <p className="text-gray-100 leading-relaxed">
                In each candid photograph, we capture, there’s a story waiting to be told. It’s the subtle glances, the heartfelt smiles, and the shared laughter.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20  p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">Preserving Memories with Candid Photography</h3>
              <p className="text-gray-100 leading-relaxed">
                Our candid photography is about creating timeless memories that you’ll cherish for a lifetime.
              </p>
            </div>
          </div>

          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <style jsx>{`
              .slider-container {
                perspective: 1000px;
              }
              .slider-inner {
                transform-style: preserve-3d;
                transition: transform 0.7s ease-in-out;
              }
              .slider-item {
                position: absolute;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
              }
            `}</style>
            <div className="h-full w-full slider-container">
              <div className="relative h-full slider-inner" style={{ transform: `translateZ(-200px) rotateY(${currentIndex * -120}deg)` }}>
                {images.map((src, index) => (
                  <div 
                    key={index} 
                    className="slider-item" 
                    style={{ transform: `rotateY(${index * 120}deg) translateZ(200px)` }}
                  >
                    <Image
                      src={src}
                      alt={`Candid Moment ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between items-center px-4">
              <button 
                onClick={goToPrevious} 
                className="bg-gray-800 cursor-pointer bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={goToNext} 
                className="bg-gray-800 bg-opacity-50 cursor-pointer text-white rounded-full p-2 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-4">
            Choose Candid Photography with Wedding Photo Planet
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
            At <span
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
                >Wedding Photo Planet</span>, we believe in the power of candid photography to convey the true spirit of your celebrations. Let our best candid photographer in Delhi capture the fleeting moments that make your occasions extraordinary.
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default CandidPhotographyUI;