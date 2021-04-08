import React, { useEffect, useRef } from 'react';

const PodcastSearchInput = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);
  return (
    <>
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search for a Stitcher Premium podcast..."
      />
      <style jsx>{`
        input {
          position: relative;
          text-align: left;
          width: 100%;
          padding: 12px 15px;
          border-radius: 3px;
          border: none;
          outline: none;
          font-size: 18px;
          border-radius: 3px;
          background: hsl(240, 26%, 12%);
          color: white;
          border: 1px solid hsl(182, 52%, 90%);
        }
        input:focus {
          border: 1px solid hsl(182, 52%, 65%);
        }
      `}</style>
    </>
  );
};

export default PodcastSearchInput;
