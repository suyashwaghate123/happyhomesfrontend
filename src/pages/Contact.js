import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    // Initialize WOW.js
    if (typeof window.WOW !== 'undefined') {
      new window.WOW().init();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await api.submitContactForm(formData);
      if (response.success) {
        setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully. We will contact you soon.' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: 'general'
        });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again or call us directly.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Page Title */}
      <div className="page-title" style={{ backgroundImage: 'url(/assets/images/background/page-title.jpg)' }}>
        <div className="auto-container">
          <h1>Contact Us</h1>
        </div>
      </div>
      <div className="bredcrumb-wrap">
        <div className="auto-container">
          <ul className="bredcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>

      {/* Quick Contact Info */}
      <section className="contact-info-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="quick-contact-box text-center wow fadeInLeft" data-wow-delay=".2s">
                <div className="icon">
                  <i className="icon-14"></i>
                </div>
                <h4>Our Location</h4>
                <p>Happy Homes Care, Sai Satyam Park,<br />Khandve Nagar, Wagholi, Pune,<br />Maharashtra 412207</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="quick-contact-box text-center wow fadeInLeft" data-wow-delay=".4s">
                <div className="icon">
                  <i className="icon-2"></i>
                </div>
                <h4>Phone Number</h4>
                <p><a href="tel:+919209916910">+91 92099 16910</a></p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="quick-contact-box text-center wow fadeInLeft" data-wow-delay=".6s">
                <div className="icon">
                  <i className="icon-3"></i>
                </div>
                <h4>Email Address</h4>
                <p><a href="mailto:info@happyhomes.com">info@happyhomes.com</a></p>
                <p><a href="mailto:admissions@happyhomes.com">admissions@happyhomes.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="contact-form-section">
        <div className="auto-container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-form-wrap wow fadeInLeft" data-wow-delay=".2s">
                <div className="section_heading mb_30">
                  <span className="section_heading_title_small">Get In Touch</span>
                  <h2 className="section_heading_title_big">Send Us A <span>Message</span></h2>
                </div>
                <p className="mb_30">Have questions about our services or want to schedule a visit? Fill out the form below and our team will get back to you within 24 hours.</p>

                {submitStatus && (
                  <div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-danger'} mb-4`}>
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name *"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your Email *"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number *"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleChange}
                        >
                          <option value="general">General Inquiry</option>
                          <option value="admission">Admission Inquiry</option>
                          <option value="visit">Schedule a Visit</option>
                          <option value="pricing">Pricing Information</option>
                          <option value="career">Career Inquiry</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your Message"
                          rows="5"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button type="submit" className="btn-1" disabled={submitting}>
                        {submitting ? 'Sending...' : 'Send Message'}
                        <span></span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-map-wrap wow fadeInRight" data-wow-delay=".2s">
                <div className="section_heading mb_30">
                  <span className="section_heading_title_small">Find Us</span>
                  <h2 className="section_heading_title_big">Our <span>Location</span></h2>
                </div>
                <div className="contact-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.5!2d73.9768!3d18.5806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3c1%3A0x6f7b2b3c3d4e5f6a!2sWagholi%2C%20Pune%2C%20Maharashtra%20412207!5e0!3m2!1sen!2sin!4v1701234567890"
                    width="100%"
                    height="400"
                    style={{ border: 0, borderRadius: '20px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Happy Homes Location - Wagholi, Pune"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp & Social Section */}
      <section className="social-contact-section theme-gray-bg">
        <div className="auto-container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="section_heading mb_30">
                <span className="section_heading_title_small">Connect With Us</span>
                <h2 className="section_heading_title_big">Quick <span>Communication</span></h2>
              </div>
              <p>Prefer instant communication? Reach out to us via WhatsApp for quick responses or connect with us on social media.</p>
              <div className="social-buttons mt_30">
                <a href="https://wa.me/919209916910" target="_blank" rel="noopener noreferrer" className="btn-1 btn-whatsapp">
                  <i className="fab fa-whatsapp me-2"></i> Chat on WhatsApp
                  <span></span>
                </a>
              </div>
              <div className="social-icons mt_30">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="working-hours-box wow fadeInRight" data-wow-delay=".2s">
                <h3><i className="icon-1 me-2"></i> Working Hours</h3>
                <ul className="working-hours-list">
                  <li><span>Visiting Hours:</span> 9:00 AM - 8:00 PM (Daily)</li>
                  <li><span>Office Hours:</span> 9:00 AM - 6:00 PM (Mon-Sat)</li>
                  <li><span>Emergency:</span> 24/7 Available</li>
                  <li><span>Admissions:</span> By Appointment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-1-section">
        <div className="cta-1-bg" style={{ backgroundImage: 'url(/assets/images/background/parallax-bg.jpg)' }}></div>
        <div className="auto-container">
          <div className="section_heading text-center mb_40">
            <span className="section_heading_title_small alt">Schedule a Visit</span>
            <h2 className="section_heading_title_big alt">Book An <span>Appointment</span> <br /> Today!</h2>
          </div>
          <div className="text-center">
            <div className="cta-1-desc">Experience our caring environment firsthand. <br /> Call us now to schedule a tour of Happy Homes.</div>
            <div className="cta-1-link-bt">
              <a href="tel:+919209916910" className="btn-1">Call Now: +91 92099 16910 <span></span></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
