const express=require('express'); 
const path = require('path');
const app=express(); 
app.use(express.static(path.join(__dirname,'resources')));
function authorize(req, res, next) {
    const isAuthenticated = re; 
    if (isAuthenticated) {
      next();
    } 
  }
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html'); 
})
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/views/home.html'); 
})
app.listen(3000,()=>{ 
    console.log('Your Client is running on 3000'); 
});

app.use((req,res,next)=>{ 
    res.sendFile(path.join(__dirname,'views','404.html'));

});

app.use(function(err,req,res,next){ res.status(500).send('Something broke!'); });
