import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import VisitNowPopup from '../common/VisitNowPopup';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
      
      // Add/remove body class for padding when header is fixed
      if (scrolled) {
        document.body.classList.add('header-fixed');
      } else {
        document.body.classList.remove('header-fixed');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('header-fixed');
    };
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
    document.body.classList.remove('mobile-menu-visible');
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.classList.toggle('mobile-menu-visible');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove('mobile-menu-visible');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'current' : '';
  };

  const openPopup = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
    closeMobileMenu();
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Navigation menu items
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/living-options', label: 'Facility' },
    { path: '/blog', label: 'Blogs' },
    { path: '/gallery', label: 'Infrastructure' },
    { path: '/contact', label: 'Contact' }
  ];

  const renderNavigation = (isMobile = false) => (
    <ul className="navigation">
      {navItems.map((item) => (
        <li key={item.path} className={isActive(item.path)}>
          <Link 
            to={item.path} 
            onClick={isMobile ? closeMobileMenu : undefined}
          >
            {item.label}
          </Link>
        </li>
      ))}
      {isMobile && (
        <li>
          <a href="#" onClick={openPopup} className="apply-now-mobile">
            Visit Now
          </a>
        </li>
      )}
    </ul>
  );

  return (
    <>
      <header className={`main-header header-style-one ${isScrolled ? 'fixed-header' : ''}`}>
        {/* Header Top Bar - Dark Navy Background */}
        <div className="header-top-1">
          <div className="auto-container">
            <div className="header-top-1-row d-flex align-items-center justify-content-between">
              <div className="header-top-1-left-column">
                <ul className="header-top-1-contact-info d-flex align-items-center">
                  <li><i className="icon-1"></i><span>Open Hours:</span> Mon-Sun 10:00 AM - 5:00 PM</li>
                  <li><i className="icon-2"></i><span>Phone:</span> <a href="tel:+919209916910">+91 92099 16910</a></li>
                  <li><i className="icon-3"></i><span>Email:</span> <a href="mailto:info@happyhomes.com">info@happyhomes.com</a></li>
                </ul>
              </div>
              <div className="header-top-1-right-column d-flex align-items-center">
                <div className="header-top-1-login"><a href="#" onClick={openPopup}>Visit Now</a></div>
                <ul className="header-top-1-social-icon d-flex align-items-center">
                  <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                  <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Header Upper */}
        <div className="header-upper">
          <div className="auto-container">
            <div className="inner-container d-flex align-items-center justify-content-between">
              <div className="logo-box">
                <div className="logo">
                  <Link to="/">
                    <img src="/images/happyhomeslogo.png" alt="Happy Homes" />
                  </Link>
                </div>
              </div>
              <div className="middle-column">
                <div className="nav-outer">
                  <div className="mobile-nav-toggler" onClick={toggleMobileMenu}>
                    <img src="/assets/images/icons/icon-bar.png" alt="Menu" />
                  </div>
                  <nav className="main-menu navbar-expand-md navbar-light">
                    <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                      {renderNavigation()}
                    </div>
                  </nav>
                </div>
              </div>
              <div className="right-column d-flex align-items-center">
                <div className="header-link-btn">
                  <a href="#" onClick={openPopup} className="btn-1">Visit Now <span></span></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Header */}
        <div className={`sticky-header ${isScrolled ? 'animated slideInDown' : ''}`}>
          <div className="header-upper">
            <div className="auto-container">
              <div className="inner-container d-flex align-items-center justify-content-between">
                <div className="logo-box">
                  <div className="logo">
                    <Link to="/">
                      <img src="/images/happyhomeslogo.png" alt="Happy Homes" />
                    </Link>
                  </div>
                </div>
                <div className="middle-column">
                  <div className="nav-outer">
                    <div className="mobile-nav-toggler" onClick={toggleMobileMenu}>
                      <img src="/assets/images/icons/icon-bar-2.png" alt="Menu" />
                    </div>
                    <nav className="main-menu navbar-expand-md navbar-light">
                      <div className="collapse navbar-collapse show clearfix">
                        {renderNavigation()}
                      </div>
                    </nav>
                  </div>
                </div>
                <div className="right-column d-flex align-items-center">
                  <div className="header-link-btn">
                    <a href="#" onClick={openPopup} className="btn-1">Visit Now <span></span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? '' : ''}`}>
          <div className="menu-backdrop" onClick={closeMobileMenu}></div>
          <div className="close-btn" onClick={closeMobileMenu}>
            <span className="fal fa-times"></span>
          </div>
          <nav className="menu-box">
            <div className="nav-logo">
              <Link to="/">
                <img src="/images/happyhomeslogo.png" alt="Happy Homes" />
              </Link>
            </div>
            <div className="menu-outer">
              {renderNavigation(true)}
            </div>
            {/* Social Links */}
            <div className="social-links">
              <ul className="clearfix">
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><span className="fab fa-twitter"></span></a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><span className="fab fa-facebook-square"></span></a></li>
                <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"><span className="fab fa-pinterest-p"></span></a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><span className="fab fa-instagram"></span></a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><span className="fab fa-youtube"></span></a></li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Nav Overlay */}
        <div className="nav-overlay">
          <div className="cursor"></div>
          <div className="cursor-follower"></div>
        </div>
      </header>

      {/* Visit Now Popup */}
      <VisitNowPopup isOpen={isPopupOpen} onClose={closePopup} />
    </>
  );
};

export default Header;
