import React, { useEffect, useState } from 'react';

const InfiniteGallery = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  const images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&h=500&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=450&fit=crop',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=380&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=420&fit=crop',
    'https://images.unsplash.com/photo-1499988921418-b7df40ff03f9?w=300&h=460&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68e2c6b13d?w=300&h=380&fit=crop',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=500&fit=crop',
    'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=300&h=440&fit=crop',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=480&fit=crop',
    'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=300&h=360&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=420&fit=crop',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=300&h=380&fit=crop',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=450&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=460&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=380&fit=crop',
    'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=300&h=420&fit=crop',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=300&h=500&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=440&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=380&fit=crop',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=460&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=300&h=420&fit=crop',
    'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=380&fit=crop',
    'https://images.unsplash.com/photo-1464822759844-d150baec93d5?w=300&h=450&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop',
    'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=300&h=480&fit=crop'
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create infinite arrays by duplicating images
  const createInfiniteArray = (arr, repeats = 4) => {
    return Array(repeats).fill(arr).flat();
  };

  const infiniteImages = createInfiniteArray(images);

  return (
    <>
      <style jsx>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        
        .scroll-right {
          animation: scroll-right 35s linear infinite;
        }
        
        .scroll-left-slow {
          animation: scroll-left 50s linear infinite;
        }
        
        .scroll-right-slow {
          animation: scroll-right 45s linear infinite;
        }
        
        .scroll-left-fast {
          animation: scroll-left 30s linear infinite;
        }
        
        .float-gentle {
          animation: float 4s ease-in-out infinite;
        }
        
        .float-gentle-2 {
          animation: float 5s ease-in-out infinite;
          animation-delay: -2s;
        }
        
        .float-gentle-3 {
          animation: float 6s ease-in-out infinite;
          animation-delay: -3s;
        }
      `}</style>
      
      <div className="min-h-screen overflow-hidden relative">
 
        
        {/* Row 1 - Left scroll */}
        <div className="flex gap-6 py-4 scroll-left whitespace-nowrap">
          {infiniteImages.slice(0, 40).map((src, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 float-gentle group"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <img
                src={src}
                alt=""
                className="w-72 h-80 object-cover rounded-2xl shadow-xl transition-all duration-700 group-hover:scale-105 opacity-95 hover:opacity-100"
                style={{
                  transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth/2) * 0.005}deg)`
                }}
              />
            </div>
          ))}
        </div>

        {/* Row 2 - Right scroll with offset */}
        <div className="flex gap-6 py-4 scroll-right whitespace-nowrap" style={{ marginLeft: '-200px' }}>
          {infiniteImages.slice(10, 50).map((src, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 float-gentle-2 group"
              style={{
                animationDelay: `${index * 0.15}s`
              }}
            >
              <img
                src={src}
                alt=""
                className="w-64 h-96 object-cover rounded-2xl shadow-xl transition-all duration-700 group-hover:scale-105 opacity-95 hover:opacity-100"
                style={{
                  transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth/2) * -0.005}deg)`
                }}
              />
            </div>
          ))}
        </div>

        {/* Row 3 - Left scroll slow with offset */}
        <div className="flex gap-6 py-4 scroll-left-slow whitespace-nowrap" style={{ marginLeft: '-400px' }}>
          {infiniteImages.slice(5, 45).map((src, index) => (
            <div
              key={`row3-${index}`}
              className="flex-shrink-0 float-gentle-3 group"
              style={{
                animationDelay: `${index * 0.12}s`
              }}
            >
              <img
                src={src}
                alt=""
                className="w-80 h-72 object-cover rounded-2xl shadow-xl transition-all duration-700 group-hover:scale-105 opacity-95 hover:opacity-100"
                style={{
                  transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth/2) * 0.003}deg)`
                }}
              />
            </div>
          ))}
        </div>

        {/* Row 4 - Right scroll slow */}
        <div className="flex gap-6 py-4 scroll-right-slow whitespace-nowrap" style={{ marginLeft: '-100px' }}>
          {infiniteImages.slice(15, 55).map((src, index) => (
            <div
              key={`row4-${index}`}
              className="flex-shrink-0 float-gentle group"
              style={{
                animationDelay: `${index * 0.08}s`
              }}
            >
              <img
                src={src}
                alt=""
                className="w-68 h-88 object-cover rounded-2xl shadow-xl transition-all duration-700 group-hover:scale-105 opacity-95 hover:opacity-100"
                style={{
                  transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth/2) * -0.004}deg)`
                }}
              />
            </div>
          ))}
        </div>

        {/* Row 5 - Left scroll fast */}
        <div className="flex gap-6 py-4 scroll-left-fast whitespace-nowrap" style={{ marginLeft: '-300px' }}>
          {infiniteImages.slice(20, 60).map((src, index) => (
            <div
              key={`row5-${index}`}
              className="flex-shrink-0 float-gentle-2 group"
              style={{
                animationDelay: `${index * 0.09}s`
              }}
            >
              <img
                src={src}
                alt=""
                className="w-76 h-84 object-cover rounded-2xl shadow-xl transition-all duration-700 group-hover:scale-105 opacity-95 hover:opacity-100"
                style={{
                  transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth/2) * 0.006}deg)`
                }}
              />
            </div>
          ))}
        </div>

        {/* Row 6 - Right scroll with different offset */}
        <div className="flex gap-6 py-4 scroll-right whitespace-nowrap" style={{ marginLeft: '-500px' }}>
          {infiniteImages.slice(25, 65).map((src, index) => (
            <div
              key={`row6-${index}`}
              className="flex-shrink-0 float-gentle-3 group"
              style={{
                animationDelay: `${index * 0.11}s`
              }}
            >
              <img
                src={src}
                alt=""
                className="w-70 h-90 object-cover rounded-2xl shadow-xl transition-all duration-700 group-hover:scale-105 opacity-95 hover:opacity-100"
                style={{
                  transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth/2) * -0.007}deg)`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfiniteGallery;