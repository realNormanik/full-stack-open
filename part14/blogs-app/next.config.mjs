import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "*.app.github.dev",
      ],
    },
  },
  pageExtensions: ["js", "jsx", "md", "mdx"],
}

export default createMDX()(nextConfig);