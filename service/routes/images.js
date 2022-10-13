import {Router} from 'express'
import { deleteImage, getImages, postImage } from '../controller/imagesController'

const router = Router()

router.get("/", getImages)
router.post("/", postImage)
router.delete("/:idImage", deleteImage)

module.exports = router