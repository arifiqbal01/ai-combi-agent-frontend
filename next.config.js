// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@tanstack/react-query'],

  turbopack: {
    resolveAlias: {
      canvas: './src/shared/shims/canvas.ts',
    },
  },
}

export default nextConfig