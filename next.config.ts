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
        ]
    },
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ['lucide-react'],
    }
}

export default withNextIntl(nextConfig)