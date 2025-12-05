import { defineConfig } from 'vite';

export default defineConfig({
  base: '/ai-video-gallery/', // 如果部署到子路径，改为 '/仓库名/'
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});