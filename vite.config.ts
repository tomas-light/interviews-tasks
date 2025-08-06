import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import readableClassnames from 'vite-plugin-readable-classnames';
import tsconfigPaths from 'vite-tsconfig-paths';

export const paths = {
  __dirname: path.dirname(fileURLToPath(import.meta.url)),
  get distDirectory() {
    return path.join(this.__dirname, 'build');
  },
};

export default defineConfig({
  plugins: [react(), readableClassnames(), tsconfigPaths()],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    target: 'esnext',
    outDir: paths.distDirectory,
    sourcemap: true,
    cssMinify: false,
    minify: false,
  },
});
