import React from 'react';

function CreativeHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-8 fade-in">
      <div className="d-inline-block p-3 rounded-circle bg-gradient-primary mb-4">
        <h1 className="display-4 fw-bold gradient-text mb-0">{title}</h1>
      </div>
      <p className="lead text-muted">{subtitle}</p>
      <div className="d-flex justify-content-center gap-3">
        <div className="p-2 rounded bg-primary bg-opacity-10"></div>
        <div className="p-2 rounded bg-secondary bg-opacity-10"></div>
        <div className="p-2 rounded bg-success bg-opacity-10"></div>
      </div>
    </div>
  );
}

export default CreativeHeader;