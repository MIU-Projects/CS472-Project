const express = require("express");
const cors=require('cors');


//router
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const app = express();
app.use(cors());


app.use((req, res, next) => {
    const headerToken = req.header('User-Data');
    if (headerToken == undefined) {
        if(req.path =="/users/login" ){
            next();
        }else{
            return res.status(401).json({ error: 'Unauthorized' });
        }    
    }else{
        next();
    }
});
app.use('/users', userRouter);
app.use('/products', productRouter);



app.use((err, req, res, next) => {
    if (err.message === 'NOT Found') {
        res.status(404).json({ error: err.message });
    } else {
        res.status(500).json({ error: err.message || 'Something is wrong! Try later' });
    }
});

app.listen(5001,()=>{
    console.log("Srijana Store Server is Running on 5001")
})