import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["fastly.picsum.photos"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Allow all paths under this domain
      },
    ],
  },
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
