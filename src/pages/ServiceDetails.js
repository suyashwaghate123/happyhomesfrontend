import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServiceById, getServices } from '../services/api';
import PageTitle from '../components/common/PageTitle';
import Loading from '../components/common/Loading';

// Main 3 services data with full details from Home Page.txt
const mainServicesData = {
  'bedridden-care': {
    id: 1,
    title: 'Bedridden Care',
    subtitle: '24/7 Nursing Support',
    shortDescription: 'Dedicated support for fully dependent senior residents.',
    description: 'Our Bedridden Care program provides comprehensive support for fully dependent senior residents. We offer condition-based nutritious meals, skilled nursing, physiotherapy support, and comfortable, well-equipped rooms designed for complete care and comfort.',
    longDescription: 'At Happy Homes, we understand that bedridden residents require specialized, round-the-clock care. Our Bedridden Care program is designed to provide the highest level of medical and personal support, ensuring that every resident receives dignified care in a comfortable environment. Our trained nursing staff is available 24/7 to monitor vitals, administer medications, and respond to any emergencies.',
    icon: 'icon-6',
    image: '/images/resource/nursing.jpg',
    features: [
      '24/7 dedicated nursing supervision for high-dependency residents',
      'Customized diet plans based on medical condition and doctor recommendations',
      'Bedside physiotherapy routines to maintain mobility and reduce stiffness',
      'Pressure-relief bedding and safety-focused room setup',
      'Medication management & monitoring to ensure stability and comfort'
    ],
    additionalFeatures: [
      'Daily vital checkups and health monitoring',
      'Bedsore prevention and wound care',
      'Catheter & Ryle\'s tube management',
      'Emergency support including oxygen & suctioning',
      'Coordination with doctors & family',
      'Comfortable, air-conditioned rooms with hospital-grade beds'
    ]
  },
  'assisted-living': {
    id: 2,
    title: 'Assisted Living',
    subtitle: 'Personal Daily Assistance',
    shortDescription: 'Personalized daily assistance to maintain independent living.',
    description: 'Our Assisted Living program provides personalized nutrition, attentive nursing, required physiotherapy, and safe, supportive rooms. We focus on helping seniors maintain their independence while receiving the support they need.',
    longDescription: 'Assisted Living at Happy Homes is designed for seniors who need some help with daily activities but still want to maintain their independence. Our caring staff provides personalized assistance while respecting the dignity and preferences of each resident. We create individualized care plans that adapt to changing needs.',
    icon: 'icon-7',
    image: '/images/resource/assisted.jpg',
    features: [
      'Dedicated personal assistance for dressing, bathing, mobility, and daily tasks',
      'Activity-based recovery programs such as light exercises, memory games, and cognitive activities',
      'Timely nutritious meals designed to support energy, recovery, and overall health',
      'Daily physiotherapy sessions as needed for improving strength and flexibility',
      'Comfortable rooms with safety features and easy accessibility',
      'Regular health monitoring to track progress and ensure wellbeing'
    ],
    additionalFeatures: [
      'Medication reminders and management',
      'Escort services for doctor visits',
      'Engaging social activities and events',
      'Housekeeping and laundry services',
      'Emergency call system in rooms',
      'Regular family updates and communication'
    ]
  },
  'independent-living': {
    id: 3,
    title: 'Independent Senior Living',
    subtitle: 'Active Community Lifestyle',
    shortDescription: 'Comfortable community lifestyle for active senior residents.',
    description: 'Our Independent Senior Living offers healthy tailored meals, wellness and physiotherapy options, and relaxed, well-equipped rooms for active seniors who want to enjoy community living.',
    longDescription: 'Independent Senior Living at Happy Homes is perfect for active seniors who want to enjoy a vibrant community lifestyle while having access to support services when needed. Our residents enjoy private accommodations, nutritious meals, and a full calendar of social activities and wellness programs.',
    icon: 'icon-8',
    image: '/images/resource/care.jpg',
    features: [
      'Community interaction activities like group discussions, hobby circles, and cultural events',
      'Engaging games and recreation such as chess, carrom, indoor games, music time, and outdoor walks',
      'Optional fitness and wellness programs including yoga, stretching, meditation, and light workouts',
      'Nutritious meals that promote active and healthy living',
      'Private, comfortable rooms for a peaceful, independent lifestyle',
      'Secure environment with staff available for assistance whenever needed'
    ],
    additionalFeatures: [
      'Library and reading sessions',
      'Festival celebrations and birthday events',
      'Arts and crafts activities',
      'Morning walks and outdoor recreation',
      'High-speed Wi-Fi connectivity',
      'Common areas for socializing'
    ]
  }
};

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMainService, setIsMainService] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if this is one of the main 3 services (by slug)
        if (mainServicesData[id]) {
          setService(mainServicesData[id]);
          setIsMainService(true);
        } else {
          // Try to fetch by numeric ID from API
          const serviceRes = await getServiceById(id);
          setService(serviceRes.data);
          setIsMainService(false);
        }
        
        // Fetch all services for sidebar
        const allServicesRes = await getServices();
        setAllServices(allServicesRes.data);
      } catch (error) {
        console.error('Error fetching service:', error);
        // If API fails, check main services again
        if (mainServicesData[id]) {
          setService(mainServicesData[id]);
          setIsMainService(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Loading />;

  if (!service) {
    return (
      <>
        <PageTitle title="Service Not Found" />
        <section className="section-padding">
          <div className="auto-container text-center">
            <h2>Service Not Found</h2>
            <p>The service you're looking for doesn't exist.</p>
            <Link to="/services" className="btn-1 mt-4">
              View All Services <span></span>
            </Link>
          </div>
        </section>
      </>
    );
  }

  // Main 3 services for sidebar
  const mainServices = [
    { slug: 'bedridden-care', title: 'Bedridden Care' },
    { slug: 'assisted-living', title: 'Assisted Living' },
    { slug: 'independent-living', title: 'Independent Senior Living' }
  ];

  return (
    <>
      <PageTitle 
        title={service.title} 
        breadcrumbs={[{ name: 'Services', link: '/services' }]}
      />

      <section className="service-details-section section-padding">
        <div className="auto-container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="service-sidebar">
                {/* Main Services List */}
                <div className="sidebar-widget service-list-widget">
                  <h4>Our Care Programs</h4>
                  <ul className="service-list">
                    {mainServices.map((s) => (
                      <li key={s.slug} className={s.slug === id ? 'active' : ''}>
                        <Link to={`/services/${s.slug}`}>
                          <i className="fas fa-angle-right"></i> {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* All Services List */}
                {allServices.length > 0 && (
                  <div className="sidebar-widget service-list-widget">
                    <h4>All Services</h4>
                    <ul className="service-list">
                      {allServices.slice(0, 8).map((s) => (
                        <li key={s.id} className={s.id === parseInt(id) ? 'active' : ''}>
                          <Link to={`/services/${s.id}`}>
                            <i className="fas fa-angle-right"></i> {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link to="/services" className="btn-1 btn-small mt-3">
                      View All <span></span>
                    </Link>
                  </div>
                )}

                {/* Contact Widget */}
                <div className="sidebar-widget contact-widget">
                  <h4>Need Help?</h4>
                  <p>Have questions about our services? We're here to help.</p>
                  <div className="contact-info">
                    <p><i className="fas fa-phone"></i> +91 91300 67672</p>
                    <p><i className="fas fa-envelope"></i> info@happyhomes.com</p>
                  </div>
                  <Link to="/contact" className="btn-1 btn-small">
                    Contact Us <span></span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="col-lg-8">
              <div className="service-details-content">
                <div className="service-details-image">
                  <img src={service.image} alt={service.title} />
                </div>
                
                {service.subtitle && (
                  <span className="service-subtitle">{service.subtitle}</span>
                )}
                <h2>{service.title}</h2>
                <p className="lead">{service.description}</p>
                
                {service.longDescription && (
                  <p>{service.longDescription}</p>
                )}

                {service.features && service.features.length > 0 && (
                  <div className="service-features mt-4">
                    <h3>Key Solutions We Provide</h3>
                    <ul className="features-list">
                      {service.features.map((feature, index) => (
                        <li key={index}>
                          <i className="fas fa-check-circle"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.additionalFeatures && service.additionalFeatures.length > 0 && (
                  <div className="service-features mt-4">
                    <h3>Additional Benefits</h3>
                    <div className="row">
                      {service.additionalFeatures.map((feature, index) => (
                        <div key={index} className="col-md-6">
                          <ul className="features-list">
                            <li>
                              <i className="fas fa-check-circle"></i>
                              {feature}
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="service-cta mt-5">
                  <h3>Interested in {service.title}?</h3>
                  <p>Contact us today to learn more about how we can help your loved ones live with dignity, comfort, and care.</p>
                  <div className="d-flex gap-3 flex-wrap">
                    <Link to="/contact" className="btn-1">
                      Schedule a Visit <span></span>
                    </Link>
                    <a href="tel:+919130067672" className="btn-1 btn-alt">
                      Call Now: +91 91300 67672 <span></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      {isMainService && (
        <section className="related-services-section section-padding pt-0">
          <div className="auto-container">
            <div className="section_heading text-center mb_60">
              <span className="section_heading_title_small">Other Care Programs</span>
              <h2 className="section_heading_title_big">Explore Our Services</h2>
            </div>
            <div className="row">
              {mainServices
                .filter(s => s.slug !== id)
                .map((s) => (
                  <div key={s.slug} className="col-lg-6 col-md-6">
                    <div className="service-block-one wow fadeInUp">
                      <div className="inner-box">
                        <div className="image-box">
                          <img src={mainServicesData[s.slug].image} alt={s.title} />
                          <div className="overlay-box">
                            <Link to={`/services/${s.slug}`} className="icon">
                              <i className="fas fa-arrow-right"></i>
                            </Link>
                          </div>
                        </div>
                        <div className="lower-content">
                          <h4><Link to={`/services/${s.slug}`}>{s.title}</Link></h4>
                          <p>{mainServicesData[s.slug].shortDescription}</p>
                          <Link to={`/services/${s.slug}`} className="read-more">
                            Read More <i className="fas fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ServiceDetails;
