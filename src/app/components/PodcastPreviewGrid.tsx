import React from 'react';
import type Podcast from 'src/types/Podcast';
import Loader from './Loader';
import PodcastPreview from './PodcastPreview';

interface Props {
  podcasts?: Podcast[];
}

const PodcastPreviewGrid = ({ podcasts }: Props): JSX.Element => {
  return (
    <div className="podcast-grid">
      <div className="loading">
        <Loader />
      </div>
      <div className="podcast-preview-grid">
        {podcasts?.length ? (
          podcasts.map((podcast, i) => (
            <PodcastPreview key={podcast.id} podcast={podcast} index={i} />
          ))
        ) : (
          <div className="loading">
            <Loader />
          </div>
        )}
      </div>
      <style jsx>{`
        .podcast-grid {
          position: relative;
        }
        .podcast-preview-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 15px;
          opacity: ${podcasts?.length ? 1 : 0};
          transition: 400ms opacity ease-in-out;
          background: hsl(240, 26%, 12%);
        }
        .loading {
          position: absolute;
          display: grid;
          place-items: center;
          width: 100%;
          height: 300px;
          background: hsl(240, 26%, 12%);
          opacity: ${podcasts?.length ? 0 : 1};
          transform: scale(${podcasts?.length ? 0 : 100}%);
          transition: 400ms all ease-in-out;
          pointer-events: none;
          z-index: 1000;
        }
        @media (max-width: 768px) {
          .podcast-preview-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default PodcastPreviewGrid;
