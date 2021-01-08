import serve from 'rollup-plugin-serve';
import babel from 'rollup-plugin-babel';
import {uglify} from 'rollup-plugin-uglify';
import livereload from 'rollup-plugin-livereload';
import commonjs from 'rollup-plugin-commonjs';
export default {
    // 核心选项
    input: 'src/index.js',
    output: {
        file: 'bundle.js',
        format: 'umd',
        sourcemap: true
      },
      plugins: [
        babel({
          exclude: "node_modules/**"
        }),
        commonjs(),
        // 压缩代码
        uglify(),
        // 热更新 默认监听根文件夹
        livereload(),
        // 本地服务器
        serve({
          open: true, // 自动打开页面
          port: 8000, 
          openPage: '/public/index.html', // 打开的页面
          contentBase: ''
        })
      ]
  };