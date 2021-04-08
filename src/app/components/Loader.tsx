import React from 'react';
const Loader = () => {
  const size = 60;
  return (
    <div className="loader">
      <div />
      <div />
      <div />
      <style jsx>{`
        .loader {
          position: relative;
          transform: translateY(-${size / 2}px);
        }
        .loader > div:nth-child(0) {
          animation-delay: -0.8s;
          border-color: hsl(183, 71%, 58%);
        }
        .loader > div:nth-child(1) {
          animation-delay: -0.6s;
          border-color: hsl(183, 71%, 58%);
        }
        .loader > div:nth-child(2) {
          animation-delay: -0.4s;
          border-color: hsl(183, 71%, 68%);
        }
        .loader > div:nth-child(3) {
          animation-delay: -0.2s;
          border-color: hsl(183, 100%, 80%);
        }
        .loader > div {
          animation-fill-mode: both;
          position: absolute;
          top: -2px;
          left: -${size / 2}px;
          width: ${size}px;
          height: ${size}px;
          border-radius: 100%;
          border: 2px solid hsl(183, 71%, 58%);
          animation: loader 2s 0s infinite cubic-bezier(0.21, 0.53, 0.56, 0.8);
        }
        @keyframes loader {
          0% {
            transform: scale(0.1);
            opacity: 1;
          }
          70% {
            transform: scale(1);
            opacity: 0.7;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
