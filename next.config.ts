import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const nextConfig: NextConfig = {
    images: {
        formats: ["image/avif" , "image/webp"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sandy11.pythonanywhere.com',
                port: '',
                pathname: '/**',
               
            }
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['lucide-react'],
    }
}

export default withNextIntl(nextConfig)