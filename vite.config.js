/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        plugins: [
            libInjectCss({

            }),
        ],
        lib: {
            entry: './src/index.js',
            name: 'artless-notifications',
            fileName: (format) => `artless-notifications.${format}.js`,
        },
    }
})