import adapter from '@sveltejs/adapter-static';

// Set GITHUB_PAGES_REPO to your repo name if hosting at username.github.io/repo-name
// Leave empty / unset if hosting at username.github.io
const base = process.env.GITHUB_PAGES_REPO ? `/${process.env.GITHUB_PAGES_REPO}` : '';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
    }),
    paths: { base }
  }
};
