const mongoose=require('mongoose')

const url="mongodb+srv://namratajas2020:namrata123@cluster0.t1eqbmd.mongodb.net/?retryWrites=true&w=majority";

const connect=()=>{
    try {
        console.log("db is connected")
        mongoose.connect(url);
        console.log("Database is connected to the backend")
    } catch (error) {
        console.log(error.message,"error is occured");
    }
}
module.exports=connect