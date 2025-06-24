import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = ({ onLoaded }) => {
  const preloaderRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            if (preloaderRef.current) {
              preloaderRef.current.style.display = 'none';
            }
            onLoaded();
          },
        });
      },
    });

    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.inOut',
    }).to(textRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.75
    })

  }, [onLoaded]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-900"
    >
      <h1
        ref={textRef}
        className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white opacity-0 -translate-y-8"
      >
        Asad Ali
      </h1>
    </div>
  );
};

export default Preloader; 