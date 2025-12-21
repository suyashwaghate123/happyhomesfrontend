import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    // Initialize WOW.js for scroll animations
    if (typeof window.WOW !== 'undefined') {
      new window.WOW().init();
    }
  }, []);

  return (
    <>
      {/* Page Title */}
      <div className="page-title" style={{ backgroundImage: 'url(/images/resource/pageheaderimage.jpg)' }}>
        <div className="auto-container">
          <h1>About Us</h1>
        </div>
      </div>
      <div className="bredcrumb-wrap">
        <div className="auto-container">
          <ul className="bredcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>About Us</li>
          </ul>
        </div>
      </div>

      {/* About Section */}
      <section className="about-1-section">
        <div className="auto-container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-1-image-wrap wow fadeInLeft" data-wow-delay=".2s">
                <div className="about-1-shape-1"><img src="/assets/images/shape/pattern-1.png" alt="" /></div>
                <div className="about-1-shape-2"><img src="/assets/images/shape/pattern-1.png" alt="" /></div>
                <div className="about-1-image-1">
                  <img src="/images/resource/aboutus.jpg" alt="About Happy Homes" />
                </div>
                <div className="about-1-video-area">
                  <div className="about-1-video-btn">
                    <a href="/images/resource/video.mov" className="overlay-link play-now ripple" data-fancybox="video" data-caption="">
                      <i className="icon-10"></i>
                    </a>
                  </div>
                  <p className="about-1-video-title">Watch Exclusive <br /> Video</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ps-lg-5">
              <div className="section_heading mb_20">
                <span className="section_heading_title_small">About Happy Homes</span>
                <h2 className="section_heading_title_big">Learn About Our <br /> <span>Happy Homes</span> Professional <br /> Senior Care Facility</h2>
              </div>
              <p className="about-1-desc">Happy Homes is a premier old age care facility dedicated to providing compassionate, professional care for senior citizens. Founded with a mission to create a loving home environment, we ensure that every resident feels valued, respected, and cared for.</p>
              <p className="about-1-desc">Our state-of-the-art facility combines modern healthcare with traditional values, offering a perfect blend of medical care, recreational activities, and emotional support.</p>
              <ul className="about-1-list">
                <li><i className="icon-17"></i> 24/7 Professional Nursing Care</li>
                <li><i className="icon-17"></i> Modern Medical Facilities</li>
                <li><i className="icon-17"></i> Nutritious Home-Cooked Meals</li>
                <li><i className="icon-17"></i> Regular Health Checkups</li>
                <li><i className="icon-17"></i> Recreational & Social Activities</li>
                <li><i className="icon-17"></i> Peaceful Garden & Common Areas</li>
              </ul>
              <div className="about-1-link-btn mt_30">
                <Link to="/services" className="btn-1">Our Services <span></span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section theme-gray-bg">
        <div className="auto-container">
          <div className="section_heading text-center mb_60">
            <span className="section_heading_title_small">Our Purpose</span>
            <h2 className="section_heading_title_big">Mission & Vision</h2>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="mission-box wow fadeInLeft" data-wow-delay=".2s">
                <div className="mission-icon">
                  <i className="icon-6"></i>
                </div>
                <h3>Our Mission</h3>
                <p>To provide exceptional care and support for senior citizens in a safe, nurturing environment that promotes dignity, independence, and quality of life. We are committed to treating every resident like family.</p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="mission-box wow fadeInLeft" data-wow-delay=".4s">
                <div className="mission-icon">
                  <i className="icon-7"></i>
                </div>
                <h3>Our Vision</h3>
                <p>To be the most trusted and compassionate senior care facility in Pune, setting the standard for elderly care through innovation, excellence, and heartfelt service. Every senior deserves a happy home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="auto-container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section_heading mb_30">
                <span className="section_heading_title_small">Why Choose Us</span>
                <h2 className="section_heading_title_big">What Makes <br /> <span>Happy Homes</span> Special</h2>
              </div>
              <div className="why-choose-content">
                <div className="why-choose-item d-flex wow fadeInLeft" data-wow-delay=".2s">
                  <div className="why-choose-icon">
                    <i className="icon-35"></i>
                  </div>
                  <div className="why-choose-text">
                    <h4>Experienced Medical Staff</h4>
                    <p>Our team includes qualified doctors, nurses, and caregivers with years of experience in elderly care.</p>
                  </div>
                </div>
                <div className="why-choose-item d-flex wow fadeInLeft" data-wow-delay=".4s">
                  <div className="why-choose-icon">
                    <i className="icon-8"></i>
                  </div>
                  <div className="why-choose-text">
                    <h4>Home-Like Environment</h4>
                    <p>We create a warm, family atmosphere where residents feel comfortable and loved.</p>
                  </div>
                </div>
                <div className="why-choose-item d-flex wow fadeInLeft" data-wow-delay=".6s">
                  <div className="why-choose-icon">
                    <i className="icon-36"></i>
                  </div>
                  <div className="why-choose-text">
                    <h4>Personalized Care Plans</h4>
                    <p>Every resident receives individualized care based on their unique health needs and preferences.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="why-choose-image wow fadeInRight" data-wow-delay=".2s">
                <img src="/images/resource/FAQ.jpg" alt="Why Choose Us" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="funfact-1-section">
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
              <div className="funfact-1-block text-center">
                <div className="d-flex align-items-center justify-content-center">
                  <h2 className="funfact-1-number odometer" data-count="180">00</h2>
                  <h2 className="funfact-1-number-prefix">+</h2>
                </div>
                <p className="funfact-1-title">Happy Residents</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="funfact-1-block text-center">
                <div className="d-flex align-items-center justify-content-center">
                  <h2 className="funfact-1-number odometer" data-count="50">00</h2>
                  <h2 className="funfact-1-number-prefix">+</h2>
                </div>
                <p className="funfact-1-title">Expert Staff</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="funfact-1-block text-center">
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

      {/* Team Section */}
      {/* <section className="team-2-section theme-gray-bg">
        <div className="auto-container">
          <div className="section_heading text-center mb_70">
            <span className="section_heading_title_small">Our Team</span>
            <h2 className="section_heading_title_big">Meet Our Dedicated <br /> Team Members</h2>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="team-2-block wow fadeInLeft" data-wow-delay=".2s">
                <div className="team-2-image">
                  <div className="team-2-image-wrap"><img src="/images/resource/member.jpg" alt="Dr. Rajesh Sharma" /></div>
                  <div className="team-2-share-icon-area">
                    <ul className="team-2-social-icon">
                      <li><a href="https://www.facebook.com/profile.php?id=61585323246449" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="https://x.com/HappyHomesCare" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="https://www.instagram.com/happyhomescare/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                      <li><a href="https://www.youtube.com/@HappyHomesCarePune" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                    </ul>
                    <div className="team-2-share-icon"><i className="icon-11"></i></div>
                  </div>
                </div>
                <h4 className="team-2-title">Dr. Rajesh Sharma</h4>
                <p className="team-2-designaiton">Medical Director</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-2-block wow fadeInLeft" data-wow-delay=".4s">
                <div className="team-2-image">
                  <div className="team-2-image-wrap"><img src="/images/resource/member.jpg" alt="Priya Patel" /></div>
                  <div className="team-2-share-icon-area">
                    <ul className="team-2-social-icon">
                      <li><a href="https://www.facebook.com/profile.php?id=61585323246449" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="https://x.com/HappyHomesCare" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="https://www.instagram.com/happyhomescare/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                      <li><a href="https://www.youtube.com/@HappyHomesCarePune" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                    </ul>
                    <div className="team-2-share-icon"><i className="icon-11"></i></div>
                  </div>
                </div>
                <h4 className="team-2-title">Priya Patel</h4>
                <p className="team-2-designaiton">Head Nurse</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-2-block wow fadeInLeft" data-wow-delay=".6s">
                <div className="team-2-image">
                  <div className="team-2-image-wrap"><img src="/images/resource/member.jpg" alt="Anita Desai" /></div>
                  <div className="team-2-share-icon-area">
                    <ul className="team-2-social-icon">
                      <li><a href="https://www.facebook.com/profile.php?id=61585323246449" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="https://x.com/HappyHomesCare" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="https://www.instagram.com/happyhomescare/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                      <li><a href="https://www.youtube.com/@HappyHomesCarePune" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                    </ul>
                    <div className="team-2-share-icon"><i className="icon-11"></i></div>
                  </div>
                </div>
                <h4 className="team-2-title">Anita Desai</h4>
                <p className="team-2-designaiton">Care Manager</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="team-2-block wow fadeInLeft" data-wow-delay=".8s">
                <div className="team-2-image">
                  <div className="team-2-image-wrap"><img src="/images/resource/member.jpg" alt="Vikram Singh" /></div>
                  <div className="team-2-share-icon-area">
                    <ul className="team-2-social-icon">
                      <li><a href="https://www.facebook.com/profile.php?id=61585323246449" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="https://x.com/HappyHomesCare" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="https://www.instagram.com/happyhomescare/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                      <li><a href="https://www.youtube.com/@HappyHomesCarePune" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>
                    </ul>
                    <div className="team-2-share-icon"><i className="icon-11"></i></div>
                  </div>
                </div>
                <h4 className="team-2-title">Vikram Singh</h4>
                <p className="team-2-designaiton">Physiotherapist</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="cta-1-section">
        <div className="cta-1-bg" style={{ backgroundImage: 'url(/images/resource/videoplaceholder.jpg)' }}></div>
        <div className="auto-container">
          <div className="section_heading text-center mb_40">
            <span className="section_heading_title_small alt">Schedule a Visit</span>
            <h2 className="section_heading_title_big alt">Come Visit Us & <br /> See For <span>Yourself</span></h2>
          </div>
          <div className="text-center">
            <div className="cta-1-desc">Experience our caring environment firsthand. Schedule a tour <br /> of Happy Homes and see how we can help your loved ones.</div>
            <div className="cta-1-link-bt">
              <Link to="/contact" className="btn-1">Schedule a Visit <span></span></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
