import React from 'react';

const SectionHeading = ({ 
  subtitle, 
  title, 
  titleHtml,
  centered = false, 
  className = '' 
}) => {
  return (
    <div className={`section_heading ${centered ? 'text-center' : ''} ${className}`}>
      {subtitle && (
        <span className="section_heading_title_small">{subtitle}</span>
      )}
      {titleHtml ? (
        <h2 
          className="section_heading_title_big" 
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
      ) : (
        <h2 className="section_heading_title_big">{title}</h2>
      )}
    </div>
  );
};

export default SectionHeading;

