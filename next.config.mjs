/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
      serverComponentsExternalPackages: ['axios','mongoose'],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.externals.push({
          'utf-8-validate': 'commonjs utf-8-validate',
          'bufferutil': 'commonjs bufferutil',
          'supports-color': 'commonjs supports-color',
      });
      config.resolve.fallback = {
        "mongodb-client-encryption": false ,
        "aws4": false
      };
      return config
  },
}

export default nextConfig;
