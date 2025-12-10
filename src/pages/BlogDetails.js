import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogBySlug, getBlogPosts } from '../services/api';
import PageTitle from '../components/common/PageTitle';
import Loading from '../components/common/Loading';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, allBlogsRes] = await Promise.all([
          getBlogBySlug(slug),
          getBlogPosts()
        ]);
        setBlog(blogRes.data);
        setRecentPosts(allBlogsRes.data.filter(b => b.slug !== slug).slice(0, 3));
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <Loading />;

  if (!blog) {
    return (
      <>
        <PageTitle title="Blog Not Found" />
        <section className="section-padding">
          <div className="auto-container text-center">
            <h2>Blog Post Not Found</h2>
            <p>The article you're looking for doesn't exist.</p>
            <Link to="/blog" className="btn-1 mt-4">
              View All Posts <span></span>
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageTitle 
        title={blog.title} 
        breadcrumbs={[{ name: 'Blog', link: '/blog' }]}
      />

      <section className="blog-details-section section-padding">
        <div className="auto-container">
          <div className="row">
            {/* Main Content */}
            <div className="col-lg-8">
              <div className="blog-details-content">
                <div className="blog-details-image">
                  <img src={blog.image} alt={blog.title} />
                </div>

                <div className="blog-details-meta d-flex gap-4 mb-4">
                  <span>
                    <i className="fas fa-calendar-alt"></i>
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span>
                    <i className="fas fa-user"></i>
                    {blog.author}
                  </span>
                  <span>
                    <i className="fas fa-folder"></i>
                    {blog.category}
                  </span>
                </div>

                <h2>{blog.title}</h2>
                
                <div 
                  className="blog-content"
                  dangerouslySetInnerHTML={{ 
                    __html: blog.content.replace(/\n/g, '<br><br>') 
                  }}
                />

                {/* Share Section */}
                <div className="blog-share mt-5 pt-4 border-top">
                  <h4>Share This Article</h4>
                  <div className="share-buttons d-flex gap-3 mt-3">
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn facebook"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn twitter"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a 
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${blog.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn linkedin"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a 
                      href={`https://wa.me/?text=${blog.title} ${window.location.href}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-btn whatsapp"
                    >
                      <i className="fab fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="blog-sidebar">
                {/* Recent Posts */}
                <div className="sidebar-widget recent-posts-widget">
                  <h4>Recent Posts</h4>
                  <ul className="recent-posts-list">
                    {recentPosts.map((post) => (
                      <li key={post.id}>
                        <Link to={`/blog/${post.slug}`}>
                          <div className="recent-post-thumb">
                            <img src={post.image} alt={post.title} />
                          </div>
                          <div className="recent-post-content">
                            <h5>{post.title}</h5>
                            <span className="post-date">
                              {new Date(post.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Widget */}
                <div className="sidebar-widget cta-widget">
                  <h4>Need Assistance?</h4>
                  <p>Have questions about senior care? We're here to help.</p>
                  <Link to="/contact" className="btn-1 btn-small">
                    Contact Us <span></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;

