import mongoose from 'mongoose'

function ConnectDb(){
    if(mongoose.connections[0].readyState){
        console.log("alredy connected")
        return
    }
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    mongoose.connection.on('connected',()=>{
        console.log("connected to mongo")
    })
    mongoose.connection.on('error',(err)=>{
        console.log("error connecting",err)
    })
}


export default ConnectDb;