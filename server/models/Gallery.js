import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    clean:{
       type:String, //add clean image here 
       required:true
    },
    dirty:{
        type:[String], // add dirt image here 
        required:true
    }
    
    
}, { timestamps: true });


const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;