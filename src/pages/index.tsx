import PodcastModal from 'src/app/components/PodcastModal';
import Logo from 'src/app/components/Logo';
import React from 'react';
import PodcastSearch from 'src/app/components/PodcastSearch';
import IndexAbout from 'src/app/components/IndexAbout';
import AuthFooter from 'src/app/components/AuthFooter';

const IndexPage = () => {
  return (
    <div className="index">
      <main>
        <Logo />
        <IndexAbout />
        <PodcastSearch />
        <AuthFooter />
      </main>
      <PodcastModal />
      <style jsx>{`
        .index {
          padding: 20px;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          padding-top: 50px;
        }
        main {
          width: 100%;
          max-width: 600px;
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
