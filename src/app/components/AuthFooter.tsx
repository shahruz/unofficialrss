import React, { FunctionComponent } from 'react';
import useUser, { login, logout } from '../features/useUser';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
const AuthFooter: FunctionComponent = () => {
  const user = useUser();
  const subscribe = () => (location.href = 'https://www.stitcher.com/premium');
  return (
    <div className="auth-footer">
      {!!user ? (
        <>
          <div className="status">
            {user.isPremium ? (
              <>
                <FaCheckCircle /> Stitcher Premium Subscriber
              </>
            ) : (
              <>
                <FaExclamationCircle /> Not a Stitcher Premium Subscriber
              </>
            )}{' '}
          </div>
          <div className="buttons">
            {!user.isPremium && (
              <>
                <button onClick={subscribe}>Subscribe</button>{' '}
              </>
            )}
            <button onClick={logout}>Log out</button>
          </div>
        </>
      ) : (
        <>
          <div className="message">
            Log in to Stitcher to generate your own RSS feeds.
          </div>
          <button onClick={login}>Log in</button>
        </>
      )}
      <style jsx>{`
        .auth-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: hsl(181, 50%, 30%);
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 14px;
        }
        .status {
          text-transform: uppercase;
        }
        .auth-footer :global(svg) {
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
          position: relative;
          z-index: 1;
          transform: translateY(-2px);
        }
        button {
          outline: none;
          border: none;
          border-radius: 5px;
          background-color: black;
          color: white;
          padding: 10px 10px;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .auth-footer {
            display: block;
            padding: 10px;
            text-align: center;
          }
          .status,
          .message {
            font-size: 12px;
            margin-bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthFooter;
