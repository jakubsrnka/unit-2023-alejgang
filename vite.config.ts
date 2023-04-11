import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [sveltekit()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/styles/variables.scss";'
      }
    }
  },
  test: {
    open: false,
    include: ['src/**/*.{test,spec}.{js,ts}'],
    reporters: ['default', 'junit'],
    outputFile: '.test.results.xml',
    coverage: {
      provider: 'istanbul',
      reporter: ['cobertura', 'html', 'json-summary']
    }
  },
  server: {
    port: 80,
    host: true
  }
};

export default config;
