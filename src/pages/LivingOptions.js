import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLivingOptions } from '../services/api';
import VisitNowPopup from '../components/common/VisitNowPopup';

const LivingOptions = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLivingOptions();
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching living options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Initialize WOW.js
    if (typeof window.WOW !== 'undefined') {
      new window.WOW().init();
    }
  }, []);

  const openPopup = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  if (loading) {
    return (
      <div className="loader-wrap">
        <div className="preloader"><div className="preloader-close">Loading...</div></div>
        <div className="layer layer-one"><span className="overlay"></span></div>
        <div className="layer layer-two"><span className="overlay"></span></div>
        <div className="layer layer-three"><span className="overlay"></span></div>
      </div>
    );
  }

  return (
    <>
      {/* Page Title */}
      <div className="page-title" style={{ backgroundImage: 'url(/images/imageplaceholder.jpg)' }}>
        <div className="auto-container">
          <h1>Our Facility</h1>
        </div>
      </div>
      <div className="bredcrumb-wrap">
        <div className="auto-container">
          <ul className="bredcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>Facility</li>
          </ul>
        </div>
      </div>

      {/* Intro Section */}
      <section className="section-padding">
        <div className="auto-container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section_heading mb_30">
                <span className="section_heading_title_small">Our Care Programs</span>
                <h2 className="section_heading_title_big">Choose The Right <br /><span>Care Option</span> For You</h2>
              </div>
              <p className="mb_20">At Happy Homes, we understand that every senior has unique needs. That's why we offer three distinct care programs designed to provide the right level of support while maintaining dignity and independence.</p>
              <p>Our experienced team will help you choose the perfect care option based on your loved one's health requirements, lifestyle preferences, and personal goals.</p>
              <div className="mt_30">
                <a href="#" onClick={openPopup} className="btn-1">
                  Schedule a Visit <span></span>
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="faq-1-image wow fadeInRight" data-wow-delay=".2s">
                <div className="faq-1-shape"><img src="/assets/images/shape/pattern-1.png" alt="" /></div>
                {/* <img src="/assets/images/resource/feature-image-2.jpg" alt="Happy Homes Facility" /> */}
                <img src="/images/imageplaceholder.jpg" alt="Happy Homes Facility" style={{ borderRadius: '20px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Care Options Section */}
      <section className="living-options-section">
        <div className="auto-container">
          <div className="section_heading text-center mb_60">
            <span className="section_heading_title_small">Accommodation</span>
            <h2 className="section_heading_title_big">Our Care <span>Programs</span></h2>
          </div>

          <div className="row">
            {options.map((option, index) => (
              <div key={option.id} className="col-lg-4 col-md-6 mb-4">
                <div 
                  className="living-option-block wow fadeInUp"
                  data-wow-delay={`${0.2 + index * 0.1}s`}
                >
                  <div className="living-option-image">
                    <img src={option.image} alt={option.title} />
                    <div className="living-option-price">
                      {option.price}
                    </div>
                  </div>
                  <div className="living-option-content">
                    <h3>{option.title}</h3>
                    <p>{option.description}</p>
                    
                    {option.amenities && option.amenities.length > 0 && (
                      <div className="living-option-amenities">
                        <h5>Key Features:</h5>
                        <ul>
                          {option.amenities.slice(0, 4).map((amenity, i) => (
                            <li key={i}>
                              <i className="fas fa-check-circle"></i>
                              {amenity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <a href="#" onClick={openPopup} className="btn-1 btn-small">
                      Book a Visit <span></span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="service-4-section">
        <div className="auto-container">
          <div className="section_heading text-center mb_60">
            <span className="section_heading_title_small">What We Offer</span>
            <h2 className="section_heading_title_big">Facilities & <span>Amenities</span></h2>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="service-4-block text-center wow fadeInLeft" data-wow-delay=".2s" data-wow-duration=".8s">
                <div className="service-4-icon"><i className="icon-6"></i></div>
                <h4 className="service-4-title">24/7 Medical Care</h4>
                <p>Round-the-clock nursing support and emergency assistance</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="service-4-block text-center wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">
                <div className="service-4-icon"><i className="icon-7"></i></div>
                <h4 className="service-4-title">Nutritious Meals</h4>
                <p>6 healthy meals daily customized to dietary needs</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="service-4-block text-center wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1.2s">
                <div className="service-4-icon"><i className="icon-8"></i></div>
                <h4 className="service-4-title">Comfortable Rooms</h4>
                <p>Fully furnished rooms with safety features</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="service-4-block text-center wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1.4s">
                <div className="service-4-icon"><i className="icon-35"></i></div>
                <h4 className="service-4-title">Daily Activities</h4>
                <p>Yoga, games, cultural events & social gatherings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="comparison-section theme-gray-bg">
        <div className="auto-container">
          <div className="section_heading text-center mb_60">
            <span className="section_heading_title_small">Compare Options</span>
            <h2 className="section_heading_title_big">Find What Works <br /> <span>Best For You</span></h2>
          </div>

          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Features</th>
                  <th>Bedridden Care</th>
                  <th>Assisted Living</th>
                  <th>Independent Living</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>24/7 Nursing Care</td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                  <td>On Request</td>
                </tr>
                <tr>
                  <td>Personal Assistance</td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                  <td>Optional</td>
                </tr>
                <tr>
                  <td>Physiotherapy</td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                  <td>Optional</td>
                </tr>
                <tr>
                  <td>Nutritious Meals</td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
                <tr>
                  <td>Activities & Recreation</td>
                  <td>Limited</td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
                <tr>
                  <td>Private Room</td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
                <tr>
                  <td>Community Living</td>
                  <td><i className="fas fa-times"></i></td>
                  <td><i className="fas fa-check"></i></td>
                  <td><i className="fas fa-check"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="auto-container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h2>Ready to Find the Perfect Care Option?</h2>
              <p>Schedule a visit to see our facilities in person and meet our caring staff.</p>
            </div>
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <a href="#" onClick={openPopup} className="btn-1">
                Schedule a Visit <span></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Now Popup */}
      <VisitNowPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
};

export default LivingOptions;
