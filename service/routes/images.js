import {Router} from 'express'
import { deleteImage, getImageById, getImages, postImage } from '../controller/imagesController'

const router = Router()

router.get("/", getImages)
router.post("/", postImage)
router.delete("/:idImage", deleteImage)
router.get("/:imageId", getImageById)
module.exports = router