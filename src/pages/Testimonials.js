import React, { useState, useEffect } from 'react';
import { getTestimonials } from '../services/api';
import PageTitle from '../components/common/PageTitle';
import SectionHeading from '../components/common/SectionHeading';
import Loading from '../components/common/Loading';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTestimonials();
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <PageTitle title="Testimonials" />

      <section className="testimonials-page-section section-padding">
        <div className="auto-container">
          <SectionHeading
            subtitle="What Families Say"
            titleHtml="Stories From Our <br /> Happy Homes Family"
            centered={true}
            className="mb_60"
          />

          <div className="row">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="col-lg-6 mb-4">
                <div className="testimonial-page-block">
                  <div className="testimonial-header d-flex align-items-center">
                    <div className="testimonial-author-thumb">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="testimonial-author-info">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.designation}</p>
                      <div className="testimonial-rating">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`fa${i < testimonial.rating ? 's' : 'r'} fa-star`}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="testimonial-content">
                    <div className="quote-icon">
                      <i className="fas fa-quote-left"></i>
                    </div>
                    <p>"{testimonial.review}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {testimonials.length === 0 && (
            <div className="text-center py-5">
              <p>No testimonials available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Testimonials;

