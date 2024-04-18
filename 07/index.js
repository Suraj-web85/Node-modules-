const logEvents = require('./logEvents')
const EventEmitter = require('events')
const myEmitter = new EventEmitter()


myEmitter.on('log',(msg) => {
  logEvents(msg);
})

setTimeout(()=>{
  myEmitter.emit('log','log Event Emitted')
   
},2000)


