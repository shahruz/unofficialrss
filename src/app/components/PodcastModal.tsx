import React, { ReactEventHandler, useEffect, useState } from 'react';
import useStore from 'src/app/features/useStore';
import { getLoginLink } from 'src/server/lib/StitcherAuth';
import useUser from '../features/useUser';

const PodcastModal = () => {
  const user = useUser();
  const activePodcast = useStore(state => state.activePodcast);
  const onBackgroundClick = () => useStore.setState({ activePodcast: null });
  const onModalClick: ReactEventHandler = e => e.stopPropagation();
  const [podcast, setPodcast] = useState(activePodcast);

  useEffect(() => {
    if (!activePodcast && podcast)
      setTimeout(() => {
        setPodcast(null);
        setDescriptionExpanded(false);
      }, 400);
    else if (podcast?.id != activePodcast?.id) {
      setPodcast(activePodcast);
    }
  }, [activePodcast]);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const feedURL = user?.isPremium
    ? `https://v2.unofficialrss.com/feed/${podcast?.id}.xml?u=${user?.token}`
    : null;
  const [copied, setCopied] = useState(false);
  const onCopyButtonClick = () => {
    if (!feedURL) return;
    navigator.clipboard.writeText(feedURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <div className="podcast-modal" onClick={onBackgroundClick}>
      <div className="podcast" onClick={onModalClick}>
        <img
          className="image"
          src={
            podcast?.image ||
            'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
          }
          width="100"
          height="100"
        />
        <div className="title">{podcast?.title}</div>
        <div
          className="description"
          onClick={() => setDescriptionExpanded(!descriptionExpanded)}
          dangerouslySetInnerHTML={{ __html: podcast?.description || '' }}
        />
        {!!user && !!podcast ? (
          user.isPremium ? (
            <div className="feed-links">
              <div className="feed-url">{feedURL}</div>
              <div className="button" onClick={onCopyButtonClick}>
                {!copied ? 'Copy RSS Feed URL' : 'Copied!'}
              </div>
            </div>
          ) : (
            <div className="non-premium">
              <div className="non-premium-message">
                You need to subscribe to Stitcher Premium first to generate your
                own RSS feed.
              </div>
              <a
                className="button"
                href="https://stitcher.com/premium"
                target="_blank"
              >
                Subscribe
              </a>
            </div>
          )
        ) : podcast ? (
          <div className="login">
            <div className="login-message">
              You need to log in to Stitcher first to generate your own RSS
              feed.
            </div>
            <a className="button" href={getLoginLink()}>
              Log in
            </a>
          </div>
        ) : null}
      </div>
      <div className="close" onClick={onBackgroundClick}>
        Close
      </div>
      <style jsx>{`
        .podcast-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          padding: 15px;
          background-color: hsla(240, 26%, 6%, ${!!activePodcast ? 90 : 0}%);
          pointer-events: ${!!activePodcast ? 'initial' : 'none'};
          transition: 250ms all ease-in-out;
          display: flex;
          place-items: center;
          backdrop-filter: blur(${!!activePodcast ? 3 : 0}px);
          z-index: 10000;
        }
        .podcast {
          max-width: 400px;
          width: 100%;
          margin: 10px auto;
          transition: 400ms all ease-in-out;
          opacity: ${!!activePodcast ? 1 : 0};
          transform: translateY(${!!activePodcast ? 0 : 1000}px);
          max-height: calc(100% - 40px);
          overflow: auto;
          border-radius: 5px;
          align-items: center;
          display: flex;
          flex-direction: column;
          padding: 20px;
          position: relative;
          background: black;
        }
        .podcast::before {
          content: '';
          background: url(${podcast?.image ||
          'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='});
          filter: blur(130px);
          background-size: 500%;
          background-position: center;
          opacity: 0.75;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }

        .image {
          min-width: 150px;
          width: 175px;
          height: 175px;
          overflow: hidden;
          background: black;
          border-radius: 5px;
        }
        .title {
          margin-top: 20px;
          font-weight: 500;
          font-size: 18px;
          width: 100%;
          padding: 4px;
        }
        .description {
          font-style: 18px;
          line-height: 1.4em;
          display: -webkit-box;
          -webkit-line-clamp: ${descriptionExpanded ? 100 : 3};
          -webkit-box-orient: vertical;
          overflow: hidden;
          color: #ccc;
          background: rgba(255, 255, 255, 0);
          padding: 4px;
          margin-left: -8px;
          padding-left: 8px;
          border-radius: 10px;
          cursor: pointer;
        }
        .description:hover {
          background: rgba(255, 255, 255, 0.05);
          box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.25);
        }
        .feed-links {
          margin-top: 10px;
          width: 100%;
        }
        .feed-url {
          width: 100%;
          border: none;
          outline: none;
          font-weight: 500;
          white-space: nowrap;
          overflow: auto;
          padding: 15px;
          margin-bottom: 15px;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 5px;
          color: #ccc;
        }
        .feed-url::-webkit-scrollbar {
          height: 2px;
        }
        .feed-url::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        .feed-url::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.5);
        }
        .button {
          width: 100%;
          border: 1px solid white;
          color: white;
          background: transparent;
          padding: 10px;
          text-align: center;
          border-radius: 5px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 10px;
          display: block;
          text-decoration: none;
        }
        .button:last-of-type {
          margin-bottom: 0;
        }
        .button:hover {
          color: black;
          background: white;
        }
        .close {
          position: absolute;
          bottom: ${!!activePodcast ? 20 : -100}px;
          left: 50%;
          transform: translateX(-50%);
          color: #aaa;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          opacity: ${!!activePodcast ? 1 : 0};
          pointer-events: ${!!activePodcast ? 'inherit' : 'none'};
          transition: 400ms all ease-in-out;
          cursor: pointer;
        }
        .close:hover {
          text-decoration: underline;
        }
        .login,
        .non-premium {
          margin-top: 10px;
          padding: 10px;
          background: rgba(0, 0, 0, 0.5);
          text-align: center;
          width: 100%;
          border-radius: 10px;
        }
        .login-message,
        .non-premium-message {
          width: 90%;
          margin: 0 auto;
          font-size: 14px;
          line-height: 1.4em;
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

export default PodcastModal;
