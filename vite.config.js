import { defineConfig } from 'vite';

export default defineConfig({
  base: '/ai-video-gallery/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 新增：将 videos 目录复制到输出根目录，而不是 assets 下
    copyPublicDir: true,
    rollupOptions: {
      output: {
        // 这可以确保其他资源（如图片、字体）还是进assets
        assetFileNames: (assetInfo) => {
          // 如果是视频文件，就放到根目录的 videos/ 下
          if (assetInfo.name && /\.(mp4|webm|ogg)$/.test(assetInfo.name)) {
            return `videos/[name]-[hash][extname]`;
          }
          // 其他资源还是放到 assets/ 下
          return `assets/[name]-[hash][extname]`;
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});