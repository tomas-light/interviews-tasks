import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import readableClassnames from 'vite-plugin-readable-classnames';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), readableClassnames(), tsconfigPaths()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        // @ts-ignore
        api: 'modern-compiler',
      },
    },
  },
  build: {
    target: 'esnext',
  },
});
