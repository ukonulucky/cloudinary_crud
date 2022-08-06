const express = require("express")
const cloudinaryConnect = require("../cloudinary/utils/cloudinaryConfig")
const uploadImage = require("../cloudinary/multer")
const userImageSchema = require("../schema/schema")

const router = express.Router()
 
router.post("/",uploadImage.single("image") , async(req, res) => {
    try {
        const uplaodResponse = await cloudinaryConnect.uploader.upload(req.file.path)
        if (uplaodResponse) {
            const newUser = new userImageSchema({
                name: req.body.name,
                img: uplaodResponse.secure_url,
                id: uplaodResponse.public_id
            })
            const savedUser = await newUser.save()
            res.json(
             savedUser
            )
            
        }
    } catch (error) {
        console.log(error.message)
    }
})
module.exports = router