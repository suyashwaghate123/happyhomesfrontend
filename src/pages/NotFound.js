import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const NotFound = () => {
  return (
    <>
      <PageTitle title="Page Not Found" />

      <section className="error-section section-padding">
        <div className="auto-container">
          <div className="error-content text-center">
            <div className="error-code">
              <h1>404</h1>
            </div>
            <h2>Oops! Page Not Found</h2>
            <p>
              The page you are looking for might have been removed, 
              had its name changed, or is temporarily unavailable.
            </p>
            <div className="error-buttons mt-4">
              <Link to="/" className="btn-1">
                <i className="fas fa-home me-2"></i>
                Go to Homepage
                <span></span>
              </Link>
              <Link to="/contact" className="btn-1 btn-alt ms-3">
                Contact Us
                <span></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;

