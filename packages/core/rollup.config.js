import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

export default [
    // ES Module build
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.esm.js',
            format: 'es',
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs(),
            copy({
                targets: [
                    {
                        src: 'src/fonts/*',
                        dest: 'dist/fonts/',
                    }
                ]
            }),
            typescript({
                tsconfig: './tsconfig.json',
                declaration: true,
                declarationDir: 'dist'
            })
        ]
    },
    // CommonJS build
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs(),
            copy({
                targets: [
                    {
                        src: 'src/fonts/*',
                        dest: 'dist/fonts/',
                    }
                ]
            }),
            typescript({
                tsconfig: './tsconfig.json'
            })
        ]
    },
    // UMD build (минифицированный)
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/minecraft-ui.min.js',
            format: 'umd',
            name: 'MinecraftUI',
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs(),
            copy({
                targets: [
                    {
                        src: 'src/fonts/*',
                        dest: 'dist/fonts/',
                    }
                ]
            }),
            typescript({
                tsconfig: './tsconfig.json'
            }),
            terser()
        ]
    }
];