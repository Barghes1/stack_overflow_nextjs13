/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['encrypted-tbn0.gstatic.com', 'img.clerk.com'],
    },
    experimental: {
        serverActions: true,
        mdxRs: true,
        serverComponentsExternalPackages: ['mongoose'],
    },
};

export default nextConfig;
