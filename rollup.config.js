import serve from 'rollup-plugin-serve';
import babel from 'rollup-plugin-babel';
// import {uglify} from 'rollup-plugin-uglify';
import livereload from 'rollup-plugin-livereload';
import commonjs from 'rollup-plugin-commonjs';
// import nodePolyfills from 'rollup-plugin-node-polyfills'
import resolve from "rollup-plugin-node-resolve"
// import THREE from 'three';
// import three from 'three';
// import lodash from 'lodash'
export default {
    // 核心选项
    input: 'src/index.js',
    external: ['lodash'], 
    output: {
        file: 'bundle.js',
        format: 'umd',
        // globals: {
        //   lodash: 'lodash',
        //   // THREE: 'THREE'
        // }
        // sourcemap: true
      },
      plugins: [
        resolve(),
        babel({
          exclude: "node_modules/**"
        }),
        commonjs(),
        // nodePolyfills(),
        // 压缩代码
        // uglify(),
        // 热更新 默认监听根文件夹
        livereload(),
   
        serve({
          open: true, 
          port: 8000, 
          openPage: '/dev/index.html',
          contentBase: ''
        })
      ]
  };