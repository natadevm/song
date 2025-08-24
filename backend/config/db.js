const mongoose= require('mongoose')
const connectdb=  async ()=>{
try{
    const con=await mongoose.connect(process.env.DBURL)
console.log("database connected")
}
catch(error){
    console.log("database not connected",error.message)
}
}
module.exports=connectdb