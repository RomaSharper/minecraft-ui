import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

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
            typescript({
                tsconfig: './tsconfig.json'
            }),
            terser()
        ]
    }
];