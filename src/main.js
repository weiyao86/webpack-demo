// ES6 的模块化语法导入jQuery
// import 导入的库对象的变量名
// from 可以写具体的路径, 也可以写包名 如果写的是包名就会去 /node_modules 中查找
import $ from 'jquery';
import Hello from './hello.js';
require('./main.css');
//此处为案例  js代码,可以忽略,(隔行变色)
$(function () {  
  $('ul>li:odd').css('backgroundColor', 'pink')
  $('ul>li:even').css('backgroundColor', 'red');
  Hello();
});