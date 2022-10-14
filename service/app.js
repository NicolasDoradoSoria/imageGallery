import express from "express"
import morgan from 'morgan'
import multer from 'multer'
import path from 'path'
import database from './config/database'
import routes from './routes'
const app = express()

app.set("port", 3000)
database()
app.use(morgan("dev"))

// habilitar express.json
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/uploads"),
    filename: (req, file, cb) =>{
       cb(null, new Date().getTime() + path.extname(file.originalname)) 
    }
})

app.use(multer({storage}).single("image") )

//rutas
app.use("/api", routes)

export default app