const isProd = process.env.NODE_ENV === "production";

// Repo-navn fra GitHub Actions (owner/repo)
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },

  // Viktig for GitHub Pages (statiske sider som mapper)
  trailingSlash: true,

  // Viktig for GitHub Pages prosjekt-site: https://bruker.github.io/<repoName>/
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
};

export default nextConfig;
