import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState({ isOpen: false, image: null, index: 0 });

  // Static gallery data
  const galleryImages = [
    { id: 1, image: '/assets/images/resource/service-1.jpg', title: 'Comfortable Rooms', category: 'rooms' },
    { id: 2, image: '/assets/images/resource/service-2.jpg', title: 'Medical Facility', category: 'medical' },
    { id: 3, image: '/assets/images/resource/service-3.jpg', title: 'Garden Area', category: 'garden' },
    { id: 4, image: '/assets/images/resource/service-4.jpg', title: 'Dining Hall', category: 'dining' },
    { id: 5, image: '/assets/images/resource/service-5.jpg', title: 'Recreation Room', category: 'recreation' },
    { id: 6, image: '/assets/images/resource/service-6.jpg', title: 'Therapy Room', category: 'medical' },
    { id: 7, image: '/assets/images/resource/event-3.jpg', title: 'Community Events', category: 'events' },
    { id: 8, image: '/assets/images/resource/event-4.jpg', title: 'Birthday Celebration', category: 'events' },
    { id: 9, image: '/assets/images/resource/event-5.jpg', title: 'Yoga Session', category: 'recreation' },
    { id: 10, image: '/assets/images/resource/event-6.jpg', title: 'Cultural Program', category: 'events' },
    { id: 11, image: '/assets/images/resource/blog-1.jpg', title: 'Common Area', category: 'rooms' },
    { id: 12, image: '/assets/images/resource/blog-2.jpg', title: 'Beautiful Garden', category: 'garden' },
  ];

  const categories = ['all', 'rooms', 'medical', 'garden', 'dining', 'recreation', 'events'];

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  useEffect(() => {
    if (typeof window.WOW !== 'undefined') {
      new window.WOW().init();
    }
  }, []);

  const openLightbox = (image, index) => {
    setLightbox({ isOpen: true, image, index });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, image: null, index: 0 });
  };

  const nextImage = () => {
    const nextIndex = (lightbox.index + 1) % filteredImages.length;
    setLightbox({ isOpen: true, image: filteredImages[nextIndex], index: nextIndex });
  };

  const prevImage = () => {
    const prevIndex = (lightbox.index - 1 + filteredImages.length) % filteredImages.length;
    setLightbox({ isOpen: true, image: filteredImages[prevIndex], index: prevIndex });
  };

  return (
    <>
      {/* Page Title */}
      <div className="page-title" style={{ backgroundImage: 'url(/assets/images/background/page-title.jpg)' }}>
        <div className="auto-container">
          <h1>Our Gallery</h1>
        </div>
      </div>
      <div className="bredcrumb-wrap">
        <div className="auto-container">
          <ul className="bredcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li>Gallery</li>
          </ul>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="auto-container">
          <div className="section_heading text-center mb_60">
            <span className="section_heading_title_small">Our Gallery</span>
            <h2 className="section_heading_title_big">Explore Our <br /> <span>Facility</span></h2>
          </div>

          {/* Filter Buttons */}
          <div className="gallery-filter text-center mb_50">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="row gallery-grid">
            {filteredImages.map((image, index) => (
              <div key={image.id} className="col-lg-4 col-md-6 mb-4 gallery-item wow fadeInUp" data-wow-delay={`${0.1 * (index % 3)}s`}>
                <div className="gallery-block" onClick={() => openLightbox(image, index)}>
                  <div className="gallery-image">
                    <img src={image.image} alt={image.title} />
                    <div className="gallery-overlay">
                      <div className="gallery-content">
                        <h4>{image.title}</h4>
                        <span className="gallery-category">{image.category}</span>
                        <div className="gallery-icon">
                          <i className="fas fa-search-plus"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-5">
              <p>No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Video Tour Section */}
      <section className="video-1-section">
        <div className="video-1-bg" style={{ backgroundImage: 'url(/assets/images/background/video-bg2.jpg)' }}></div>
        <div className="auto-container">
          <div className="section_heading text-center mb_40">
            <span className="section_heading_title_small alt">Video Tour</span>
            <h2 className="section_heading_title_big alt">Take A Virtual <br /> Tour Of Our Facility</h2>
          </div>
          <div className="video-1-video-btn">
            <a href="https://www.youtube.com/watch?v=XHOmBV4js_E" className="overlay-link play-now ripple" data-fancybox="video" data-caption="">
              <i className="icon-10"></i>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-1-section">
        <div className="cta-1-bg" style={{ backgroundImage: 'url(/assets/images/background/parallax-bg.jpg)' }}></div>
        <div className="auto-container">
          <div className="section_heading text-center mb_40">
            <span className="section_heading_title_small alt">Visit Us</span>
            <h2 className="section_heading_title_big alt">Want To See More? <br /> <span>Visit Us</span> In Person</h2>
          </div>
          <div className="text-center">
            <div className="cta-1-desc">Schedule a visit to experience our facility firsthand. <br /> Our team will be happy to show you around.</div>
            <div className="cta-1-link-bt">
              <Link to="/contact" className="btn-1">Schedule a Visit <span></span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox.isOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <i className="fas fa-times"></i>
            </button>
            <button className="lightbox-prev" onClick={prevImage}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <img src={lightbox.image?.image} alt={lightbox.image?.title} />
            <button className="lightbox-next" onClick={nextImage}>
              <i className="fas fa-chevron-right"></i>
            </button>
            <div className="lightbox-caption">
              <h4>{lightbox.image?.title}</h4>
              <span>{lightbox.index + 1} / {filteredImages.length}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
