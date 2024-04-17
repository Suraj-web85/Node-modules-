const path = require('path')
const fs = require('fs')

if(!fs.existsSync(path.join(__dirname,'files','./new'))){
  fs.mkdir(path.join(__dirname,'files','./new'), (err) => {
    if (err) throw err;
   console.log("directory created")
  })
}
if(fs.existsSync(path.join(__dirname,'files','new'))){
  fs.rmdir(path.join(__dirname,'files','new'),(err) =>{
    if (err) throw err;
    console.log("directory removed")
  })
}