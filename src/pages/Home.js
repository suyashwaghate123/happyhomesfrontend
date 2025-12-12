import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState(0); // First accordion is open by default

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        await api.getHomeData();
        // Data is fetched but currently using static content
        // Will be used when admin panel is ready
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Initialize animations and sliders after component mounts
  useEffect(() => {
    if (!loading && window.jQuery) {
      // Re-initialize WOW.js for scroll animations
      if (typeof window.WOW !== 'undefined') {
        new window.WOW().init();
      }

      // Initialize banner slider
      if (typeof window.Swiper !== 'undefined') {
        // Banner Slider 2 (style-three)
        new window.Swiper('.banner-slider-2', {
          preloadImages: false,
          loop: true,
          grabCursor: true,
          centeredSlides: false,
          resistance: true,
          resistanceRatio: 0.6,
          speed: 2400,
          spaceBetween: 0,
          parallax: false,
          effect: "fade",
          autoplay: {
            delay: 8000,
            disableOnInteraction: false
          },
          navigation: {
            nextEl: '.banner-slider-button-next',
            prevEl: '.banner-slider-button-prev',
          },
        });

        // Two item carousel for testimonials
        new window.Swiper('.two-item-carousel', {
          preloadImages: false,
          loop: true,
          grabCursor: true,
          centeredSlides: false,
          resistance: true,
          resistanceRatio: 0.6,
          slidesPerView: 2,
          speed: 1400,
          spaceBetween: 30,
          parallax: false,
          effect: "slide",
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          },
          breakpoints: {
            991: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
          }
        });
      }

      // Initialize Odometer for counters
      if (typeof window.Odometer !== 'undefined') {
        const odometerElements = document.querySelectorAll('.odometer');
        odometerElements.forEach((el) => {
          const countNumber = el.getAttribute('data-count');
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                el.innerHTML = countNumber;
                observer.unobserve(el);
              }
            });
          }, { threshold: 0.5 });
          observer.observe(el);
        });
      }

      // Initialize Progress Bars with animation
      if (window.jQuery) {
        const $ = window.jQuery;
        
        // Progress bar width animation
        const progressBars = document.querySelectorAll('.progress-line');
        progressBars.forEach((bar) => {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const width = entry.target.getAttribute('data-width');
                if (width) {
                  entry.target.style.width = width + '%';
                }
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.3 });
          observer.observe(bar);
        });

        // Count text animation
        const countBoxes = document.querySelectorAll('.count-box');
        countBoxes.forEach((box) => {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const countText = entry.target.querySelector('.count-text');
                if (countText) {
                  const stopValue = parseInt(countText.getAttribute('data-stop'), 10);
                  const speed = parseInt(countText.getAttribute('data-speed'), 10) || 2000;
                  let current = 0;
                  const increment = stopValue / (speed / 16); // 60fps
                  
                  const timer = setInterval(() => {
                    current += increment;
                    if (current >= stopValue) {
                      current = stopValue;
                      clearInterval(timer);
                    }
                    countText.textContent = Math.floor(current);
                  }, 16);
                }
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.3 });
          observer.observe(box);
        });
      }
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="loader-wrap">
        <div className="preloader"><div className="preloader-close">Preloader Close</div></div>
        <div className="layer layer-one"><span className="overlay"></span></div>
        <div className="layer layer-two"><span className="overlay"></span></div>
        <div className="layer layer-three"><span className="overlay"></span></div>
      </div>
    );
  }

  return (
    <>
      {/* Banner Section Style Three */}
      <section className="banner-section style-three">
        <div className="banner-shape-3">
          <img src="/assets/images/shape/pattern-3.png" alt="" />
        </div>
        <div className="swiper-container banner-slider-2">
          <div className="swiper-wrapper">
            {/* Slide Item 1 */}
            <div className="swiper-slide">
              <div 
                className="banner-feature-image d-none d-lg-block" 
                style={{ backgroundImage: 'url(/images/main-slider/slider-1.jpg)' }}
              ></div>
              {/* <div 
                className="banner-feature-image d-none d-lg-block" 
                style={{ backgroundImage: 'url(/images/imageplaceholder.jpg)' }}
              ></div> */}
              <div className="content-outer">
                <div className="content-box">
                  <div className="inner">
                    <h4>Change The World</h4>
                    <h1>We Are The <br />
                      Best <span>Assisted Living</span> <br />
                      Service Provider</h1>
                    <div className="text">Providing compassionate care for your loved ones with <br /> dignity and respect.</div>
                    <div className="link-box">
                      <Link to="/about" className="btn-1 btn-large">Discover More <span></span></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Slide Item 2 */}
            <div className="swiper-slide">
              <div 
                className="banner-feature-image d-none d-lg-block" 
                style={{ backgroundImage: 'url(/images/main-slider/slider-2.jpg)' }}
              ></div>
              {/* <div 
                className="banner-feature-image d-none d-lg-block" 
                style={{ backgroundImage: 'url(/images/imageplaceholder.jpg)' }}
              ></div> */}
              <div className="content-outer">
                <div className="content-box">
                  <div className="inner">
                    <h4>Change The World</h4>
                    <h1>We Are The <br />
                      Best <span>Senior Living</span> <br />
                      Service Provider</h1>
                    <div className="text">Creating a home away from home for our elderly <br /> residents with love.</div>
                    <div className="link-box">
                      <Link to="/services" className="btn-1 btn-large">Discover More <span></span></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Slide Item 3 */}
            <div className="swiper-slide">
              <div 
                className="banner-feature-image d-none d-lg-block" 
                style={{ backgroundImage: 'url(/images/main-slider/slider-3.jpg)' }}
              ></div>
              {/* <div 
                className="banner-feature-image d-none d-lg-block" 
                style={{ backgroundImage: 'url(/images/imageplaceholder.jpg)' }}
              ></div> */}
              <div className="content-outer">
                <div className="content-box">
                  <div className="inner">
                    <h4>Change The World</h4>
                    <h1>We Are The <br />
                      Best <span>Bedridden Care</span> <br />
                      Service Provider</h1>
                    <div className="text">Dedicated support for fully dependent senior residents.</div>
                    <div className="link-box">
                      <Link to="/services" className="btn-1 btn-large">Discover More <span></span></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner-slider-nav">
          <div className="banner-slider-control banner-slider-button-prev"><span><i className="icon-5"></i></span></div>
          <div className="banner-slider-control banner-slider-button-next"><span><i className="icon-4"></i></span></div>
        </div>
        <ul className="banner-social-icon d-flex">
          <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
          <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
          <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li>
        </ul>
      </section>

      {/* Fundraise Section - Care Programs */}
      <section className="fundraise-1-section alt">
        <div className="fundraise-1-shape" style={{ backgroundImage: 'url(/assets/images/shape/pattern-4.png)' }}></div>
        <div className="auto-container">
          <div className="section_heading text-center mb_90">
            <span className="section_heading_title_small">Our Care Programs</span>
            <h2 className="section_heading_title_big">We Take Care of Your <br /> Loved Ones Carefully</h2>
          </div>
          <div className="row">
            
            {/* Assisted Living */}
            <div className="col-lg-4 col-md-6">
              <div className="fundraise-1-block wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">
                <div className="fundraise-1-image">
                  <img src="/images/resource/program-3.jpg" alt="Assisted Living" />
                  {/* <img src="/images/imageplaceholder.jpg" alt="Assisted Living" /> */}
                  <div className="fundraise-1-link-btn">
                    <Link to="/services/assisted-living" className="btn-1 btn-small">Read More<span></span></Link>
                  </div>
                </div>
                <div className="fundraise-1-content alt">
                  <h4 className="fundraise-1-title">Assisted Living</h4>
                  <p className="fundraise-1-text">Personalized daily assistance to maintain independent living.</p>
                  <div className="fundraise-1-skill-item">
                    <div className="fundraise-1-skill-bar">
                      <div className="progressbar-1-outer">
                        <div className="progressbar-1-inner progress-line" data-width="90">
                          <div className="progressbar-1-percentage">
                            <div className="count-box"><span className="count-text" data-speed="2000" data-stop="90">0</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fundraise-1-price d-flex align-items-center justify-content-between">
                    <div className="fundraise-1-raise">Daily Support</div>
                    <div className="fundraise-1-target">Personalized</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Independent Senior Living */}
            <div className="col-lg-4 col-md-6">
              <div className="fundraise-1-block wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1.2s">
                <div className="fundraise-1-image">
                  <img src="/images/resource/program-2.jpg" alt="Independent Senior Living" />
                  {/* <img src="/images/imageplaceholder.jpg" alt="Independent Senior Living" /> */}
                  <div className="fundraise-1-link-btn">
                    <Link to="/services/independent-living" className="btn-1 btn-small">Read More<span></span></Link>
                  </div>
                </div>
                <div className="fundraise-1-content alt">
                  <h4 className="fundraise-1-title">Independent Senior Living</h4>
                  <p className="fundraise-1-text">Comfortable community lifestyle for active senior residents.</p>
                  <div className="fundraise-1-skill-item">
                    <div className="fundraise-1-skill-bar">
                      <div className="progressbar-1-outer">
                        <div className="progressbar-1-inner progress-line" data-width="85">
                          <div className="progressbar-1-percentage">
                            <div className="count-box"><span className="count-text" data-speed="2000" data-stop="85">0</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fundraise-1-price d-flex align-items-center justify-content-between">
                    <div className="fundraise-1-raise">Community</div>
                    <div className="fundraise-1-target">Active Living</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Bedridden Care */}
            <div className="col-lg-4 col-md-6">
              <div className="fundraise-1-block wow fadeInLeft" data-wow-delay=".2s" data-wow-duration=".8s">
                <div className="fundraise-1-image">
                  <img src="/images/resource/program-1.jpg" alt="Bedridden Care" />
                  {/* <img src="/images/imageplaceholder.jpg" alt="Bedridden Care" /> */}
                  <div className="fundraise-1-link-btn">
                    <Link to="/services/bedridden-care" className="btn-1 btn-small">Read More<span></span></Link>
                  </div>
                </div>
                <div className="fundraise-1-content alt">
                  <h4 className="fundraise-1-title">Bedridden Care</h4>
                  <p className="fundraise-1-text">Dedicated support for fully dependent senior residents.</p>
                  <div className="fundraise-1-skill-item">
                    <div className="fundraise-1-skill-bar">
                      <div className="progressbar-1-outer">
                        <div className="progressbar-1-inner progress-line" data-width="95">
                          <div className="progressbar-1-percentage">
                            <div className="count-box"><span className="count-text" data-speed="2000" data-stop="95">0</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fundraise-1-price d-flex align-items-center justify-content-between">
                    <div className="fundraise-1-raise">24/7 Nursing</div>
                    <div className="fundraise-1-target">Full Care</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logo Section */}
      {/* <div className="client-logo-1">
        <div className="auto-container">
          <div className="row align-items-center">
            <div className="col-xl-2 col-lg-3 col-md-4">
              <div className="client-logo-1-image"><img src="/assets/images/clients-logo/brand-logo-1.png" alt="Partner 1" /></div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4">
              <div className="client-logo-1-image"><img src="/assets/images/clients-logo/brand-logo-2.png" alt="Partner 2" /></div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4">
              <div className="client-logo-1-image"><img src="/assets/images/clients-logo/brand-logo-3.png" alt="Partner 3" /></div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4">
              <div className="client-logo-1-image"><img src="/assets/images/clients-logo/brand-logo-4.png" alt="Partner 4" /></div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4">
              <div className="client-logo-1-image"><img src="/assets/images/clients-logo/brand-logo-5.png" alt="Partner 5" /></div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Video Section */}
      <section className="video-1-section alt">
        <div className="video-1-bg" style={{ backgroundImage: 'url(/images/resource/videoplaceholder.jpg)' }} data-parallax='{"y": 50}'></div>
        <div className="auto-container">
          <div className="video-1-video-btn">
            <a href="/images/resource/video.mov" className="overlay-link play-now ripple" data-fancybox="video-1" data-caption="">
              <i className="icon-10"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Service Section - Style 4 */}
      <section className="service-4-section">
        <div className="auto-container">
          <div className="section_heading text-center mb_60">
            <span className="section_heading_title_small">What We Offer</span>
            <h2 className="section_heading_title_big">Everyone Deserves Our <br /> Best Services</h2>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="service-4-block text-center wow fadeInLeft" data-wow-delay=".2s" data-wow-duration=".8s">
                <div className="service-4-icon"><i className="icon-6"></i></div>
                <h4 className="service-4-title"><Link to="/service-details">Assisted Living</Link></h4>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="service-4-block text-center wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1s">
                <div className="service-4-icon"><i className="icon-7"></i></div>
                <h4 className="service-4-title"><Link to="/service-details">Medical & Health</Link></h4>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="service-4-block text-center wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1.2s">
                <div className="service-4-icon"><i className="icon-8"></i></div>
                <h4 className="service-4-title"><Link to="/service-details">Residential Care</Link></h4>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="service-4-block text-center wow fadeInLeft" data-wow-delay=".2s" data-wow-duration="1.4s">
                <div className="service-4-icon"><i className="icon-35"></i></div>
                <h4 className="service-4-title"><Link to="/service-details">Nursing Care</Link></h4>
              </div>
            </div>
          </div>
          <div className="service-4-link-btn text-center">
            <Link to="/services" className="btn-1">More Services<span></span></Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-1-section pt-0">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="faq-1-image">
                <div className="faq-1-shape"><img src="/assets/images/shape/pattern-1.png" alt="" /></div>
                <div className="faq-2-shape"><img src="/assets/images/shape/pattern-1.png" alt="" /></div>
                <img src="/images/resource/FAQ.jpg" alt="FAQ" />
                {/* <img src="/images/imageplaceholder.jpg" alt="FAQ" /> */}
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
                  <li className={`accordion block ${activeAccordion === 0 ? 'active-block' : ''}`}>
                    <div 
                      className={`acc-btn ${activeAccordion === 0 ? 'active' : ''}`}
                      onClick={() => setActiveAccordion(activeAccordion === 0 ? -1 : 0)}
                    >
                      <div className="icon-outer"><span className="far fa-plus"></span> <span className="far fa-minus"></span></div>
                      What services does Happy Homes offer?
                    </div>
                    <div className={`acc-content ${activeAccordion === 0 ? 'current' : ''}`}>
                      <div className="content">
                        <div className="text">Happy Homes provides Independent Living, Assisted Living, and Skilled Nursing Care for seniors. Our services include 24×7 trained nursing & caregiver support, daily vitals monitoring, medication management, doctor visits, nutritious vegetarian meals, housekeeping, laundry, social activities, physiotherapy, occupational therapy, and assistance with daily living.</div>
                      </div>
                    </div>
                  </li>
                  <li className={`accordion block ${activeAccordion === 1 ? 'active-block' : ''}`}>
                    <div 
                      className={`acc-btn ${activeAccordion === 1 ? 'active' : ''}`}
                      onClick={() => setActiveAccordion(activeAccordion === 1 ? -1 : 1)}
                    >
                      <div className="icon-outer"><span className="far fa-plus"></span> <span className="far fa-minus"></span></div>
                      What is the admission process?
                    </div>
                    <div className={`acc-content ${activeAccordion === 1 ? 'current' : ''}`}>
                      <div className="content">
                        <div className="text">Our admission process involves: 1) Book an appointment/tour, 2) Assessment by our Care Team, 3) Selection of care plan, 4) Documentation & agreement, 5) Payment of deposit, 6) Move-in & orientation. Our team guides you through each step.</div>
                      </div>
                    </div>
                  </li>
                  <li className={`accordion block ${activeAccordion === 2 ? 'active-block' : ''}`}>
                    <div 
                      className={`acc-btn ${activeAccordion === 2 ? 'active' : ''}`}
                      onClick={() => setActiveAccordion(activeAccordion === 2 ? -1 : 2)}
                    >
                      <div className="icon-outer"><span className="far fa-plus"></span> <span className="far fa-minus"></span></div>
                      Can residents request food of their choice?
                    </div>
                    <div className={`acc-content ${activeAccordion === 2 ? 'current' : ''}`}>
                      <div className="content">
                        <div className="text">Yes. We offer a wholesome vegetarian meal plan and consider individual preferences, allergies, soft food / liquid diets, and festival-specific or fasting meals. Special medical diets may be supported depending on feasibility.</div>
                      </div>
                    </div>
                  </li>
                  <li className={`accordion block ${activeAccordion === 3 ? 'active-block' : ''}`}>
                    <div 
                      className={`acc-btn ${activeAccordion === 3 ? 'active' : ''}`}
                      onClick={() => setActiveAccordion(activeAccordion === 3 ? -1 : 3)}
                    >
                      <div className="icon-outer"><span className="far fa-plus"></span> <span className="far fa-minus"></span></div>
                      Is short-term/temporary stay available?
                    </div>
                    <div className={`acc-content ${activeAccordion === 3 ? 'current' : ''}`}>
                      <div className="content">
                        <div className="text">Yes. Happy Homes offers short-term respite care, post-surgery recovery care, temporary stays for caregivers' holidays, and trial stays for families to experience our facility before making a long-term commitment.</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="faq-link-btn mt_30">
                <Link to="/faq" className="btn-1">View All FAQs<span></span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-2-section theme-gray-bg">
        <div className="auto-container">
          <div className="section_heading text-center mb_70">
            <span className="section_heading_title_small">Exclusive Team</span>
            <h2 className="section_heading_title_big">We Have A Professional Team <br /> Members</h2>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="team-2-block">
                <div className="team-2-image">
                  <div className="team-2-image-wrap"><img src="/images/resource/member.jpg" alt="Management" /></div>
                  <div className="team-2-share-icon-area">
                    <ul className="team-2-social-icon">
                      <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                    </ul>
                    <div className="team-2-share-icon"><i className="icon-11"></i></div>
                  </div>
                </div>
                <h4 className="team-2-title">Management</h4>
                <p className="team-2-designaiton">Management Team</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-2-block">
                <div className="team-2-image">
                  <div className="team-2-image-wrap"><img src="/images/resource/member.jpg" alt="Doctor" /></div>
                  <div className="team-2-share-icon-area">
                    <ul className="team-2-social-icon">
                      <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                    </ul>
                    <div className="team-2-share-icon"><i className="icon-11"></i></div>
                  </div>
                </div>
                <h4 className="team-2-title">Doctor</h4>
                <p className="team-2-designaiton">Medical Team</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-2-block">
                <div className="team-2-image">
                  <div className="team-2-image-wrap"><img src="/images/resource/member.jpg" alt="Nursing" /></div>
                  <div className="team-2-share-icon-area">
                    <ul className="team-2-social-icon">
                      <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                    </ul>
                    <div className="team-2-share-icon"><i className="icon-11"></i></div>
                  </div>
                </div>
                <h4 className="team-2-title">Nursing</h4>
                <p className="team-2-designaiton">Nursing Team</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-2-block">
                <div className="team-2-image">
                  <div className="team-2-image-wrap"><img src="/images/resource/member.jpg" alt="Care Takers" /></div>
                  <div className="team-2-share-icon-area">
                    <ul className="team-2-social-icon">
                      <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                    </ul>
                    <div className="team-2-share-icon"><i className="icon-11"></i></div>
                  </div>
                </div>
                <h4 className="team-2-title">Care Takers</h4>
                <p className="team-2-designaiton">Care Team</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-2-block">
                <div className="team-2-image">
                  <div className="team-2-image-wrap"><img src="/images/resource/member.jpg" alt="Kitchen" /></div>
                  <div className="team-2-share-icon-area">
                    <ul className="team-2-social-icon">
                      <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                    </ul>
                    <div className="team-2-share-icon"><i className="icon-11"></i></div>
                  </div>
                </div>
                <h4 className="team-2-title">Kitchen</h4>
                <p className="team-2-designaiton">Kitchen Team</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-2-block">
                <div className="team-2-image">
                  <div className="team-2-image-wrap"><img src="/images/resource/member.jpg" alt="Dining" /></div>
                  <div className="team-2-share-icon-area">
                    <ul className="team-2-social-icon">
                      <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                    </ul>
                    <div className="team-2-share-icon"><i className="icon-11"></i></div>
                  </div>
                </div>
                <h4 className="team-2-title">Dining</h4>
                <p className="team-2-designaiton">Dining Team</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-2-block">
                <div className="team-2-image">
                  <div className="team-2-image-wrap"><img src="/images/resource/member.jpg" alt="House Keeping" /></div>
                  <div className="team-2-share-icon-area">
                    <ul className="team-2-social-icon">
                      <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                    </ul>
                    <div className="team-2-share-icon"><i className="icon-11"></i></div>
                  </div>
                </div>
                <h4 className="team-2-title">House Keeping</h4>
                <p className="team-2-designaiton">House Keeping Team</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-2-block">
                <div className="team-2-image">
                  <div className="team-2-image-wrap"><img src="/images/resource/member.jpg" alt="Maintenance" /></div>
                  <div className="team-2-share-icon-area">
                    <ul className="team-2-social-icon">
                      <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                    </ul>
                    <div className="team-2-share-icon"><i className="icon-11"></i></div>
                  </div>
                </div>
                <h4 className="team-2-title">Maintenance</h4>
                <p className="team-2-designaiton">Maintenance Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Funfact/Counter Section */}
      <section className="funfact-1-section alt">
        <div className="funfact-1-shape" style={{ backgroundImage: "url('/assets/images/shape/pattern-5.png')" }}></div>
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="funfact-1-block text-center">
                <div className="d-flex align-items-center justify-content-center">
                  <h2 className="funfact-1-number odometer" data-count="5">00</h2>
                  <h2 className="funfact-1-number-prefix">+</h2>
                </div>
                <p className="funfact-1-title">Years Experience</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="funfact-1-block">
                <div className="d-flex align-items-center justify-content-center">
                  <h2 className="funfact-1-number odometer" data-count="180">00</h2>
                  <h2 className="funfact-1-number-prefix">+</h2>
                </div>
                <p className="funfact-1-title">Happy Residents</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="funfact-1-block">
                <div className="d-flex align-items-center justify-content-center">
                  <h2 className="funfact-1-number odometer" data-count="50">00</h2>
                  <h2 className="funfact-1-number-prefix">+</h2>
                </div>
                <p className="funfact-1-title">Expert Staff</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="funfact-1-block">
                <div className="d-flex align-items-center justify-content-center">
                  <h2 className="funfact-1-number odometer" data-count="100">00</h2>
                  <h2 className="funfact-1-number-prefix">%</h2>
                </div>
                <p className="funfact-1-title">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-1-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-4">
              <div className="section_heading mb_20">
                <span className="section_heading_title_small">Testimonials</span>
                <h2 className="section_heading_title_big">What <br /> They're Say <br /> About Us?</h2>
              </div>
              <p className="testimonial-1-desc">Hear from families who have trusted us with <br /> the care of their loved ones.</p>
              <div className="slider-nav-style-2 testimonial-1-nav">
                <div className="slider-control slider-button-prev"><span><i className="icon-5"></i></span></div>
                <div className="slider-control slider-button-next"><span><i className="icon-4"></i></span></div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="testimonial-1-block-wrap">
                <div className="testimonial-1-shape-1"><img src="/assets/images/shape/pattern-1.png" alt="" /></div>
                <div className="testimonial-1-shape-2"><img src="/assets/images/shape/pattern-1.png" alt="" /></div>
                <div className="swiper-container two-item-carousel">
                  <div className="swiper-wrapper">
                    {/* Testimonial 1 */}
                    <div className="swiper-slide">
                      <div className="testimonial-1-block">
                        <div className="testimonial-1-author-thumb">
                          <img src="/images/resource/member.jpg" alt="Ramesh Patil" />
                          {/* <img src="/images/imageplaceholder.jpg" alt="Ramesh Patil" /> */}
                          <div className="testimonial-1-quote-icon"><i className="icon-25"></i></div>
                        </div>
                        <p className="testimonial-1-review-desc">"The care my mother receives at Happy Homes is exceptional. The staff treats her like family, and I can see how happy she is. The facilities are clean, and the activities keep her engaged and joyful."</p>
                        <div className="testimonial-1-rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                        <h4 className="testimonial-1-name">Ramesh Patil</h4>
                        <p className="testimonial-1-designation">Son of Resident</p>
                      </div>
                    </div>
                    {/* Testimonial 2 */}
                    <div className="swiper-slide">
                      <div className="testimonial-1-block">
                        <div className="testimonial-1-author-thumb">
                          <img src="/images/resource/member.jpg" alt="Sunita Deshpande" />
                          {/* <img src="/images/imageplaceholder.jpg" alt="Sunita Deshpande" /> */}
                          <div className="testimonial-1-quote-icon"><i className="icon-25"></i></div>
                        </div>
                        <p className="testimonial-1-review-desc">"Finding Happy Homes was a blessing. My father's health has improved significantly since moving here. The medical care is top-notch, and the staff genuinely cares about each resident's well-being."</p>
                        <div className="testimonial-1-rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="far fa-star"></i>
                        </div>
                        <h4 className="testimonial-1-name">Sunita Deshpande</h4>
                        <p className="testimonial-1-designation">Daughter of Resident</p>
                      </div>
                    </div>
                    {/* Testimonial 3 */}
                    <div className="swiper-slide">
                      <div className="testimonial-1-block">
                        <div className="testimonial-1-author-thumb">
                          <img src="/images/resource/member.jpg" alt="Dr. Anil Mehta" />
                          {/* <img src="/images/imageplaceholder.jpg" alt="Dr. Anil Mehta" /> */}
                          <div className="testimonial-1-quote-icon"><i className="icon-25"></i></div>
                        </div>
                        <p className="testimonial-1-review-desc">"I was hesitant at first, but Happy Homes exceeded all my expectations. The 24/7 nursing care and the warm atmosphere made my grandmother feel at home from day one."</p>
                        <div className="testimonial-1-rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                        <h4 className="testimonial-1-name">Dr. Anil Mehta</h4>
                        <p className="testimonial-1-designation">Family Member</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Events Section */}
      {/* <section className="event-1-section">
        <div className="auto-container">
          <div className="section_heading text-center mb_60">
            <span className="section_heading_title_small">Events</span>
            <h2 className="section_heading_title_big">Let's Join to Our <br /> Next <span>Events</span></h2>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="event-2-block d-flex wow fadeInLeft" data-wow-delay=".2s" data-wow-duration=".8s">
                <div className="event-2-image">
                  <Link to="/events"><img src="/images/resource/nevent-1.jpg" alt="Event" /></Link>
                </div>
                <div className="event-2-bottom-content">
                  <div className="event-2-date"><span>15 </span><br /> JAN</div>
                  <h4 className="event-2-title"><Link to="/events">Independent Living for <br /> Senior Couples</Link></h4>
                  <ul className="d-flex event-2-meta-info">
                    <li><i className="icon-21"></i>Happy Homes, Pune</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="event-2-block d-flex wow fadeInLeft" data-wow-delay=".2s" data-wow-duration=".8s">
                <div className="event-2-image">
                  <Link to="/events"><img src="/images/resource/nevent-2.jpg" alt="Event" /></Link>
                </div>
                <div className="event-2-bottom-content">
                  <div className="event-2-date"><span>22 </span><br /> JAN</div>
                  <h4 className="event-2-title"><Link to="/events">Happiness Is Main Goals <br /> To Our Service Life</Link></h4>
                  <ul className="d-flex event-2-meta-info">
                    <li><i className="icon-21"></i>Happy Homes, Pune</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="event-2-block d-flex wow fadeInLeft" data-wow-delay=".2s" data-wow-duration=".8s">
                <div className="event-2-image">
                  <Link to="/events"><img src="/images/resource/nevent-1.jpg" alt="Event" /></Link>
                </div>
                <div className="event-2-bottom-content">
                  <div className="event-2-date"><span>05 </span><br /> FEB</div>
                  <h4 className="event-2-title"><Link to="/events">Wellness Workshop for <br /> Senior Citizens</Link></h4>
                  <ul className="d-flex event-2-meta-info">
                    <li><i className="icon-21"></i>Happy Homes, Pune</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="event-2-block d-flex wow fadeInLeft" data-wow-delay=".2s" data-wow-duration=".8s">
                <div className="event-2-image">
                  <Link to="/events"><img src="/images/resource/nevent-2.jpg" alt="Event" /></Link>
                </div>
                <div className="event-2-bottom-content">
                  <div className="event-2-date"><span>14 </span><br /> FEB</div>
                  <h4 className="event-2-title"><Link to="/events">Valentine's Day <br /> Celebration</Link></h4>
                  <ul className="d-flex event-2-meta-info">
                    <li><i className="icon-21"></i>Happy Homes, Pune</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Blog Section */}
      {/* <section className="blog-1-section">
        <div className="auto-container">
          <div className="section_heading text-center mb_60">
            <span className="section_heading_title_small">Articles</span>
            <h2 className="section_heading_title_big">Get More Update From <br /> Happy Homes</h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="blog-1-block wow fadeInLeft" data-wow-delay=".2s" data-wow-duration=".8s">
                <div className="blog-1-image">
                  <Link to="/blog"><img src="/assets/images/resource/blog-1.jpg" alt="Blog" /></Link>
                  <div className="blog-1-date"><span>15 </span><br /> JAN</div>
                </div>
                <div className="blog-1-bottom-content alt">
                  <h4 className="blog-1-title"><Link to="/blog">How to Handle Unexpected Situations with Elderly</Link></h4>
                  <ul className="d-flex blog-1-meta-info">
                    <li><i className="icon-12"></i>Admin</li>
                    <li><i className="icon-13"></i>5 Comments</li>
                  </ul>
                  <p className="blog-1-excerpt">Tips and guidance for dealing with common challenges when caring for senior citizens at home or in care facilities.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="blog-1-block wow fadeInLeft" data-wow-delay=".2s" data-wow-duration=".8s">
                <div className="blog-1-image">
                  <Link to="/blog"><img src="/assets/images/resource/blog-2.jpg" alt="Blog" /></Link>
                  <div className="blog-1-date"><span>20</span> <br /> JAN</div>
                </div>
                <div className="blog-1-bottom-content alt">
                  <h4 className="blog-1-title"><Link to="/blog">Nutrition Guide for Seniors: Healthy Eating Tips</Link></h4>
                  <ul className="d-flex blog-1-meta-info">
                    <li><i className="icon-12"></i>Admin</li>
                    <li><i className="icon-13"></i>3 Comments</li>
                  </ul>
                  <p className="blog-1-excerpt">Discover the best dietary practices and meal plans specifically designed for the nutritional needs of elderly individuals.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInLeft" data-wow-delay=".2s" data-wow-duration=".8s">
              <div className="blog-1-block">
                <div className="blog-1-image">
                  <Link to="/blog"><img src="/assets/images/resource/blog-3.jpg" alt="Blog" /></Link>
                  <div className="blog-1-date"><span>25 </span><br /> JAN</div>
                </div>
                <div className="blog-1-bottom-content alt">
                  <h4 className="blog-1-title"><Link to="/blog">5 Ways To Help Seniors Fight Loneliness</Link></h4>
                  <ul className="d-flex blog-1-meta-info">
                    <li><i className="icon-12"></i>Admin</li>
                    <li><i className="icon-13"></i>8 Comments</li>
                  </ul>
                  <p className="blog-1-excerpt">Practical strategies and activities to help combat isolation and promote social connections for elderly loved ones.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default Home;
