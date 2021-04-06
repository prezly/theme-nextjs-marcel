module.exports = {
  webpack: (config, {isServer}) => {

    if (!isServer) {
      config.node = { fs: 'empty' }
    }

    return config
  },
  images: {
    domains: ['cdn.uc.assets.prezly.com']
  }
}
