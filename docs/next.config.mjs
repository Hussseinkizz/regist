import { createMDX } from "fumadocs-mdx/next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: "export",
  assetPrefix: isGithubPages ? "/regist/" : undefined,
  basePath: isGithubPages ? "/regist" : undefined,
  images: {
    unoptimized: true, // Required because export doesn't support optimized images
  },
};

export default withMDX(config);
