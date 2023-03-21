import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    image: {
        type : String,
        default : "https://www.clipartmax.com/png/middle/136-1363971_author-image-logo-user-png.png"
    },
    provider: {
        type : Boolean,
        default:false
    },
    providerName:{
        type: String
    }
},{timestamps : true});

export default mongoose.models.User || mongoose.model("User", UserSchema);
