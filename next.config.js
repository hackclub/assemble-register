const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  assetPrefix: '/register',
  async rewrites() {
    return [
      {
        source: `/register/_next/:path*`,
        destination: '/_next/:path*',
      },
      {
        source: `/register/images/:query*`,
        destination: '/_next/image/:query*',
      },
      {
        source: `/register/api/:path*`,
        destination: '/api/:path*',
      },
    ]
  },
})
