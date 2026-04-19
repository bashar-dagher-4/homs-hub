import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const nextConfig: NextConfig = {
    images: {
        formats: ["image/avif" , "image/webp"],
    },
    experimental: {
        optimizeCss: true,
        
    }
}

export default withNextIntl(nextConfig)