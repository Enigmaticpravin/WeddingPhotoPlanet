'use client'

import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Camera, Heart, Video } from 'lucide-react';
import Image from 'next/image';
import prewedding from '@/../public/images/prewedding.jpg';
const CreativeWeddingServices = () => {
  const [activeService, setActiveService] = useState(0);
  const sectionsRef = [useRef(null), useRef(null), useRef(null)];

  const services = [
    {
      title: "Wedding Photography",
      image: "/images/wedding.jpg",
      topText: "Top Wedding Photographer:",
      description:
        "Let us be a part of your special day as we capture every cherished moment with our expert lens, ensuring that your wedding memories are nothing short of extraordinary.",
      sections: [
        {
          title: "Best Wedding Videographer in Delhi:",
          text: "Relive the magic of your wedding day with our captivating videography, beautifully preserving the emotions and joyous celebrations.",
        },
        {
          title: "Best Wedding Photography:",
          text: "Our skilled photographers capture the essence of your wedding, portraying the love and happiness shared, resulting in stunning images that you'll cherish forever.",
        },
      ],
      icon: Camera,
      color: "rose",
    },
    {
      title: "Pre Wedding Photography",
      image: prewedding,
      topText: "Pre-Wedding Photographers in Delhi:",
      description:
        "Embark on a delightful journey with us before your big day, as we capture the romance and excitement leading up to your wedding.",
      sections: [
        {
          title: "Best Pre-Wedding Photographer in Delhi:",
          text: "We bring your love story to life through enchanting pre-wedding shoots, ensuring that every moment is a revered memory.",
        },
        {
          title: "Pre-Wedding Shoot:",
          text: "Let your love take center stage as we create dreamy and memorable pre-wedding shoots that will fill your heart with joy.",
        },
        {
          title: "Destination Shoot:",
          text: "Choose your dream destination, and we'll turn it into the perfect backdrop for your pre-wedding photography, creating enchanting memories.",
        },
      ],
      icon: Heart,
      color: "purple",
    },
    {
      title: "Cinematography",
      image: "/images/cinema.jpg",
      topText: "Best Wedding Cinematographer:",
      description:
        "Our talented cinematographers capture your wedding in a cinematic style, making every moment an unforgettable part of your love story.",
      sections: [
        {
          title: "Cinematography:",
          text: "Our videography services go beyond capturing events; they evoke emotions, narrating your special day like a heartfelt movie.",
        },
        {
          title: "Cinematic Wedding Video Film:",
          text: "Relive the magic of your wedding through our cinematic wedding video films, where each frame tells a beautiful story of love and togetherness.",
        },
      ],
      icon: Video,
      color: "amber",
    },
  ];

  const colorVariants = {
    rose: {
      gradient: "from-rose-50 to-pink-50",
      border: "border-rose-200",
      text: "text-rose-600",
      bg: "bg-rose-500",
      hover: "hover:bg-rose-600",
    },
    purple: {
      gradient: "from-purple-50 to-violet-50",
      border: "border-purple-200",
      text: "text-purple-600",
      bg: "bg-purple-500",
      hover: "hover:bg-purple-600",
    },
    amber: {
      gradient: "from-amber-50 to-orange-50",
      border: "border-amber-200",
      text: "text-amber-600",
      bg: "bg-amber-500",
      hover: "hover:bg-amber-600",
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionsRef[0].current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Get top offset of each section relative to document
      const offsets = sectionsRef.map((ref) =>
        ref.current ? ref.current.offsetTop : 0
      );
      const scrollPosition = scrollY + viewportHeight / 2;

      if (scrollPosition < offsets[1]) {
        // Before 2nd section starts → active 0
        if (activeService !== 0) setActiveService(0);
      } else if (scrollPosition >= offsets[1] && scrollPosition < offsets[2]) {
        // Between 2nd and 3rd section
        if (activeService !== 1) setActiveService(1);
      } else if (scrollPosition >= offsets[2]) {
        // After 3rd section start
        if (activeService !== 2) setActiveService(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // call once to set on page load
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeService]);

  return (
    <div className="min-h-screen ">
      <div className="sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex justify-center py-6">
            <div className="flex bg-gray-100 rounded-full p-1">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveService(index);
                      window.scrollTo({
                        top: sectionsRef[index].current.offsetTop,
                        behavior: "smooth",
                      });
                    }}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full cursor-pointer transition-all duration-500 ${
                      activeService === index
                        ? `bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950} text-white shadow-lg`
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium hidden sm:block">
                      {service.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {services.map((service, index) => (
          <div
            key={index}
            ref={sectionsRef[index]}
            className={`transition-all duration-700 ${
              activeService === index
                ? "opacity-100 scale-100 relative"
                : "opacity-50 scale-95 relative"
            } mb-20`}
          >
            <div
              className={` rounded-3xl p-8 mb-8`}
            >
              <div className="grid lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-2">
                  <Image
                    src={service.image}
                    alt={service.title}
                    layout="responsive"
                    width={400}
                    height={300}
                    className="rounded-2xl"
                  />
                </div>
                <div className="lg:col-span-3">
                  <h1 className="text-4xl font-bold text-white mb-6">
                    {service.title}
                  </h1>
                  <div className="space-y-6">
                    <div>
                      <h3
                        className={`font-semibold text-yellow-300 mb-2`}
                      >
                        {service.topText}
                      </h3>
                      <p className="text-gray-200 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
            <div className="">
              {service.sections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="rounded-2xl p-2 shadow-sm  hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div
                      className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-black font-bold">
                        {sectionIndex + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-yellow-300 mb-3">
                        {section.title}
                      </h3>
                      <p className="text-gray-200 leading-relaxed">{section.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreativeWeddingServices;
