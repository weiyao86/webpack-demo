/**custom loader */
const loaderUtils=require('loader-utils');

module.exports=function(source){
  
    let curDir=this.context;
    
    source=source.replace(/@[^;]+;/,'#f00/*start-end*/;');
    
    return source;
}