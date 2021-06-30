const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes=require('./routes/auth')
app.use(bodyParser());

// mongo connected
// mongodb+srv://root:<password>@cluster0.dqfig.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
//    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}
//    @localhost/${process.env.MONGO_DB_DATABASE}?`,
    'mongodb://ecommerce_user:ecommerce_pass@localhost:27017/test',
{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    console.log(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}
    @cluster0.dqfig.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`)
    
    ).then(()=>{
       console.log('Database connected');
    });


app.use('/api', authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});