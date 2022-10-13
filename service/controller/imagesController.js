import Photo from '../models/Photo'
import cloudinary from 'cloudinary'
import fs from 'fs-extra'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
export const getImages = async (req, res) => {
    const photos = await Photo.find()
    res.status(200).json({ photos });
}

export const postImage = async (req, res) => {
    const { title, descripcion } = req.body
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const newPhoto = new Photo({
        title,
        descripcion,
        imageURL: result.url,
        public_id: result.public_id
    })
    await newPhoto.save()
    await fs.unlink(req.file.path)
    res.status(200).send("received")
}

export const deleteImage = async (req, res) => {
    const { idImage } = req.params;
    const photo = await Photo.findByIdAndDelete(idImage)
    await cloudinary.v2.uploader.destroy(photo.public_id)
    return res.status(200).send("se a eliminado correctamente");
}