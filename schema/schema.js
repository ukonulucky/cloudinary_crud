const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
       type:String
    },
    img: {
        type:String
    },
    id: {
        type:String
    }
})

const userImageSchema = mongoose.model("cludinary_crud", userSchema)

module.exports = userImageSchema