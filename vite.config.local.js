import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',  // 本地用根路径
  server: {
    port: 5173,
    open: true,
    // 本地代理，让 /ai-video-gallery/ 指向根
    proxy: {
      '/ai-video-gallery': {
        target: 'http://localhost:5173',
        rewrite: (path) => path.replace(/^\/ai-video-gallery/, '')
      }
    }
  }
});