import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import devtoolsJson from 'vite-plugin-devtools-json';
// eslint-disable-next-line import/default
import eslint from 'vite-plugin-eslint';
import RailsPlugin from 'vite-plugin-rails';

export default defineConfig({
  server: {
    host: true,
    port: 3036,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        application: path.resolve(__dirname, 'app/frontend/entrypoints/application.js'),
        applicationStyle: path.resolve(__dirname, 'app/frontend/entrypoints/application.scss'),
        advancedSearch: path.resolve(
          __dirname,
          'app/frontend/entrypoints/advanced-search-client.jsx'
        ),
        groupAttendance: path.resolve(
          __dirname,
          'app/frontend/entrypoints/group-attendance-app-client.jsx'
        ),
        groupPerformance: path.resolve(
          __dirname,
          'app/frontend/entrypoints/group-performance-app-client.jsx'
        ),
        scheduleList: path.resolve(__dirname, 'app/frontend/entrypoints/ScheduleListClient.jsx'),
      },
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules', 'app/frontend/'],
        silenceDeprecations: ['import', 'mixed-decls', 'color-functions', 'global-builtin'],
      },
    },
  },
  resolve: {
    alias: {
      '@bundles': path.resolve(__dirname, 'app/frontend/bundles'),
      '@lib': path.resolve(__dirname, 'app/frontend/lib'),
    },
  },
  plugins: [
    devtoolsJson(),
    RailsPlugin(),
    react(),
    eslint({
      include: ['./app/frontend/**/*.{js,jsx}'],
      cache: false,
    }),
  ],
});
