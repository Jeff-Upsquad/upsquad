/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: process.env.NODE_ENV === 'production' ? '../server/public' : '.next',
  // Next.js normally outputs page.html instead of page/index.html.
  // Express handles URLs like /pricing fallback to index.html which will fail unless we use trailingSlash.
  trailingSlash: true,
};

export default nextConfig;
