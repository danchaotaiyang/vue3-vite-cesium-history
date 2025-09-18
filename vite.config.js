import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import cesium from 'vite-plugin-cesium';
import legacy from '@vitejs/plugin-legacy';
import Inspect from 'vite-plugin-inspect';
import { visualizer } from 'rollup-plugin-visualizer';
import { codeInspectorPlugin } from 'code-inspector-plugin';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        cesium(),
        codeInspectorPlugin({
            bundler: 'vite',
            editor: 'webstorm'
        }),
        legacy({
            targets: [ 'firefox < 59', 'chrome < 60' ],
            additionalLegacyPolyfills: [ 'regenerator-runtime/runtime' ],
            renderLegacyChunks: true,
            polyfills: [
                'es.symbol',
                'es.promise',
                'es.promise.finally',
                'es/map',
                'es/weak-map',
                'es/set',
                'es/weak-set',
                'es.array.filter',
                'es.array.for-each',
                'es.array.flat-map',
                'es.object.define-properties',
                'es.object.define-property',
                'es.object.get-own-property-descriptor',
                'es.object.get-own-property-descriptors',
                'es.object.keys',
                'es.object.to-string',
                'web.dom-collections.for-each',
                'esnext.global-this',
                'esnext.string.match-all'
            ]
        }),
        Inspect(),
        visualizer({
            emitFile: true,
            filename: 'stats.html'
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        assetsInlineLimit: 0,
        rollupOptions: {
            output: {
                entryFileNames: `static/js/[name]-[hash].js`,
                chunkFileNames: `static/js/[name]-[hash].js`,
                // assetFileNames: `static/[name]-[hash].[ext]`,
                assetFileNames: (assetInfo) => {

                    const name = assetInfo.name || '';

                    if (/\.(css)$/i.test(name)) {
                        return `static/css/[name]-[hash].[ext]`;
                    }
                    if (/\.(png|jpe?g|gif|svg|webp)$/i.test(name)) {
                        return `static/img/[name]-[hash].[ext]`;
                    }
                },
                /*manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return `vendor`;
                    }
                    return null;
                }*/
            }
        }
    },
    server: {
        port: 5175,
        proxy: {
            '/api': {
                target: 'http://localhost:12138/',
                changeOrigin: true
            }
        }
    }
});
