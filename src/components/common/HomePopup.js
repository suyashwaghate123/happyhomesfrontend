import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHomePopup } from '../../services/api';

const HomePopup = () => {
  const [popup, setPopup] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const response = await getHomePopup();
        const popupData = response.data;
        
        // Check if popup is active and hasn't been shown in this session
        if (popupData?.isActive) {
          const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
          
          if (!hasSeenPopup || !popupData.showOnce) {
            setPopup(popupData);
            // Delay showing popup for better UX
            setTimeout(() => setIsVisible(true), 2000);
          }
        }
      } catch (error) {
        console.error('Error fetching popup:', error);
      }
    };

    fetchPopup();
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    if (popup?.showOnce) {
      sessionStorage.setItem('hasSeenPopup', 'true');
    }
  };

  if (!popup || !isVisible) return null;

  return (
    <div className="home-popup-overlay" onClick={closePopup}>
      <div className="home-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="home-popup-close" onClick={closePopup}>
          <i className="fas fa-times"></i>
        </button>
        
        {popup.image && (
          <div className="home-popup-image">
            <img src={popup.image} alt={popup.title} />
          </div>
        )}
        
        <div className="home-popup-body">
          <h3>{popup.title}</h3>
          <p>{popup.content}</p>
          
          {popup.buttonText && popup.buttonLink && (
            <Link to={popup.buttonLink} className="btn-1" onClick={closePopup}>
              {popup.buttonText}
              <span></span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePopup;

