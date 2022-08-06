const multer = require("multer")
const path = require("path")

const multerSetting = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== ".jpeg" && ext !== ".jpg" && ext !== "png") {
            cb(new Err("File format not supported"), false)
            return
        }
        cb(null,true)
    }
})

module.exports = multerSetting