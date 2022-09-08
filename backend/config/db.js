import mongoose from 'mongoose'
let url2= "mongodb+srv://adarsh2:YBzaeqtBySnowlIE@cluster0.bsakh.mongodb.net/proshop2?retryWrites=true&w=majority"
let url="mongodb+srv://adarsh:adarsh123@cluster0.feary.mongodb.net/proshop2?retryWrites=true&w=majority"
//MXEeDjxcubCim7lQ
function initDB() {
    if(mongoose.connections[0].readyState){
        console.log("already connected")
        return
    }
    // 
   mongoose.connect(url2,{
       useNewUrlParser:true,
       useUnifiedTopology:true
   }) 
   mongoose.connection.on('connected',()=>{
       console.log("connected to mongo db")
   })
   mongoose.connection.on('error',(err)=>{
       console.log("error connecting",err)
   })
}
export default initDB