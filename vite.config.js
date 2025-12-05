import { defineConfig } from 'vite';

export default defineConfig({
  // 生产环境用子路径，Vite会自动处理
  base: '/ai-video-gallery/',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  
  server: {
    port: 5173,
    open: true
  }
});