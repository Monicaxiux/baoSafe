import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
export default defineConfig({
  base: './',//解决打包后白屏
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {//设置项目局域网访问
    host: '0.0.0.0',
    port: 3080,
    open: true
  },
})
