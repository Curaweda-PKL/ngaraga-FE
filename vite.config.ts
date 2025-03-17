import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';
import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsConfigPaths from 'vite-tsconfig-paths';

//  plugin to append a line count comment to each file
function lineCountPlugin(options: { ignore: string[] } = { ignore: [] }) {
  const { ignore } = options;
  return {
    name: 'vite-plugin-linecount',
    transform(code: string, id: string) {
      // Skip files matching any of the ignore patterns.
      if (ignore.some(pattern => id.includes(pattern))) {
        return null;
      }
      // Count the number of lines in the file.
      const lineCount = code.split(/\r\n|\r|\n/).length;
      // Append a comment with the line count.
      const appendedCode = `${code}\n// x-google-linecount: ${lineCount}`;
      return { code: appendedCode, map: null };
    },
  };
}

export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [
    // Use Million for performance optimizations
    million.vite({ auto: true }),
    react(),
    checker({
      // Enable TypeScript checking if needed for added safety.
      typescript: false,
      biome: false,
    }),
    tsConfigPaths(),
    // Add our custom line count plugin with an ignore list.
    lineCountPlugin({ ignore: ['node_modules', 'src/vendor'] }),
    visualizer({ template: 'sunburst' }) as unknown as PluginOption,
    // Pre-compress assets using Brotli
    compression({
      verbose: true,
      disable: false,
      algorithm: 'brotliCompress', // Change to 'gzip' for gzip compression if preferred
      ext: '.br', // Extension for the compressed files; for gzip, might use '.gz'
      threshold: 10240, // Only compress files larger than 10kB
      deleteOriginFile: false, // Keep original uncompressed files for fallback
    }),
  ],
  server: {
    open: true,
  },
  build: {
    // Production build options
    minify: 'esbuild',
    sourcemap: true, // Enable sourcemaps
    rollupOptions: {
      output: {
        // Customize chunking if necessary.
      },
    },
  },
});
