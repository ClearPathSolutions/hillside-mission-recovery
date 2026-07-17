/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Clarion-managed blog cover images can be hosted on arbitrary CDNs
    // (Unsplash, Clarion storage, etc.), so allow remote HTTPS sources.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};
export default nextConfig;
