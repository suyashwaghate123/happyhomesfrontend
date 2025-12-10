import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../services/api';
import PageTitle from '../components/common/PageTitle';
import SectionHeading from '../components/common/SectionHeading';
import Loading from '../components/common/Loading';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBlogPosts();
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <PageTitle title="Blog" />

      <section className="blog-section section-padding">
        <div className="auto-container">
          <SectionHeading
            subtitle="Latest News"
            titleHtml="Read Our Latest <br /> Articles & Updates"
            centered={true}
            className="mb_60"
          />

          <div className="row">
            {blogs.map((blog) => (
              <div key={blog.id} className="col-lg-4 col-md-6 mb-4">
                <div className="blog-1-block">
                  <div className="blog-1-image">
                    <Link to={`/blog/${blog.slug}`}>
                      <img src={blog.image} alt={blog.title} />
                    </Link>
                    <div className="blog-1-date">
                      <span>{new Date(blog.date).getDate()}</span>
                      <br />
                      {new Date(blog.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                    </div>
                  </div>
                  <div className="blog-1-bottom-content">
                    <h4 className="blog-1-title">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h4>
                    <ul className="d-flex blog-1-meta-info">
                      <li><i className="icon-12"></i>{blog.author}</li>
                      <li><i className="icon-13"></i>{blog.category}</li>
                    </ul>
                    <p className="blog-1-excerpt">{blog.excerpt}</p>
                    <div className="blog-1-link-btn">
                      <Link to={`/blog/${blog.slug}`} className="btn-1 btn-small">
                        Read More <span></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {blogs.length === 0 && (
            <div className="text-center py-5">
              <p>No blog posts available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;

