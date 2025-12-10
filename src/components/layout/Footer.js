import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-1">
      <div className="footer-1-top">
        <div className="auto-container">
          <div className="footer-1-top-content d-flex align-items-center justify-content-between">
            <div className="logo">
              <Link to="/">
                <img src="/images/happyhomeslogo.png" alt="Happy Homes" />
              </Link>
            </div>
            <ul className="footer-1-social-icon d-flex align-items-center">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-1-middle">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="about-widget-1">
                <div className="footer-widget-title"><h4>About</h4></div>
                <div className="about-widget-1-text">
                  <p>Happy Homes is a premier old age <br />
                    care facility dedicated to providing <br /> compassionate care for senior citizens. <br /> We believe in dignity and respect.</p>
                  <p>Creating a home away from home <br /> for our beloved elders.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="link-widget-1 px-lg-5">
                <div className="footer-widget-title"><h4>Quick Link</h4></div>
                <ul className="link-widget-1-list">
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/living-options">Living Options</Link></li>
                  <li><Link to="/gallery">Gallery</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="link-widget-1">
                <div className="footer-widget-title"><h4>Useful Links</h4></div>
                <ul className="link-widget-1-list">
                  <li><Link to="/faq">Privacy Policy</Link></li>
                  <li><Link to="/faq">Terms & Condition</Link></li>
                  <li><Link to="/contact">Support</Link></li>
                  <li><Link to="/faq">Disclaimer</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="contact-widget-1">
                <div className="footer-widget-title"><h4>Contact Us</h4></div>
                <div className="contact-widget-text">We're here to help you make the best decision for your loved ones.</div>
                <ul className="contact-widget-1-list">
                  <li><i className="icon-14"></i> Happy Homes Care, Sai Satyam Park, Khandve Nagar, Wagholi, Pune, Maharashtra 412207</li>
                  <li><i className="icon-3"></i><a href="mailto:info@happyhomes.com">info@happyhomes.com</a></li>
                  <li><i className="icon-2"></i><a href="tel:+919209916910">+91 92099 16910</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="auto-container">
          <div className="footer-bottom-row">
            <div className="footer-bottom-text">Copyright {new Date().getFullYear()} by Happy Homes. All Rights Reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
