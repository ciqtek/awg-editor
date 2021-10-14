import path from 'path'
import { babel } from '@rollup/plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import commonjs from 'rollup-plugin-commonjs'
import css from "rollup-plugin-import-css"
function joinPath (filename) {
  return path.join(__dirname, filename);
}
const config = {
  input: joinPath('src/CodeEditor.ts'),
  output: {
    file:'dist/MonacoCodeEditor.js',
    format: 'esm'
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    css(),
    babel({ 
    include:['src/**/*'],
    exclude:['node_modules/**'],
    plugins: [["@babel/transform-runtime", { regenerator: true }]],
    babelHelpers: 'runtime',
   })],
   external:['monaco-editor']
}

export default config