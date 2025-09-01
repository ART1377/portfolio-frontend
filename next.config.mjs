/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/api/uploads/**",
      },
      {
        protocol: "https",
        hostname: "portfolio-backend-production-5b10.up.railway.app",
        port: "", // leave empty for default
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dfid5mzsg/**",
      },
    ],
  },
};

export default nextConfig;
