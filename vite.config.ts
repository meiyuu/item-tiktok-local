import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { getJsonOrDie } from './script/utils.mjs';

/** 根据命令行入参，定义模式常量 */
const MODE = process?.argv?.includes('-m=development') ? 'development' : '';
const type = process?.argv?.[5] ? process?.argv?.[5] : 'pord';
const { version } = getJsonOrDie('package.json');
/** 构造静态资源依赖路径 */
const base = MODE ? `https://q.aiyongtech.com/tiktok/item/${type}/${version}` : '';
// https://vitejs.dev/config/
export default defineConfig({
  mode: MODE,
  define: {
      // 指定 NODE_ENV 方便 react 等库动态依赖不同子包
      'process.env.NODE_ENV': JSON.stringify(MODE),
      'process.env.APP_VERSION': JSON.stringify(version),
  },
  plugins: [react()],
  base,
  build: {
      target: 'es2015',
      outDir: `build/${version}`,
      rollupOptions: {
          output: {
              // 线上是非覆盖式发布，URL带版本号，构建产物的[hash]没有意义，所以禁用掉
              entryFileNames: '[name].js',
              chunkFileNames: 'chunk/[name].js',
              assetFileNames: '[name].[ext]', // 只托管css资源，图片等媒体资源，请自行上传CDN后在代码内引用
          },
      },
  },
  resolve: {
      alias: {
          assets: '/src/assets',
          constants: '/src/constants',
          utils: '/src/public/utils',
          public: '/src/public',
          pages: '/src/pages',
          components: '/src/components',
      },
  },
  server: {
    port: 9000,
    host: 'local.aiyongtech.com',
    open: true,
  },
})
