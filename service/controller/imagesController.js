import Photo from '../models/Photo'
import cloudinary from 'cloudinary'
import fs from 'fs-extra'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// muestra imagenes
export const getImages = async (req, res) => {
    try {
        const photos = await Photo.find()
        res.status(200).json({ photos });

    } catch (error) {
        console.log(error)
        res.status(500).send("hubo un error");
    }
}

// sube una imagen
export const postImage = async (req, res) => {
    const { title, descripcion } = req.body
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const newPhoto = new Photo({
        title,
        descripcion,
        imageURL: result.url,
        public_id: result.public_id
    })
    try {
        await newPhoto.save()
        await fs.unlink(req.file.path)
        res.status(200).send("received")
    } catch (error) {
        console.log(error)
        res.status(500).send("hubo un error");
    }
}

// elimina una imagen
export const deleteImage = async (req, res) => {
    const { idImage } = req.params;

    try {
        const photo = await Photo.findById(idImage);
        if (!photo) {
            return res.status(404).json({ msg: "no existe esa imagen" });
        }
        await Photo.findByIdAndDelete(idImage)
        await cloudinary.v2.uploader.destroy(photo.public_id)
        res.status(200).send("se a eliminado correctamente");
        
    } catch (error) {
        console.log(error)
        res.status(500).send("hubo un error");
    }
}