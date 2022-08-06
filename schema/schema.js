const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
       type:String
    },
    avater: {
        type:String
    },
    cloudinary: {
        type:String
    }
})

const imageSchema = mongoose.Model("cludinary_crud", userSchema)

module.exports = imageSchema