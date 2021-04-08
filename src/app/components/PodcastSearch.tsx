import React, { FunctionComponent, useState } from 'react';
import usePodcastSearch from '../features/usePodcastSearch';
import PodcastPreviewGrid from './PodcastPreviewGrid';
import PodcastSearchInput from './PodcastSearchInput';

const PodcastSearch: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const podcasts = usePodcastSearch(searchTerm);
  return (
    <>
      <div className="search">
        <PodcastSearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div className="results">
        <PodcastPreviewGrid podcasts={podcasts} />
      </div>
      <style jsx>{`
        .results {
          margin-top: 20px;
          margin-bottom: 100px;
          opacity: ${searchTerm.length ? 1 : 0};
          position: relative;
        }
      `}</style>
    </>
  );
};

export default PodcastSearch;
