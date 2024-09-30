import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const workboxPluginIndex = config.plugins.findIndex(
        (plugin) => plugin.constructor.name === "GenerateSW"
      );

      if (workboxPluginIndex !== -1) {
        const [workboxPlugin] = config.plugins.splice(workboxPluginIndex, 1);
        config.plugins.push(workboxPlugin);
      }
    }

    return config;
  },
};

export default withPWA({
  dest: "public", // destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // disable PWA in the development environment
  register: true, // register the PWA service worker
  skipWaiting: true, // skip waiting for service worker activation
})(nextConfig);
