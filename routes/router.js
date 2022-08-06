const express = require("express")
const upload = require("../cloudinary/multer")



const router = express.Router()
 
router.post("/",upload.single("fileUpload") , async(req, res) => {
    try {
        const result = await cloudinary.uploader.upload(reg.file.path)
        res.json(result)
    } catch (error) {
        console.log(error.message)
    }
})