const mongoose = require('mongoose');

const connectDB = async (req,res)=>{
    try{
        await mongoose.connect("mongodb+srv://naveen:kumar@cluster0.f7wmb0k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex : true,
            useFindAndModify:false
        });
        console.log('DB connected')
    }
    catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;