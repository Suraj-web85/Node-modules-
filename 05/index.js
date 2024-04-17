const fs = require('fs')
const path = require('path')
const fsPromises = require('fs').promises;

// fs.readFile(path.join(__dirname , 'files','starter.txt'),'utf8',(err , data) =>{
  
//   if(err) throw err;
//   // console.log(data)
// })//asynchronous
// console.log('this will print first')
// fs.writeFile(path.join(__dirname, 'files','reply.txt'),'this file is created and this text has been added',(err) =>{
//   if(err) throw err;
//   console.log('file written to starter.txt')
//   fs.appendFile(path.join(__dirname,'files','reply.txt'),'\nthis has been appended into reply.txt',(err)=>{
//     if(err) throw err;
//     console.log("data has been appended to starter txt")
//     fs.rename(path.join(__dirname,'files','reply.txt'),path.join(__dirname,'files','newReply.txt') , (err) => {
//       if(err) throw err;
//       console.log('file renamed')
//     })
   
//   })
// })

// //exit of uncaught error
// process.on('uncaughtException' ,(err) =>{
//   console.error(`There was an uncaught error : ${err}`)
//   process.exit(1);
// })

const asyncFunc = async () =>{
  try{
    const data = await fsPromises.readFile(path.join(__dirname,'files','starter.txt'),'utf8')
    await fsPromises.writeFile(path.join(__dirname,'files','reply.txt'),'\nThis is from writeFile')
    await fsPromises.appendFile(path.join(__dirname,'files','reply.txt'),'\nThis is from appendFile')
    await fsPromises.rename(path.join(__dirname,'files','reply.txt'),path.join(__dirname,'files','newReply.txt'))
    const newData = await fsPromises.readFile(path.join(__dirname,'files','newReply.txt'),'utf8')
    console.log(newData)
    console.log(data)
  }catch(error){
    console.error(error)
  }
}
asyncFunc()
