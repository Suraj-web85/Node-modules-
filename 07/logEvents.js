const path = require('path')
const fs = require('fs')
const { format } = require('date-fns')

const fsPromises = require('fs').promises


const logEvents = async (msg) => {

  const dateTime = `${format(new Date(),'yyyy/MM/dd\thh:ss:mm\t')}`
  const logItem = `${dateTime}\t${msg}`
  
    // try{
      // if(!fs.existsSync(path.join(__dirname,'log'))){
      // await  fsPromises.mkdir(path.join(__dirname,'log'))
      //   console.log('directory created')
      // }
      // await fsPromises.writeFile(path.join(__dirname,'log','myNewText.txt' ), logItem);
    // }catch(err){
    //   console.error(err)
    // }
    fsPromises.mkdir(path.join(__dirname,'log'))
    .then(() => {
      console.log("directory created")
      return fsPromises.writeFile(path.join(__dirname,'log','myNewText.txt' ), logItem);
    })
    .then(() => console.log('has been written something'))
    .catch((err) =>{
      console.log(err)
    })
  }

module.exports = logEvents;