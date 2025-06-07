// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable type checking during builds
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: "",
  reactStrictMode: true,
  images: {
    domains: ["dostapp.s3.eu-north-1.amazonaws.com"],
  },
});
