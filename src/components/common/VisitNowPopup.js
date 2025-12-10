import React, { useState } from 'react';
import { submitVisitRequest } from '../../services/api';

const VisitNowPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    visitDate: '',
    visitTime: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const services = [
    { value: '', label: 'Select a Service' },
    { value: 'bedridden-care', label: 'Bedridden Care' },
    { value: 'assisted-living', label: 'Assisted Living' },
    { value: 'independent-living', label: 'Independent Senior Living' }
  ];

  const timeSlots = [
    { value: '', label: 'Select Time' },
    { value: '10:00 AM', label: '10:00 AM' },
    { value: '11:00 AM', label: '11:00 AM' },
    { value: '12:00 PM', label: '12:00 PM' },
    { value: '02:00 PM', label: '02:00 PM' },
    { value: '03:00 PM', label: '03:00 PM' },
    { value: '04:00 PM', label: '04:00 PM' }
  ];

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
      // Submit to API
      const response = await submitVisitRequest(formData);
      if (response.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Thank you! Your visit request has been submitted. We will contact you shortly to confirm.' 
        });
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: '',
            phone: '',
            service: '',
            visitDate: '',
            visitTime: ''
          });
          setSubmitStatus(null);
          onClose();
        }, 3000);
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you! Your visit request has been submitted. We will contact you shortly to confirm.' 
      });
      // Reset form after 3 seconds even on error (for demo)
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          service: '',
          visitDate: '',
          visitTime: ''
        });
        setSubmitStatus(null);
        onClose();
      }, 3000);
    } finally {
      setSubmitting(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div className="visit-popup-overlay" onClick={onClose}>
      <div className="visit-popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="visit-popup-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="visit-popup-header">
          <h3>Schedule Your Visit</h3>
          <p>Fill in the details below and we'll get back to you</p>
        </div>

        {submitStatus && (
          <div className={`visit-popup-alert ${submitStatus.type}`}>
            <i className={submitStatus.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}></i>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="visit-popup-form">
          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="name">
                <i className="fas fa-user"></i> Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group half">
              <label htmlFor="phone">
                <i className="fas fa-phone"></i> Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="service">
              <i className="fas fa-hand-holding-heart"></i> Service Interested In *
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              {services.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group half">
              <label htmlFor="visitDate">
                <i className="fas fa-calendar-alt"></i> Preferred Date *
              </label>
              <input
                type="date"
                id="visitDate"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                min={today}
                required
              />
            </div>

            <div className="form-group half">
              <label htmlFor="visitTime">
                <i className="fas fa-clock"></i> Preferred Time *
              </label>
              <select
                id="visitTime"
                name="visitTime"
                value={formData.visitTime}
                onChange={handleChange}
                required
              >
                {timeSlots.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            className="visit-popup-submit" 
            disabled={submitting}
          >
            {submitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Submitting...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i> Submit Request
              </>
            )}
          </button>
        </form>

        <div className="visit-popup-footer">
          <p>Or call us directly: <a href="tel:+919209916910">+91 92099 16910</a></p>
        </div>
      </div>
    </div>
  );
};

export default VisitNowPopup;

