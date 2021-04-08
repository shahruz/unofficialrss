import Link from 'next/link';
import React, { FunctionComponent } from 'react';

const IndexAbout: FunctionComponent = () => {
  return (
    <div className="about">
      Create private RSS feeds for your favorite Stitcher Premium podcasts with
      this{' '}
      <Link href="/about">
        <a>free</a>
      </Link>{' '}
      and <a href="https://github.com/shahruz/unofficialrss">open source</a>{' '}
      service. An active Stitcher Premium membership is required to access
      premium and ad-free podcasts.{' '}
      <Link href="/about">
        <a>Learn more here.</a>
      </Link>
      <style jsx>{`
        .about {
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

export default IndexAbout;
