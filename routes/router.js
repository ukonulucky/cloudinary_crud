const express = require("express")
const cloudinaryConnect = require("../cloudinary/utils/cloudinaryConfig")
const uploadImage = require("../cloudinary/multer")
const userImageSchema = require("../schema/schema")

const router = express.Router()
 // post request
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
// get request
router.get("/", async (req,res) => {
  try {
      const users = await userImageSchema.find()
      if (users) {
          res.json(users)
      }
  } catch (error) {
    res.json(error.message)
  }
})
// delete request
router.delete("/:id", async(req,res) => {
    try {
        const user = await userImageSchema.findByIdAndDelete(req.params.id)
        if (user) {
            const userPic = await cloudinaryConnect.uploader.destroy(user.id)
            res.json(user)
        }
        
    } catch (error) {
        res.json(error.message)
    }
})
//updating of images
router.put("/:id", uploadImage.single("image"),async (req,res) => {
    try {
        let oldUser = await userImageSchema.find({
            _id:req.params.id
        })
        
        if (oldUser) {
            console.log(oldUser[0].id)
            
            const oldUserImage = await cloudinaryConnect.uploader.destroy(oldUser[0].id)
            console.log("old userImage", oldUserImage)
            
            const newUserImage = await cloudinaryConnect.uploader.upload(req.file.path)
              let upDateUser 
            if (newUserImage && oldUser) {
                console.log(req.body.name)
                upDateUser  = {
                    name: req.body.name,
                    img: newUserImage.secure_url,
                    id: newUserImage.public_id  
                }

                const response = await userImageSchema.findByIdAndUpdate(req.params.id, upDateUser, { new: true })
                res.json(response)
           }
        }
    } catch (error) {
        res.json(error.message)
    }
})
module.exports = router