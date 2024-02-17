import path from 'path';
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import watchGlobs from 'rollup-plugin-watch-globs';

const svg = () => createSvgIconsPlugin({
  iconDirs: [path.resolve(process.cwd(), 'src/icons')],
  symbolId: '[name]',
  customDomId: 'svg-sprites',
  svgoOptions: {
    plugins: [
      'preset-default',
      {
        name: 'convertColors',
        params: {
          currentColor: true,
        },
      },
      {
        name: 'minifyStyles',
        params: {
          minifyStyles: false,
        }
      }
    ],
  }
});

const importChunksWithHashQuery = () => {
  return {
    name: 'asset-import-query-param',
    generateBundle(_options, bundle) {
      for (const [filename, chunk] of Object.entries(bundle)) {
        if (filename.includes('.js') && 'code' in chunk && chunk.code) {
          const hash = new Date().getTime(); // unique hash based on build time
          // replace regular imports
          chunk.code = chunk.code.replace(
            /(from\s*['"][^"')]+\.js)(['"])/g,
            (_, $1, $2) => `${$1}?${hash}${$2}`
          );

          // replace dynamic imports and regular imports without 'from'
          chunk.code = chunk.code.replace(
            /(import\(?['"][^"')]+\.js)(['"]\)?)/g,
            (_, $1, $2) => `${$1}?${hash}${$2}`
          );
        }
      }
    },
  }
};

export default defineConfig({
  build: {
    outDir: 'shopify/assets',
    emptyOutDir: false,
    rollupOptions: {
      input: 'src/main.js',
      output: {
        entryFileNames: '[name].bundle.min.js',
        chunkFileNames: '[name].chunk.min.js',
        assetFileNames: '[name].bundle.min.[ext]'
      },
      plugins: [
        watchGlobs(['src/icons/**']),
      ]
    },
  },
  clearScreen: false,
  publicDir: 'src/icons',
  plugins: [svg(), importChunksWithHashQuery()],
  resolve: {
    alias: {
      '~': path.join(__dirname, ''),
      '@': path.join(__dirname, 'src'),
      '@Shopify': path.join(__dirname, 'shopify'),
    }
  },
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType !== 'js') return { relative: true };
      return { runtime: `window.theme.toCDN(${JSON.stringify(filename)})` };
    }
  },
});
