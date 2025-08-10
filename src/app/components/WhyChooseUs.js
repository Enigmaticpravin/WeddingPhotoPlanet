import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Settings, 
  Eye, 
  Palette, 
  Award, 
  Edit3, 
  Heart, 
  Clock, 
  Shield,
  Sparkles 
} from 'lucide-react';

export default function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRef = useRef(null);

  const reasons = [
    {
      id: 1,
      icon: Award,
      title: "Experienced Professionals",
      description: "Our team of experienced photographers and videographers are passionate about their craft and are dedicated to capturing your most adorable moments with precision and skill.",
      delay: 0
    },
    {
      id: 2,
      icon: Settings,
      title: "State-of-the-Art Equipment",
      description: "We invest in the latest and most advanced photography and videography equipment, ensuring that every frame and shot is of the highest quality.",
      delay: 100
    },
    {
      id: 3,
      icon: Eye,
      title: "Attention to Detail",
      description: "We believe that every detail matters, and we pay close attention to capturing even the smallest moments, emotions, and nuances that make your celebrations unique.",
      delay: 200
    },
    {
      id: 4,
      icon: Palette,
      title: "Creative Vision",
      description: "Our photographers and videographers possess a keen eye for creativity, transforming ordinary moments into extraordinary masterpieces through their artistic vision.",
      delay: 300
    },
    {
      id: 5,
      icon: Camera,
      title: "Unmatched Expertise",
      description: "With years of experience in the industry, we have honed our craft and mastered the art of storytelling through photography and videography.",
      delay: 400
    },
    {
      id: 6,
      icon: Edit3,
      title: "Impeccable Editing",
      description: "Our editing process is meticulous, ensuring that the final results are flawless, enhancing the beauty and essence of your special moments.",
      delay: 500
    },
    {
      id: 7,
      icon: Heart,
      title: "Customer Satisfaction",
      description: "Your satisfaction is our ultimate goal, and we go the extra mile to ensure that you are delighted with the final product.",
      delay: 600
    },
    {
      id: 8,
      icon: Clock,
      title: "Memories to Last a Lifetime",
      description: "We understand the significance of your precious moments, and our commitment to quality ensures that your memories are preserved in all their splendor for generations to come.",
      delay: 700
    },
    {
      id: 9,
      icon: Shield,
      title: "Privacy & Security",
      description: "Your privacy is a matter of our concern too. We make sure everything is secure and privacy is maintained throughout our process.",
      delay: 800
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          setIsVisible(true);
          
          // Stagger the animation of individual items
          reasons.forEach((reason, index) => {
            setTimeout(() => {
              setVisibleItems(prev => new Set(prev).add(reason.id));
            }, reason.delay);
          });
        }
      },
      { threshold: [0.2] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br py-20 px-8 relative overflow-hidden"
    >

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className={`transform transition-all duration-1000 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-10 opacity-0'
          }`}>
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
              Why Choose Us?
            </h2>
         
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Choose Wedding Photo Planet for unparalleled quality that brings your celebrations to life, 
              capturing the magic and love that defines your special occasions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            const isItemVisible = visibleItems.has(reason.id);
            
            return (
              <div
                key={reason.id}
                className={`group transform transition-all duration-700 ease-out ${
                  isItemVisible 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-16 opacity-0 scale-95'
                }`}
                style={{ transitionDelay: isVisible ? `${reason.delay}ms` : '0ms' }}
              >
                <div className="relative h-full p-8 bg-white/10 backdrop-blur-xl border border-white/20  rounded-2xl hover:border-rose-200 hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-500 group-hover:-translate-y-2">

                  <div className="relative mb-6">

                    <div className="relative w-16 h-16 bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="relative">
                    <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-gray-200 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {reason.description}
                    </p>
                  </div>

               </div>
              </div>
            );
          })}
        </div>
      </div>
  </section>
  );
}