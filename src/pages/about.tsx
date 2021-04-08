import Logo from 'src/app/components/Logo';
import React from 'react';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="about">
      <main>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <div className="about-content">
          <p>
            UnofficialRSS is a tool that creates personal RSS feeds for
            subscribers of Stitcher Premium podcasts. These RSS feeds can be
            used in almost any podcast app, just like any other podcast.
          </p>
          <p>The service stores zero personal data or login information.</p>
          <p>
            UnofficialRSS is maintained by{' '}
            <a href="https://twitter.com/shahruz" target="_blank">
              @shahruz
            </a>
            , the creator of{' '}
            <a href="https://podbay.fm" target="_blank">
              Podbay.fm
            </a>{' '}
            and new podcast network - LARK - launching late 2021.
          </p>
          <p>
            Special thanks to John Long, Dan Christensen, and Ken and Madison
            from the Stitcher team for their help.
          </p>
          <p>There are no ads or trackers on this site.</p>
        </div>
      </main>
      <style jsx>{`
        .about {
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
        .about-content {
          margin-top: 30px;
          margin-bottom: 30px;
          font-size: 18px;
          line-height: 1.5em;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
