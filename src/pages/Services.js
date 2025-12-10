import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  useEffect(() => {
    // Initialize WOW.js for scroll animations
    if (typeof window.WOW !== 'undefined') {
      new window.WOW().init();
    }
  }, []);

  return (
    <>
      {/* Page Title */}
      <div className="page-title" style={{ backgroundImage: 'url(/assets/images/background/page-title.jpg)' }}>
        <div className="auto-container">
          <h1>Our Services</h1>
        </div>
      </div>
      <div className="bredcrumb-wrap">
        <div className="auto-container">
          <ul className="bredcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>Services</li>
          </ul>
        </div>
      </div>

      {/* Service Section Style 2 */}
      <section className="service-2-section alt-2">
        <div className="auto-container">
          <div className="section_heading text-center mb_90">
            <span className="section_heading_title_small">What We Offer</span>
            <h2 className="section_heading_title_big">Everyone Deserves Our <br /> Best Services</h2>
          </div>
          <div className="row">
            {/* Service 1 - Assisted Living */}
            <div className="col-lg-4 col-md-6">
              <div className="service-2-block-wrap">
                <div className="service-2-image">
                  <img src="/assets/images/resource/service-1.jpg" alt="Assisted Living" />
                </div>
                <div className="service-2-block wow fadeInLeft" data-wow-delay=".2s" data-wow-duration=".8s">
                  <div className="service-2-icon"><i className="icon-6"></i></div>
                  <h4 className="service-2-title">Assisted Living</h4>
                  <p className="service-2-text">Comprehensive assisted living services for seniors who need help with daily activities while maintaining their independence and dignity.</p>
                  <div className="service-2-link">
                    <Link to="/service-details" className="btn-1 btn-alt btn-small">Read More<span></span></Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Service 2 - Medical & Health */}
            <div className="col-lg-4 col-md-6">
              <div className="service-2-block-wrap">
                <div className="service-2-image">
                  <img src="/assets/images/resource/service-2.jpg" alt="Medical & Health" />
                </div>
                <div className="service-2-block wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">
                  <div className="service-2-icon"><i className="icon-7"></i></div>
                  <h4 className="service-2-title">Medical & Health</h4>
                  <p className="service-2-text">24/7 medical care with trained nurses and regular doctor visits. We ensure your loved ones receive timely and professional healthcare.</p>
                  <div className="service-2-link">
                    <Link to="/service-details" className="btn-1 btn-alt btn-small">Read More<span></span></Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Service 3 - Residential Care */}
            <div className="col-lg-4 col-md-6">
              <div className="service-2-block-wrap">
                <div className="service-2-image">
                  <img src="/assets/images/resource/service-3.jpg" alt="Residential Care" />
                </div>
                <div className="service-2-block wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1.2s">
                  <div className="service-2-icon"><i className="icon-8"></i></div>
                  <h4 className="service-2-title">Residential Care</h4>
                  <p className="service-2-text">Comfortable and safe residential facilities with modern amenities, nutritious meals, and a homely atmosphere for our residents.</p>
                  <div className="service-2-link">
                    <Link to="/service-details" className="btn-1 btn-alt btn-small">Read More<span></span></Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Service 4 - Nursing Care */}
            <div className="col-lg-4 col-md-6">
              <div className="service-2-block-wrap">
                <div className="service-2-image">
                  <img src="/assets/images/resource/service-4.jpg" alt="Nursing Care" />
                </div>
                <div className="service-2-block wow fadeInLeft" data-wow-delay=".2s" data-wow-duration=".8s">
                  <div className="service-2-icon"><i className="icon-35"></i></div>
                  <h4 className="service-2-title">Nursing Care</h4>
                  <p className="service-2-text">Professional nursing care for seniors with chronic conditions or those recovering from surgery. Our nurses provide compassionate, skilled care.</p>
                  <div className="service-2-link">
                    <Link to="/service-details" className="btn-1 btn-alt btn-small">Read More<span></span></Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Service 5 - Physical Assistance */}
            <div className="col-lg-4 col-md-6">
              <div className="service-2-block-wrap">
                <div className="service-2-image">
                  <img src="/assets/images/resource/service-5.jpg" alt="Physical Assistance" />
                </div>
                <div className="service-2-block wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">
                  <div className="service-2-icon"><i className="icon-36"></i></div>
                  <h4 className="service-2-title">Physical Assistance</h4>
                  <p className="service-2-text">Physiotherapy and physical assistance programs to help seniors maintain mobility, strength, and overall physical well-being.</p>
                  <div className="service-2-link">
                    <Link to="/service-details" className="btn-1 btn-alt btn-small">Read More<span></span></Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Service 6 - Personal Care */}
            <div className="col-lg-4 col-md-6">
              <div className="service-2-block-wrap">
                <div className="service-2-image">
                  <img src="/assets/images/resource/service-6.jpg" alt="Personal Care" />
                </div>
                <div className="service-2-block wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1.2s">
                  <div className="service-2-icon"><i className="icon-37"></i></div>
                  <h4 className="service-2-title">Personal Care</h4>
                  <p className="service-2-text">Dignified personal care assistance including bathing, grooming, dressing, and daily hygiene support with respect and compassion.</p>
                  <div className="service-2-link">
                    <Link to="/service-details" className="btn-1 btn-alt btn-small">Read More<span></span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-1-section">
        <div className="cta-1-bg" data-parallax='{"y": 30}' style={{ backgroundImage: 'url(/assets/images/background/parallax-bg.jpg)' }}></div>
        <div className="auto-container">
          <div className="section_heading text-center mb_40">
            <span className="section_heading_title_small alt">Schedule a Visit</span>
            <h2 className="section_heading_title_big alt">Book An <span>Appointment</span> <br /> Today!</h2>
          </div>
          <div className="text-center">
            <div className="cta-1-desc">Experience our caring environment firsthand. Schedule a tour <br /> of Happy Homes and see how we can help your loved ones <br /> live their best life.</div>
            <div className="cta-1-link-bt">
              <Link to="/contact" className="btn-1">Get Appointment <span></span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-1-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="faq-1-image">
                <div className="faq-1-shape"><img src="/assets/images/shape/pattern-1.png" alt="" /></div>
                <div className="faq-2-shape"><img src="/assets/images/shape/pattern-1.png" alt="" /></div>
                <img src="/assets/images/resource/feature-image-2.jpg" alt="FAQ" />
              </div>
            </div>
            <div className="col-lg-6 ps-lg-5">
              <div className="section_heading mb_20">
                <span className="section_heading_title_small">FAQ's</span>
                <h2 className="section_heading_title_big">Frequently Asked <br /> Questions</h2>
              </div>
              <p className="faq-1-text mb_30">Get answers to common questions about our senior care services, admission process, and what to expect when your loved one joins our community.</p>
              {/* Accordion */}
              <div className="accordian-boxed style-two">
                <ul className="accordion-box style-three">
                  <li className="accordion block">
                    <div className="acc-btn">
                      <div className="icon-outer"><span className="far fa-plus"></span> <span className="far fa-minus"></span></div>
                      What is the admission process?
                    </div>
                    <div className="acc-content">
                      <div className="content">
                        <div className="text">Our admission process is simple. First, schedule a visit to tour our facility. Then, complete the admission form with medical history. Our team will assess care needs and create a personalized care plan.</div>
                      </div>
                    </div>
                  </li>
                  <li className="accordion block">
                    <div className="acc-btn">
                      <div className="icon-outer"><span className="far fa-plus"></span> <span className="far fa-minus"></span></div>
                      What are the visiting hours?
                    </div>
                    <div className="acc-content">
                      <div className="content">
                        <div className="text">Family members are welcome to visit from 9 AM to 8 PM daily. We encourage regular visits as they contribute significantly to our residents' emotional well-being and happiness.</div>
                      </div>
                    </div>
                  </li>
                  <li className="accordion block active-block">
                    <div className="acc-btn active">
                      <div className="icon-outer"><span className="far fa-plus"></span> <span className="far fa-minus"></span></div>
                      What medical facilities are available?
                    </div>
                    <div className="acc-content current">
                      <div className="content">
                        <div className="text">We have 24/7 nursing care, regular doctor visits, emergency medical response, medication management, physiotherapy services, and tie-ups with nearby hospitals for specialized care.</div>
                      </div>
                    </div>
                  </li>
                  <li className="accordion block">
                    <div className="acc-btn">
                      <div className="icon-outer"><span className="far fa-plus"></span> <span className="far fa-minus"></span></div>
                      Can residents bring personal belongings?
                    </div>
                    <div className="acc-content">
                      <div className="content">
                        <div className="text">Yes, residents are encouraged to bring personal items that make them feel at home - photos, favorite books, small furniture pieces, and cherished memorabilia. This helps create a comfortable, familiar environment.</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
