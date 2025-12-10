import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import LivingOptions from './pages/LivingOptions';
import Testimonials from './pages/Testimonials';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import NewEntryForm from './pages/NewEntryForm';

// API Service
import { getSiteSettings } from './services/api';

function App() {
  const location = useLocation();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        await getSiteSettings();
        // Settings fetched - will be used when admin panel is ready
      } catch (error) {
        console.error('Error fetching site settings:', error);
      }
    };

    fetchSettings();
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Re-initialize scripts on route change
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Re-initialize WOW.js
      if (typeof window.WOW !== 'undefined') {
        new window.WOW().init();
      }

      // Re-initialize accordion
      if (window.jQuery && window.jQuery('.accordion-box').length) {
        const $ = window.jQuery;
        $(".accordion-box").off('click', '.acc-btn').on('click', '.acc-btn', function() {
          var outerBox = $(this).parents('.accordion-box');
          var target = $(this).parents('.accordion');
          
          if($(this).hasClass('active')!==true){
            $(outerBox).find('.accordion .acc-btn').removeClass('active');
          }
          
          if ($(this).next('.acc-content').is(':visible')){
            return false;
          }else{
            $(this).addClass('active');
            $(outerBox).children('.accordion').removeClass('active-block');
            $(outerBox).find('.accordion').children('.acc-content').slideUp(300);
            target.addClass('active-block');
            $(this).next('.acc-content').slideDown(300);  
          }
        });
      }

      // Re-initialize progress bars
      if (window.jQuery && window.jQuery('.progress-line').length) {
        const $ = window.jQuery;
        $('.progress-line').each(function() {
          var el = $(this);
          var percent = el.data('width');
          $(el).css('width', percent + '%');
        });
      }

      // Re-initialize Odometer
      if (typeof window.Odometer !== 'undefined' && window.jQuery) {
        const $ = window.jQuery;
        $(".odometer").each(function () {
          var el = $(this);
          el.appear(function () {
            var countNumber = el.attr("data-count");
            el.html(countNumber);
          });
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="page-wrapper">
      <Header />
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service-details" element={<ServiceDetails />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/living-options" element={<LivingOptions />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/newentryform" element={<NewEntryForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
