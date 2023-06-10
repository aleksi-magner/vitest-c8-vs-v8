import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

import vue from '@vitejs/plugin-vue';

export default defineConfig(() => {
  const metaURL: string = import.meta.url;

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', metaURL)),
        '#utils': fileURLToPath(new URL('./tests/utils.ts', metaURL)),
        '#fixtures': fileURLToPath(new URL('./tests/fixtures', metaURL)),
      },
    },
    server: {
      host: 'localhost',
      port: 8080,
      strictPort: true,
      https: false,
      open: false,
      hmr: true,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: 'hidden',
      cssCodeSplit: true,
      reportCompressedSize: false,
      minify: true,
      manifest: true,
    },
    test: {
      environment: 'happy-dom',
      include: ['**/*.spec.{js,ts}'],
      exclude: [...configDefaults.exclude, 'fixtures/*'],
      root: fileURLToPath(new URL('./tests/', metaURL)),
      cache: {
        dir: fileURLToPath(new URL('node_modules/.vitest', metaURL)),
      },
      setupFiles: ['./init.ts'],
      isolate: true,
      passWithNoTests: true,
      bail: 1,
      logHeapUsage: false,
      watch: false,
      css: false,
      clearMocks: true,
      mockReset: true,
      restoreMocks: false,
      reporters: 'default',
      coverage: {
        provider: 'v8',
        enabled: true,
        include: ['**/src/**'],
        exclude: [
          '**/**/*.d.ts',
          '**/src/api/httpClient.*',
          '**/src/config/**',
          '**/src/assets/**',
        ],
        all: true,
        clean: true,
        cleanOnRerun: true,
        skipFull: false,
        perFile: false,
        reportOnFailure: false,
        reportsDirectory: '__coverage__',
        reporter: ['text'],
        statements: 95,
        branches: 95,
        functions: 95,
        lines: 95,
      },
    },
  };
});
