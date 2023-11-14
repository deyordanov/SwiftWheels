/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["utfs.io"],
    },
    experimental: {
        // Ensure you enable the new routing system
        newNextLinkBehavior: true,
    },
    // Define your routes groups here
    pageExtensions: ["page.tsx", "tsx", "js"],
};

module.exports = nextConfig;
