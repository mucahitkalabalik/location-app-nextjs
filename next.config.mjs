/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  reactStrictMode: false, // React Strict Mode'u devre dışı bırakıyoruz
};

export default nextConfig;
