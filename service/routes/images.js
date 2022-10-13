import {Router} from 'express'
import { getImages, postImages } from '../controller/imagesController'

const router = Router()

router.get("/", getImages)
router.post("/", postImages)

module.exports = router