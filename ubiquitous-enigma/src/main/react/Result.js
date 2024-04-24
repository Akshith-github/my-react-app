import React from 'react';

function Result({ result }) {
  return (
    <div className="result card">
      <div className="card-body">
        <h2 className="card-title">{result.title}</h2>
        <p className="card-text">Date: {result.date}</p>
        <p className="card-text">Explanation: {result.explanation}</p>
        <p className="card-text">Copyright: {result.copyright}</p>
        {result.media_type === 'image' ? (
          <div>
            <img src={result.url} alt={result.title} className="card-img-top" />
            <p className="card-text">Click <a href={result.hdurl} target="_blank" rel="noopener noreferrer">here for high-resolution image</a> </p>
          </div>
        ) : result.media_type === 'video' ? (
          <div className="embed-responsive embed-responsive-16by9">
            <iframe className="embed-responsive-item" src={result.url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        ) : (
          <p className="card-text">Media type: {result.media_type}</p>
        )}
        <p className="card-text">media_type: {result.media_type}</p>
        <p className="card-text">service_version: {result.service_version}</p>
      </div>
    </div>
  );
}

export default Result;
