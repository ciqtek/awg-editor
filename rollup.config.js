import path from 'path'
import { babel } from '@rollup/plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import commonjs from 'rollup-plugin-commonjs'
// import fs from 'fs'
// const pkg = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf-8'));
// const external = Object.keys(pkg.dependencies || {});
function joinPath (filename) {
  return path.join(__dirname, filename);
}

const config = {
  input: joinPath('src/AwgEditor.ts'),
  output: [
    { 
      format: 'umd',
      file:'dist/AwgEditor.umd.js',
      name:'AwgEditor.umd.js',
    }
  ],
  plugins: [
    commonjs(),
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      },
      dedupe:['monaco-editor'],
    }),
    typescript(),
    babel({
      babelrc: false,
      include: ['src/**/*'],
      presets: [['@babel/preset-env', {
        "modules": false,
      }]],
      babelHelpers: 'runtime',
      plugins: [["@babel/transform-runtime", { regenerator: true }]],
      exclude: ["node_modules/**"],
      extensions:['js','ts']
    }),
  ],
  external:['monaco-editor']
}


export default [config]