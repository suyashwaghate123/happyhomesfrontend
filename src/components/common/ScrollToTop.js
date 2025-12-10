import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`scroll-to-top ${isVisible ? '' : ''}`} onClick={scrollToTop}>
      <div>
        <div className={`scroll-top-inner ${isVisible ? 'visible' : ''}`}>
          <div className="scroll-bar">
            <div className="bar-inner" style={{ width: `${scrollProgress}%` }}></div>
          </div>
          <div className="scroll-bar-text">Go To Top</div>
        </div>
      </div>
    </div>
  );
};

export default ScrollToTop;
