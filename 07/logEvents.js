const path = require('path')
const fs = require('fs')
const {format} = require('date-fns')
const fsPromises = require('fs').promises

const logEvents = async (message) =>{
  const dateTime = `${format(new Date(),'yyyy/MM/dd\thh:mm:ss')}`;
  const logCheez = `${dateTime}\t${message}`;
  try{
    
    const fileExist = await fsPromises.access(path.join(__dirname,'log')).then(() => true).catch(()=>false)
    if(!fileExist){
      await fsPromises.mkdir(path.join(__dirname,'log'));
      console.log('Directory created')
    }
      
    
    await fsPromises.writeFile(path.join(__dirname,'log','logEvents.txt'),logCheez)
    console.log(logCheez)
  }catch (error) {
    console.log(error)
  }
}
module.exports = logEvents;