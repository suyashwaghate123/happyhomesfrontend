import React from 'react';
import { Link } from 'react-router-dom';

const PageTitle = ({ title, breadcrumbs = [] }) => {
  return (
    <>
      <div 
        className="page-title" 
        style={{ backgroundImage: 'url(/images/resource/pageheaderimage.jpg)' }}
      >
        <div className="auto-container">
          <h1>{title}</h1>
        </div>
      </div>
      <div className="bredcrumb-wrap">
        <div className="auto-container">
          <ul className="bredcrumb-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={index}>
                {crumb.link ? (
                  <Link to={crumb.link}>{crumb.name}</Link>
                ) : (
                  crumb.name
                )}
              </li>
            ))}
            {!breadcrumbs.some(b => b.name === title) && <li>{title}</li>}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PageTitle;

