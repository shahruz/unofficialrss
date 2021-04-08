module.exports = {
  async rewrites() {
    return [
      {
        source: '/feed/:id.xml',
        destination: '/api/feed'
      },
      {
        source: '/episode/:id.mp3',
        destination: '/api/episode'
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/auth/callback',
        destination: '/api/auth/callback',
        permanent: false
      }
    ];
  },
  images: {
    domains: ['stitcher.imgix.net', 'stitcher-classic.imgix.net']
  }
};
