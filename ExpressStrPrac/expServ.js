const path = require('path')
const express = require('express')
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3500
const {logger} = require('./middleware/logEvents')
// import errorHandler from './middleware/errorHandler';
const errorHandler = require('./middleware/errorHandler')
// custom middleware logger
app.use(logger);
//Cross Origin Resource Sharing
const whiteList = ['https://www.yoursite.com','http://127.0.0.1:5500','http://localhost:3500'];
const corsOptions = {
  origin : (origin , callback) =>{
    if(whiteList.indexOf(origin) !== -1 || !origin){
      callback(null, true)
      //first call back is error  second is true
    }else{
      callback(new Error('Not allowed by CORS'))
    }

  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

  
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/',express.static(path.join(__dirname,'public')))
app.use('/subdir',express.static(path.join(__dirname,'public')))


//routes working perfectly
app.use('/',require('./routes/root'))
app.use('/subdir',require('./routes/subdir'))

app.use('/employees',require('./routes/api/employees'))
// app.get('/old-page(.html)?', (req , res) => {
//   // res.send('Hello World');
//   // res.sendFile('./views/index.html' , {root : __dirname})
//   res.redirect(301,'./new-page.html')
// });
// 
// app.get('/old-page(.html)?' ,(req ,res ,next) => {
//   console.log("attempted to show old-page.html")
//   next()
// },(req, res)=> {
//   res.redirect('/new-page.html')
// })


// const first = (req, res ,next) => {
//   console.log('first')
//   next()
// }

// const second = (req, res ,next) => {
//   console.log('second')
//   next()
// }

// const third = (req, res) => {
//   console.log('third')
//   res.send('hello this is chaining of route handlers what do you think')
// }
// app.get('/chain(.html)?',[first, second,third])

app.all('*' ,(req,res) =>{
  res.status(404);
  if(req.accepts('html')){
res.sendFile(path.join(__dirname,'views','404.html'))
  }else if(req.accepts('json')){
    res.sendFile({error : "404 not found"})
  }else{
    res.type('txt').send("404 not found")
  }
  


})

app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
