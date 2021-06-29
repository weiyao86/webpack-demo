const path=require('path');
const fs=require('fs');

let versionNo = 0;
const changeVersion = (cb) => {
  const pkgPath = path.join(__dirname, '../../package.json');

  const pkgStr = fs.readFileSync(pkgPath).toString();

  const pkgJson = JSON.parse(pkgStr);

  let newV = +pkgJson.version.replace(/\./g, '');

  pkgJson.version = ('' + ++newV).split('').join('.');
  console.log('更新版本号为：' + pkgJson.version);
  versionNo = pkgJson.version;

  fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, '\t'));
  typeof cb=="function" && cb(versionNo);
};


// class changeVersion{
//   constructor(opts){
//     this.opts=opts;
//   }
//   apply(comiler){
//     compiler.plugin('done',()=>{
//       _changeVersion();
//     })
//   }
// }

module.exports=changeVersion;