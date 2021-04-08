import React from 'react';
import type Podcast from 'src/types/Podcast';
import hexToHue from 'src/app/features/hexToHue';
import useStore from 'src/app/features/useStore';

interface Props {
  podcast: Podcast;
  index?: number;
}

const PodcastPreview = ({ podcast, index }: Props): JSX.Element => {
  const onClick = () => useStore.setState({ activePodcast: podcast });
  return (
    <div className="podcast-preview" onClick={onClick}>
      <img
        src={
          podcast.image ||
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
        }
        width="100"
        height="100"
        className="image"
        loading="lazy"
      />
      <div className="meta">
        <div className="title">{podcast.title}</div>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: podcast.description }}
        />
        <div
          className="episode-count"
          style={{
            color: `hsl(${hexToHue(podcast.color || '#000')}, 50%, 80%)`,
          }}
        >
          {podcast.episodeCount} episode{podcast.episodeCount > 1 ? 's' : ''}
        </div>
      </div>
      <style jsx>{`
        .podcast-preview {
          cursor: pointer;
          width: 100%;
          overflow: hidden;
          opacity: 0;
          transform: translateY(50px);
          animation: 450ms fadeUp forwards;
          animation-delay: ${(index || 0) * 10}ms;
        }
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .image {
          width: 100%;
          height: auto;
          background: black;
        }
        .meta {
          padding-top: 5px;
        }
        .title {
          color: #ccc;
          font-size: 13px;
          line-height: 1.4em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .podcast-preview:hover .title {
          text-decoration: underline;
        }
        .description {
          font-size: 11px;
          color: #aaa;
          line-height: 1.4em;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 5px;
          display: none;
        }
        .episode-count {
          display: none;
          font-size: 12px;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
};

export default PodcastPreview;
