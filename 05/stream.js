const fs = require('fs')
const path = require('path')

const rs = fs.createReadStream(path.join(__dirname,'files','starter.txt'),'utf8')
const ws = fs.createWriteStream(path.join(__dirname,'files','newStarter.txt'))
// // 
// rs.pipe(ws)
rs.on('data', (data)=>{
  ws.write(data)
})