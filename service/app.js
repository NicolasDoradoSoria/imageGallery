const express = require("express")
const morgan = require("morgan")
const multer = require("multer")
const path = require("path")
const database = require("./database/database")
const app = express()

app.set("port", 3000)
database()
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/uploads"),
    filename: (req, file, cb) =>{
       cb(null, new Date().getTime() + path.extname(file.originalname)) 
    }
})

app.use(multer({storage}).single("image") )

//rutas
app.use("/api", require("./routes"))

module.exports = app