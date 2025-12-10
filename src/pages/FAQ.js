import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFaqs } from '../services/api';
import PageTitle from '../components/common/PageTitle';
import SectionHeading from '../components/common/SectionHeading';
import Loading from '../components/common/Loading';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFaqs();
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) return <Loading />;

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    const category = faq.category || 'general';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {});

  const categoryTitles = {
    general: 'General Questions',
    pricing: 'Pricing & Payment',
    admission: 'Admission Process',
    medical: 'Medical Care'
  };

  return (
    <>
      <PageTitle title="Frequently Asked Questions" />

      <section className="faq-section section-padding">
        <div className="auto-container">
          <SectionHeading
            subtitle="FAQ"
            titleHtml="Find Answers To Your <br /> Common Questions"
            centered={true}
            className="mb_60"
          />

          <div className="row">
            <div className="col-lg-8 mx-auto">
              {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
                <div key={category} className="faq-category mb-5">
                  <h3 className="faq-category-title">
                    {categoryTitles[category] || category}
                  </h3>
                  <div className="accordion-wrapper">
                    {categoryFaqs.map((faq, index) => {
                      const globalIndex = `${category}-${index}`;
                      return (
                        <div 
                          key={faq.id} 
                          className={`accordion-item ${activeIndex === globalIndex ? 'active' : ''}`}
                        >
                          <div 
                            className="accordion-header"
                            onClick={() => toggleAccordion(globalIndex)}
                          >
                            <h4>{faq.question}</h4>
                            <span className="accordion-icon">
                              <i className={`fas fa-${activeIndex === globalIndex ? 'minus' : 'plus'}`}></i>
                            </span>
                          </div>
                          <div 
                            className="accordion-content"
                            style={{ 
                              maxHeight: activeIndex === globalIndex ? '500px' : '0',
                              overflow: 'hidden',
                              transition: 'max-height 0.3s ease-out'
                            }}
                          >
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {faqs.length === 0 && (
                <div className="text-center py-5">
                  <p>No FAQs available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="still-questions section-padding theme-gray-bg">
        <div className="auto-container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h2>Still Have Questions?</h2>
              <p>
                Can't find the answer you're looking for? Please chat with our friendly team.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/contact" className="btn-1">
                Contact Us <span></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;

