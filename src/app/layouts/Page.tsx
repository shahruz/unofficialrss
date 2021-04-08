import React, { FunctionComponent } from 'react';

const Page: FunctionComponent = ({ children }) => {
  return (
    <div className="page">
      {children}
      <style jsx global>{`
        * {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        }
        html,
        body {
          margin: 0;
          padding: 0;
          background-color: hsl(240, 26%, 12%);
          color: white;
        }
        h1 {
          font-weight: 500;
        }
        h2,
        h4 {
          font-weight: 500;
          color: hsl(326, 100%, 50%);
        }
        a {
          color: inherit;
          text-underline-offset: 0.11em;
        }
      `}</style>
    </div>
  );
};

export default Page;
